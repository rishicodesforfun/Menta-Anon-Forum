import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";

// Crisis keywords that trigger immediate safety response
const CRISIS_KEYWORDS = [
    "suicide", "suicidal", "kill myself", "end my life", "want to die",
    "self-harm", "hurt myself", "cutting", "overdose", "no reason to live",
    "better off dead", "can't go on", "end it all"
];

const CRISIS_RESPONSE = `I hear you, and I'm really concerned about what you're sharing. Your life matters deeply, and there are people who want to help right now.

**Please reach out immediately:**
• **US:** Call or text 988 (Suicide & Crisis Lifeline)
• **UK:** Call 116 123 (Samaritans)
• **India:** Call iCall 9152987821
• **Text:** HOME to 741741 (Crisis Text Line)

You don't have to face this alone. Would you like to talk more about what you're going through?`;

const SYSTEM_PROMPT = `You are MentaMind, a compassionate AI companion for emotional support. Follow these rules strictly:

IDENTITY:
- You are a warm, empathetic listener - NOT a therapist or medical professional
- You provide emotional support and active listening
- You validate feelings without judgment

SAFETY RULES:
1. NEVER provide medical diagnoses or treatment recommendations
2. NEVER prescribe or discuss medications
3. NEVER claim to be a replacement for professional help
4. If someone mentions self-harm, suicide, or crisis, ALWAYS provide crisis resources first
5. Encourage professional help when appropriate

CONVERSATION STYLE:
- Use warm, caring language
- Ask open-ended questions
- Validate emotions
- Suggest healthy coping strategies (breathing, journaling, walking)
- Keep responses concise (under 150 words)
- Be present and attentive

Remember: You are a supportive friend, not a clinical resource.`;

// Simple response generation (in production, use OpenAI API)
function generateResponse(userMessage: string, history: { role: string; content: string }[]): string {
    // Check for crisis content
    const lowerMessage = userMessage.toLowerCase();
    for (const keyword of CRISIS_KEYWORDS) {
        if (lowerMessage.includes(keyword)) {
            return CRISIS_RESPONSE;
        }
    }

    // Generate contextual responses
    const responses: { [key: string]: string[] } = {
        greeting: [
            "Hello! I'm glad you're here. How are you feeling today?",
            "Hi there. It's good to connect with you. What's on your mind?",
            "Welcome! I'm here to listen. How can I support you today?",
        ],
        sad: [
            "I'm sorry you're feeling this way. It takes courage to share that. Would you like to tell me more about what's been happening?",
            "Feeling sad is really hard. I want you to know that your feelings are valid. What do you think is contributing to this?",
            "Thank you for being open with me. Sadness can be overwhelming. Is there something specific that triggered these feelings?",
        ],
        anxious: [
            "Anxiety can feel so overwhelming. Let's take a breath together. Can you tell me what's making you feel anxious?",
            "I hear that you're feeling anxious. That's a really challenging emotion to sit with. What's been weighing on your mind?",
            "When anxiety hits, it can feel all-consuming. Would it help to talk through what's causing these feelings?",
        ],
        lonely: [
            "Feeling lonely is such a painful experience. I'm here with you right now. When did you start feeling this way?",
            "Loneliness can make everything harder. Know that reaching out here was brave. What kind of connection are you missing?",
            "I'm sorry you're feeling isolated. Those feelings are valid. Would you like to share more about what's been happening?",
        ],
        default: [
            "Thank you for sharing that with me. Can you tell me more about how that makes you feel?",
            "I hear you. Those feelings are valid. What do you think might help right now?",
            "That sounds really challenging. Remember, it's okay to not be okay sometimes. What would feel supportive?",
            "I appreciate you trusting me with this. What would a small step forward look like for you?",
            "Your feelings matter. Let's explore this together. What's been on your heart lately?",
        ],
    };

    // Simple keyword matching for category
    let category = "default";
    if (lowerMessage.match(/\b(hi|hello|hey|morning|evening)\b/)) {
        category = "greeting";
    } else if (lowerMessage.match(/\b(sad|depressed|down|unhappy|crying|tears|hopeless)\b/)) {
        category = "sad";
    } else if (lowerMessage.match(/\b(anxious|anxiety|worried|nervous|panic|stressed|stress)\b/)) {
        category = "anxious";
    } else if (lowerMessage.match(/\b(lonely|alone|isolated|no friends|nobody|no one)\b/)) {
        category = "lonely";
    }

    const categoryResponses = responses[category];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
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
    const rateCheck = checkRateLimit(anonId, "chat");
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

        // Generate response (in production, call OpenAI API with SYSTEM_PROMPT)
        const response = generateResponse(message, history);

        // Simulate slight delay for more natural feel
        await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));

        return NextResponse.json({
            message: response,
            timestamp: new Date().toISOString(),
        });
    } catch {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 }
        );
    }
}
