import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { generatePsychologistSummary } from "@/lib/summary-generator";

/**
 * Summary API Route
 * 
 * GET /api/analysis/summary?sessionId=xxx
 * 
 * Returns a psychologist-friendly summary of emotion analyses for a session.
 * This is for admin/therapist use only - not exposed to regular users.
 */

// Admin API key for authorization (in production, use proper auth)
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "mentamind-admin-key";

export async function GET(request: NextRequest) {
    // Check authorization
    const authHeader = request.headers.get("authorization");
    const apiKey = authHeader?.replace("Bearer ", "");

    if (apiKey !== ADMIN_API_KEY) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const hours = parseInt(searchParams.get("hours") || "24");

    try {
        if (sessionId) {
            // Get analyses for specific session
            const analyses = await prisma.emotionAnalysis.findMany({
                where: { sessionId },
                orderBy: { createdAt: "asc" },
            });

            if (analyses.length === 0) {
                return NextResponse.json({
                    sessionId,
                    message: "No analyses found for this session",
                    analyses: [],
                });
            }

            // Generate summary using summary generator
            const summary = await generatePsychologistSummary(sessionId, analyses);

            return NextResponse.json({
                sessionId,
                analysisCount: analyses.length,
                summary,
                analyses: analyses.map(a => ({
                    id: a.id,
                    primaryEmotions: a.primaryEmotions,
                    secondaryEmotions: a.secondaryEmotions,
                    themes: a.themes,
                    possibleCoreIssue: a.possibleCoreIssue,
                    intensity: a.intensity,
                    messageCount: a.messageCount,
                    createdAt: a.createdAt,
                })),
            });
        } else {
            // Get high-intensity analyses from the last N hours
            const since = new Date(Date.now() - hours * 60 * 60 * 1000);

            const highIntensity = await prisma.emotionAnalysis.findMany({
                where: {
                    intensity: { in: ["high", "crisis"] },
                    createdAt: { gte: since },
                },
                orderBy: { createdAt: "desc" },
                take: 50,
            });

            // Group by session
            const sessionMap = new Map<string, typeof highIntensity>();
            for (const analysis of highIntensity) {
                const existing = sessionMap.get(analysis.sessionId) || [];
                existing.push(analysis);
                sessionMap.set(analysis.sessionId, existing);
            }

            const sessions = Array.from(sessionMap.entries()).map(([sid, analyses]) => ({
                sessionId: sid,
                analysisCount: analyses.length,
                latestIntensity: analyses[0].intensity,
                latestCoreIssue: analyses[0].possibleCoreIssue,
                primaryEmotions: [...new Set(analyses.flatMap(a => a.primaryEmotions))],
                lastActivity: analyses[0].createdAt,
            }));

            return NextResponse.json({
                hours,
                totalHighIntensity: highIntensity.length,
                uniqueSessions: sessions.length,
                sessions,
            });
        }
    } catch (error) {
        console.error("Summary API error:", error);
        return NextResponse.json(
            { error: "Failed to generate summary" },
            { status: 500 }
        );
    }
}
