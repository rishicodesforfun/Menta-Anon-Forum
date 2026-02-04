import { NextResponse } from "next/server";
import prisma from "./db";

// Rate limit configuration
const RATE_LIMIT = {
    postsPerHour: 5,
    repliesPerHour: 20,
    chatPerMinute: 10,
};

export async function checkRateLimit(
    anonId: string,
    action: "post" | "reply" | "chat"
): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
    const now = new Date();
    const key = `${anonId}:${action}`;

    // Get the limit based on action
    let limit: number;
    let windowMs: number;
    switch (action) {
        case "post":
            limit = RATE_LIMIT.postsPerHour;
            windowMs = 60 * 60 * 1000; // 1 hour
            break;
        case "reply":
            limit = RATE_LIMIT.repliesPerHour;
            windowMs = 60 * 60 * 1000; // 1 hour
            break;
        case "chat":
            limit = RATE_LIMIT.chatPerMinute;
            windowMs = 60 * 1000; // 1 minute
            break;
        default:
            limit = 10;
            windowMs = 60 * 1000;
    }

    try {
        // Find existing rate limit record
        const record = await prisma.rateLimit.findUnique({
            where: { key },
        });

        // If no record or window has expired, create/reset record
        if (!record || now > record.resetTime) {
            await prisma.rateLimit.upsert({
                where: { key },
                update: {
                    count: 1,
                    resetTime: new Date(now.getTime() + windowMs),
                },
                create: {
                    key,
                    count: 1,
                    resetTime: new Date(now.getTime() + windowMs),
                },
            });
            return {
                allowed: true,
                remaining: limit - 1,
                resetIn: windowMs,
            };
        }

        // Check if limit exceeded
        if (record.count >= limit) {
            return {
                allowed: false,
                remaining: 0,
                resetIn: record.resetTime.getTime() - now.getTime(),
            };
        }

        // Increment and allow
        await prisma.rateLimit.update({
            where: { key },
            data: { count: record.count + 1 },
        });

        return {
            allowed: true,
            remaining: limit - (record.count + 1),
            resetIn: record.resetTime.getTime() - now.getTime(),
        };
    } catch (error) {
        console.error("Rate limit check failed:", error);
        // Fail open - allow request if DB is down
        return {
            allowed: true,
            remaining: limit,
            resetIn: windowMs,
        };
    }
}

export function rateLimitResponse(resetIn: number) {
    return NextResponse.json(
        {
            error: "Rate limit exceeded",
            message: "Please wait before trying again",
            retryAfter: Math.ceil(resetIn / 1000),
        },
        {
            status: 429,
            headers: {
                "Retry-After": String(Math.ceil(resetIn / 1000)),
            },
        }
    );
}

// Cleanup old rate limit records (call periodically)
export async function cleanupExpiredRateLimits() {
    try {
        await prisma.rateLimit.deleteMany({
            where: {
                resetTime: { lt: new Date() },
            },
        });
    } catch (error) {
        console.error("Rate limit cleanup failed:", error);
    }
}
