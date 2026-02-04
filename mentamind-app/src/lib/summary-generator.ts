/**
 * Psychologist Summary Generator
 * 
 * PURPOSE: Generates professional summaries from emotion analysis data.
 * These summaries are for therapist/psychologist review ONLY.
 * 
 * ACCESS: Restricted to authorized admin/psychologist roles
 * 
 * OUTPUT: Neutral, professional language suitable for clinical review
 */

import OpenAI from "openai";
import { EmotionAnalysis } from "./emotion-analysis";

// Initialize OpenAI client with OpenRouter
const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
        "X-Title": process.env.OPENROUTER_SITE_NAME || "MentaMind",
    }
});

// Types
export interface PsychologistSummary {
    summary: string;
    recommendations: string[];
    risk_level: "low" | "moderate" | "elevated" | "high";
    generated_at: string;
    analysis_count: number;
}

// Prompt for summary generation
const SUMMARY_PROMPT = `You are a clinical summarization system for mental health professionals.

Based on the following emotional analysis data, create a brief, professional summary that a psychologist could review.

GUIDELINES:
- Use clear, neutral, professional language
- No assumptions or diagnoses
- Focus on what the user expressed and patterns observed
- Suggest areas for therapeutic exploration
- Keep it concise (3-4 sentences)

FORMAT:
"The user expresses [emotions] primarily related to [context]. There is [pattern/theme]. Further exploration of [topic] is recommended."

ANALYSIS DATA:
<<<ANALYSIS_DATA>>>

Provide:
1. summary: A 3-4 sentence professional summary
2. recommendations: 2-3 brief suggestions for therapeutic exploration
3. risk_level: low, moderate, elevated, or high (based on intensity and themes)

Return ONLY valid JSON:
{
  "summary": "",
  "recommendations": [],
  "risk_level": ""
}`;

/**
 * Generates a psychologist-ready summary from emotion analysis data
 * 
 * @param analyses - Array of emotion analyses from multiple sessions
 * @returns PsychologistSummary or null if generation fails
 */
export async function generatePsychologistSummary(
    analyses: EmotionAnalysis[]
): Promise<PsychologistSummary | null> {
    try {
        if (analyses.length === 0) {
            return null;
        }

        // Aggregate analysis data
        const aggregated = aggregateAnalyses(analyses);
        const analysisText = JSON.stringify(aggregated, null, 2);

        const prompt = SUMMARY_PROMPT.replace("<<<ANALYSIS_DATA>>>", analysisText);

        // Call AI for summary generation
        const completion = await openai.chat.completions.create({
            model: "meta-llama/llama-3.3-70b-instruct",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 300,
            temperature: 0.2,
        });

        const responseText = completion.choices[0]?.message?.content || "";

        // Parse JSON response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error("Summary generation: No JSON found in response");
            return null;
        }

        const parsed = JSON.parse(jsonMatch[0]);

        return {
            summary: parsed.summary || "Unable to generate summary.",
            recommendations: parsed.recommendations || [],
            risk_level: parsed.risk_level || "low",
            generated_at: new Date().toISOString(),
            analysis_count: analyses.length,
        };
    } catch (error) {
        console.error("Summary generation failed:", error);
        return null;
    }
}

/**
 * Aggregates multiple analyses into a summary view
 */
function aggregateAnalyses(analyses: EmotionAnalysis[]): {
    all_emotions: string[];
    all_themes: string[];
    core_issues: string[];
    intensity_trend: string[];
    total_messages: number;
} {
    const allEmotions: string[] = [];
    const allThemes: string[] = [];
    const coreIssues: string[] = [];
    const intensityTrend: string[] = [];
    let totalMessages = 0;

    for (const analysis of analyses) {
        allEmotions.push(...analysis.primary_emotions);
        allEmotions.push(...analysis.secondary_emotions);
        allThemes.push(...analysis.themes);
        coreIssues.push(analysis.possible_core_issue);
        intensityTrend.push(analysis.intensity);
        totalMessages += analysis.message_count;
    }

    return {
        all_emotions: [...new Set(allEmotions)],
        all_themes: [...new Set(allThemes)],
        core_issues: [...new Set(coreIssues)],
        intensity_trend: intensityTrend,
        total_messages: totalMessages,
    };
}

/**
 * Determines risk level from intensity and keywords
 */
export function calculateRiskLevel(
    analyses: EmotionAnalysis[]
): "low" | "moderate" | "elevated" | "high" {
    const hascrisis = analyses.some(a => a.intensity === "crisis");
    const hasHigh = analyses.some(a => a.intensity === "high");
    const highRiskThemes = ["suicide", "self-harm", "hopelessness", "crisis"];

    const hasHighRiskTheme = analyses.some(a =>
        a.themes.some(t => highRiskThemes.includes(t.toLowerCase()))
    );

    if (hascrisis || hasHighRiskTheme) return "high";
    if (hasHigh) return "elevated";
    if (analyses.length > 3) return "moderate";
    return "low";
}

/**
 * Formats summary for export (PDF-ready text)
 */
export function formatSummaryForExport(
    summary: PsychologistSummary,
    sessionId: string
): string {
    const lines = [
        "=== MENTAMIND CLINICAL SUMMARY ===",
        "",
        `Session ID: ${sessionId}`,
        `Generated: ${new Date(summary.generated_at).toLocaleString()}`,
        `Risk Level: ${summary.risk_level.toUpperCase()}`,
        `Analyses Reviewed: ${summary.analysis_count}`,
        "",
        "--- SUMMARY ---",
        summary.summary,
        "",
        "--- RECOMMENDATIONS ---",
        ...summary.recommendations.map((r, i) => `${i + 1}. ${r}`),
        "",
        "=== END OF SUMMARY ===",
    ];

    return lines.join("\n");
}
