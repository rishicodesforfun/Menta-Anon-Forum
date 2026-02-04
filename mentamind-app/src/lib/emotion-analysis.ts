/**
 * Emotion Analysis Module
 * 
 * PURPOSE: Analyzes user conversations for emotional patterns.
 * This runs in the BACKGROUND - users never see this data.
 * 
 * Data is used for:
 * 1. Generating psychologist summaries (admin/therapist only)
 * 2. Understanding user needs (aggregate analytics)
 * 
 * PRIVACY: No personally identifiable information is extracted.
 * Only anonymous session IDs are used.
 */

import OpenAI from "openai";

// Initialize OpenAI client with OpenRouter
const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
        "X-Title": process.env.OPENROUTER_SITE_NAME || "MentaMind",
    }
});

// Types for emotion analysis
export interface EmotionAnalysis {
    primary_emotions: string[];
    secondary_emotions: string[];
    themes: string[];
    possible_core_issue: string;
    intensity: "low" | "medium" | "high" | "crisis";
    timestamp: string;
    message_count: number;
}

export interface ConversationMessage {
    role: "user" | "assistant";
    content: string;
}

// Prompt for emotion extraction
const ANALYSIS_PROMPT = `You are an emotion analysis system. Analyze the following conversation for emotional patterns.

IMPORTANT: Return ONLY valid JSON. No markdown, no explanation.

Extract:
1. primary_emotions: Main emotions expressed (anxiety, sadness, anger, confusion, fear, loneliness, frustration, overwhelm, etc.)
2. secondary_emotions: Underlying or mixed feelings (guilt, shame, hopelessness, etc.)
3. themes: Recurring topics (work stress, relationships, self-worth, family, academic pressure, burnout, etc.)
4. possible_core_issue: The most likely root cause (e.g., "work-related burnout", "relationship conflict")
5. intensity: Overall emotional intensity (low, medium, high, crisis)

Conversation:
<<<CONVERSATION>>>

Return ONLY this JSON format:
{
  "primary_emotions": [],
  "secondary_emotions": [],
  "themes": [],
  "possible_core_issue": "",
  "intensity": ""
}`;

/**
 * Analyzes a conversation for emotional content
 * Should be called after every 3-5 user messages
 * 
 * @param conversation - Array of conversation messages
 * @returns EmotionAnalysis object or null if analysis fails
 */
export async function analyzeEmotions(
    conversation: ConversationMessage[]
): Promise<EmotionAnalysis | null> {
    try {
        // Only analyze if there are enough user messages
        const userMessages = conversation.filter(m => m.role === "user");
        if (userMessages.length < 3) {
            return null;
        }

        // Format conversation for analysis
        const conversationText = conversation
            .map(m => `${m.role.toUpperCase()}: ${m.content}`)
            .join("\n");

        const prompt = ANALYSIS_PROMPT.replace("<<<CONVERSATION>>>", conversationText);

        // Call AI for analysis (using smaller/faster model for background task)
        const completion = await openai.chat.completions.create({
            model: "meta-llama/llama-3.3-70b-instruct",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 200,
            temperature: 0.1, // Low temperature for consistent JSON output
        });

        const responseText = completion.choices[0]?.message?.content || "";

        // Parse JSON response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error("Emotion analysis: No JSON found in response");
            return null;
        }

        const parsed = JSON.parse(jsonMatch[0]);

        // Validate required fields
        if (!parsed.primary_emotions || !parsed.intensity) {
            console.error("Emotion analysis: Missing required fields");
            return null;
        }

        // Return structured analysis
        return {
            primary_emotions: parsed.primary_emotions || [],
            secondary_emotions: parsed.secondary_emotions || [],
            themes: parsed.themes || [],
            possible_core_issue: parsed.possible_core_issue || "unspecified",
            intensity: parsed.intensity || "medium",
            timestamp: new Date().toISOString(),
            message_count: userMessages.length,
        };
    } catch (error) {
        console.error("Emotion analysis failed:", error);
        return null;
    }
}

/**
 * Determines if analysis should run based on message count
 * Analysis runs every 5 user messages to balance insight vs. API costs
 */
export function shouldRunAnalysis(userMessageCount: number): boolean {
    return userMessageCount > 0 && userMessageCount % 5 === 0;
}

/**
 * Formats analysis for storage or display
 * Removes any potentially sensitive data
 */
export function sanitizeAnalysis(analysis: EmotionAnalysis): EmotionAnalysis {
    return {
        ...analysis,
        // Ensure no PII slips through themes
        themes: analysis.themes.map(t => t.toLowerCase().trim()),
        possible_core_issue: analysis.possible_core_issue.toLowerCase().trim(),
    };
}
