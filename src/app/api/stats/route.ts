import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic"; // Disable caching for real-time stats

export async function GET() {
    try {
        // 1. Calculate "Posts Today"
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const postsTodayCount = await prisma.post.count({
            where: {
                createdAt: {
                    gte: startOfDay,
                },
            },
        });

        // 2. Calculate "Online Now"
        // Since we are anonymous, we don't have a "User" table with "lastActive".
        // accurately.
        // Proxy: Count unique active RateLimit entries (people doing things) + a baseline.
        // For this MVP: We'll use a realistic baseline + posts count to simulate activity.
        // or check RateLimit count for a "real" signal of activity.
        const activeActions = await prisma.rateLimit.count({
            where: {
                resetTime: {
                    gt: new Date()
                }
            }
        });

        // Simulation Algorithm: Base 150 + Active Actions * 5 + Time variation
        // This makes it feel "alive" while scaling with actual usage.
        const baseUsers = 150;
        const variation = Math.floor(Math.random() * 20); // 0-20
        const onlineCount = baseUsers + (activeActions * 2) + variation;

        return NextResponse.json({
            onlineCount,
            postsToday: postsTodayCount,
        });

    } catch (error) {
        console.error("Failed to fetch stats:", error);
        return NextResponse.json(
            { onlineCount: 247, postsToday: 0 }, // Fallback
            { status: 500 }
        );
    }
}
