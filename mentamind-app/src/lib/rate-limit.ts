import { NextResponse } from "next/server";

// In-memory store for rate limiting (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT = {
    postsPerHour: 5,
    repliesPerHour: 20,
    chatPerMinute: 10,
};

export function checkRateLimit(
    anonId: string,
    action: "post" | "reply" | "chat"
): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
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

    const record = rateLimitStore.get(key);

    // If no record or window has expired, create new record
    if (!record || now > record.resetTime) {
        rateLimitStore.set(key, {
            count: 1,
            resetTime: now + windowMs,
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
            resetIn: record.resetTime - now,
        };
    }

    // Increment and allow
    record.count++;
    return {
        allowed: true,
        remaining: limit - record.count,
        resetIn: record.resetTime - now,
    };
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
