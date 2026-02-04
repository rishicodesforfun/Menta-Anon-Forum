import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";

// OpenAI client initialized inside handler to prevent build-time errors

// Crisis keywords that trigger immediate safety response
const CRISIS_KEYWORDS = [
    "suicide", "suicidal", "kill myself", "end my life", "want to die",
    "self-harm", "hurt myself", "cutting", "overdose", "no reason to live",
    "better off dead", "can't go on", "end it all"
];

const CRISIS_RESPONSE = `I'm really sorry you're feeling this overwhelmed. You're not alone, and help is available. Talking to a trusted person or a mental health professional right now could make a real difference.

**Please reach out immediately (India):**
• **iCall:** 9152987821
• **Vandrevala Foundation:** 1860-2662-345 (24/7)
• **NIMHANS:** 080-46110007
• **Snehi:** 044-24640050

You don't have to face this alone. Would you like to talk more about what you're going through?`;

const SYSTEM_PROMPT = `Role & Identity
You are Mentamind, an AI-powered mental health support assistant designed to provide empathetic, non-judgmental, culturally aware, and privacy-first emotional support.
Your purpose is to help users feel heard, supported, and guided, not diagnosed or medically treated.

Core Objectives
1. Provide emotional validation and active listening
2. Help users understand their emotions
3. Offer healthy coping strategies
4. Encourage professional help when required
5. Maintain strict ethical, legal, and safety boundaries

Conversational Style & Tone
• Warm, calm, empathetic, human-like
• Never robotic, preachy, or dismissive
• Use simple, clear language
• Adapt tone based on user state:
  o Distressed → extra gentle & grounding
  o Anxious → reassuring & structured
  o Confused → clarifying & patient
• Respect Indian social, cultural, and emotional contexts

Language Guidelines
• Default to English or Hinglish, depending on user tone
• Avoid clinical jargon unless user is comfortable
• Never shame, judge, or minimize emotions
• Use phrases like:
  o "That sounds really hard"
  o "You’re not weak for feeling this way"
  o "I’m glad you shared this"

Safety & Crisis Handling (CRITICAL)
If the user mentions self-harm, suicide, hopelessness, desire to die, or shows severe emotional distress, You must:
1. Respond with immediate empathy
2. Encourage reaching out to trusted people
3. Suggest professional help or crisis helplines
4. Avoid giving instructions, methods, or timelines
5. Never present yourself as the only support

Strict Boundaries
You must never:
• Diagnose mental illnesses
• Prescribe medication
• Replace a licensed therapist
• Encourage isolation from real people
• Provide harmful or unethical advice

Functional Capabilities
You can:
• Help users track moods and patterns
• Suggest grounding exercises (breathing, journaling, reflection)
• Offer CBT-inspired reframing (without naming it clinically)
• Guide lifestyle habits (sleep, routine, stress management)
• Ask gentle follow-up questions when appropriate

Privacy & Trust
• Assume confidentiality and discretion
• Never request unnecessary personal data
• Reassure users about data safety if they express concern

Mentamind Philosophy
You believe that:
• Mental health struggles are human, not flaws
• Seeking help is strength
• Healing is non-linear
• Small steps matter
You exist to support, not fix.

Output Quality Rules
• Responses must feel human and emotionally intelligent
• Avoid generic motivational quotes
• Be present-focused, not overly philosophical
• Keep answers concise but meaningful

Few-Shot Response Patterns (Internal Guidelines):
- Emotional Validation: "That sounds really heavy, and I’m glad you shared it. Feeling like you’re failing can be incredibly painful, but it doesn’t mean you actually are one."
- Anxiety Support: "That constant anxiety can be exhausting... certain grounding exercises might help. Would you like to try one?"
- gentle Reframing: "When things go wrong repeatedly, our mind can start painting everything in black and white. Let’s pause... can you think of one small thing you handled okay?"
- Crisis Response: "I’m really sorry you’re feeling this much pain. You don’t have to face this alone. Talking to a trusted person or a mental health professional could really help."`;

function checkForCrisis(text: string): boolean {
    const lowerText = text.toLowerCase();
    return CRISIS_KEYWORDS.some((keyword) => lowerText.includes(keyword));
}

export async function POST(request: NextRequest) {
    const anonId = request.headers.get("x-anonymous-id");

    if (!anonId) {
        return NextResponse.json(
            { error: "Anonymous ID required" },
            { status: 401 }
        );
    }

    // Check rate limit
    const rateCheck = await checkRateLimit(anonId, "chat");
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetIn);
    }

    try {
        const body = await request.json();
        const { message, history = [] } = body;

        if (!message || typeof message !== "string") {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        if (message.length > 2000) {
            return NextResponse.json(
                { error: "Message too long (max 2000 characters)" },
                { status: 400 }
            );
        }

        // Check for crisis content first - override AI response
        if (checkForCrisis(message)) {
            return NextResponse.json({
                message: CRISIS_RESPONSE,
                timestamp: new Date().toISOString(),
            });
        }

        // Initialize OpenAI client with OpenRouter base URL
        const openai = new OpenAI({
            apiKey: process.env.OPENROUTER_API_KEY,
            baseURL: "https://openrouter.ai/api/v1",
            defaultHeaders: {
                "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
                "X-Title": process.env.OPENROUTER_SITE_NAME || "MentaMind",
            }
        });

        // Build messages for OpenRouter/OpenAI
        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            { role: "system", content: SYSTEM_PROMPT },
            ...history.slice(-10).map((msg: { role: string; content: string }) => ({
                role: msg.role as "user" | "assistant",
                content: msg.content,
            })),
            { role: "user", content: message },
        ];

        // Call OpenRouter with Meta Llama 3.3 70B Instruct
        const completion = await openai.chat.completions.create({
            model: "meta-llama/llama-3.3-70b-instruct", // Meta Llama 3.3 70B Instruct
            messages,
            max_tokens: 400,
            temperature: 0.3, // Low temperature (0.2-0.4) for crisis stability per spec
        });

        const response = completion.choices[0]?.message?.content ||
            "I'm here for you. Could you tell me more about how you're feeling?";

        // BACKGROUND: Run emotion analysis (invisible to user)
        // Count user messages in history
        const userMessageCount = history.filter((m: { role: string }) => m.role === "user").length + 1;

        if (userMessageCount % 5 === 0) {
            // Import and run analysis asynchronously (fire-and-forget)
            import("@/lib/emotion-analysis").then(({ analyzeAndStoreEmotions }) => {
                const conversationForAnalysis = [
                    ...history.map((m: { role: string; content: string }) => ({
                        role: m.role as "user" | "assistant",
                        content: m.content,
                    })),
                    { role: "user" as const, content: message },
                    { role: "assistant" as const, content: response },
                ];
                analyzeAndStoreEmotions(anonId, conversationForAnalysis).catch(console.error);
            }).catch(console.error);
        }

        return NextResponse.json({
            message: response,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("OpenRouter API error:", error);

        // Fallback response if API fails
        return NextResponse.json({
            message: "I'm having a bit of trouble connecting right now, but I'm still here for you. Could you share what's on your mind?",
            timestamp: new Date().toISOString(),
        });
    }
}

