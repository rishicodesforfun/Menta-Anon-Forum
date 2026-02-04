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

// OpenAI client initialized inside function to prevent build-time errors

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
interface AnalysisInput {
    primaryEmotions: string[];
    secondaryEmotions: string[];
    themes: string[];
    possibleCoreIssue: string;
    intensity: string;
}

/**
 * Generates a psychologist-ready summary from emotion analysis data
 * 
 * @param analyses - Array of emotion analyses (from DB)
 * @returns PsychologistSummary or null if generation fails
 */
export async function generatePsychologistSummary(
    sessionId: string,
    analyses: AnalysisInput[]
): Promise<PsychologistSummary | null> {
    try {
        if (analyses.length === 0) {
            return null;
        }

        // Aggregate analysis data
        const aggregated = aggregateAnalyses(analyses);
        const analysisText = JSON.stringify(aggregated, null, 2);

        const prompt = SUMMARY_PROMPT.replace("<<<ANALYSIS_DATA>>>", analysisText);

        // Initialize OpenAI client with OpenRouter
        const openai = new OpenAI({
            apiKey: process.env.OPENROUTER_API_KEY,
            baseURL: "https://openrouter.ai/api/v1",
            defaultHeaders: {
                "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
                "X-Title": process.env.OPENROUTER_SITE_NAME || "MentaMind",
            }
        });

        const completion = await openai.chat.completions.create({
            model: "meta-llama/llama-3.3-70b-instruct",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 300,
            temperature: 0.2,
        });

        const responseText = completion.choices[0]?.message?.content || "";
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            console.error("Summary generation: No JSON found");
            return null;
        }

        const parsed = JSON.parse(jsonMatch[0]);

        return {
            summary: parsed.summary || "Summary not available.",
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
 * Aggregates multiple emotion analyses into a single cohesive data structure
 */
function aggregateAnalyses(analyses: AnalysisInput[]) {
    const allPrimary = analyses.flatMap(a => a.primaryEmotions);
    const allSecondary = analyses.flatMap(a => a.secondaryEmotions);
    const allThemes = analyses.flatMap(a => a.themes);
    const coreIssues: string[] = [];
    analyses.forEach(a => {
        if (a.possibleCoreIssue && a.possibleCoreIssue !== "unspecified") {
            coreIssues.push(a.possibleCoreIssue);
        }
    });

    // Count meaningful frequencies
    const primaryCounts = countFrequencies(allPrimary);
    const themeCounts = countFrequencies(allThemes);
    const issueCounts = countFrequencies(coreIssues);

    // Determine peak intensity
    const intensityLevels = ["low", "medium", "high", "crisis"];
    let peakIntensity = "low";
    analyses.forEach(a => {
        if (intensityLevels.indexOf(a.intensity) > intensityLevels.indexOf(peakIntensity)) {
            peakIntensity = a.intensity;
        }
    });

    return {
        dominant_emotions: getTopN(primaryCounts, 3),
        underlying_emotions: getTopN(countFrequencies(allSecondary), 3),
        recurring_themes: getTopN(themeCounts, 3),
        potential_core_issues: getTopN(issueCounts, 2),
        peak_intensity: peakIntensity,
        progression: analyses.map(a => a.intensity).join(" -> "),
    };
}

/**
 * Helper to count frequencies of items in an array
 */
function countFrequencies<T>(arr: T[]): Map<T, number> {
    const counts = new Map<T, number>();
    for (const item of arr) {
        counts.set(item, (counts.get(item) || 0) + 1);
    }
    return counts;
}

/**
 * Helper to get top N items from a frequency map
 */
function getTopN<T>(counts: Map<T, number>, n: number): T[] {
    return Array.from(counts.entries())
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, n)
        .map(([item]) => item);
}

/**
 * Determines risk level from intensity and keywords
 */
export function calculateRiskLevel(
    analyses: AnalysisInput[]
): "low" | "moderate" | "elevated" | "high" {
    const hascrisis = analyses.some(a => a.intensity === "crisis");
    const hasHigh = analyses.some(a => a.intensity === "high");
    const highRiskThemes = ["suicide", "self-harm", "hopelessness", "crisis"];

    const hasHighRiskTheme = analyses.some(a =>
        a.themes.some((t: string) => highRiskThemes.includes(t.toLowerCase()))
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
