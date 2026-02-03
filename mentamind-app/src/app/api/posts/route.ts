import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";

// In-memory posts store (in production, use database)
interface Post {
    id: string;
    content: string;
    authorId: string;
    likes: number;
    replyCount: number;
    createdAt: string;
    likedBy: Set<string>;
}

const posts = new Map<string, Post>();

// Seed with some initial posts
const seedPosts = () => {
    const initialPosts = [
        {
            id: "seed-1",
            content: "Today was really hard. I woke up feeling like the weight of the world was on my shoulders. But I made it through. Small wins matter. 💪",
            authorId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            likes: 24,
            replyCount: 8,
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            likedBy: new Set<string>(),
        },
        {
            id: "seed-2",
            content: "Does anyone else feel like they're just going through the motions? I've been feeling disconnected lately. Would love to hear how others cope with this.",
            authorId: "b2c3d4e5-f6a7-8901-bcde-f23456789012",
            likes: 45,
            replyCount: 15,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            likedBy: new Set<string>(),
        },
        {
            id: "seed-3",
            content: "Just wanted to share a positive moment - I finally talked to someone about what I've been going through. It felt scary but also liberating. If you're on the fence about opening up, this is your sign. 🌟",
            authorId: "c3d4e5f6-a7b8-9012-cdef-345678901234",
            likes: 89,
            replyCount: 23,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
            likedBy: new Set<string>(),
        },
    ];

    initialPosts.forEach((post) => {
        posts.set(post.id, post);
    });
};

// Initialize seed data
if (posts.size === 0) {
    seedPosts();
}

// GET /api/posts - Fetch all posts
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const sort = searchParams.get("sort") || "new"; // new, top, hot
    const anonId = request.headers.get("x-anonymous-id") || "";

    // Convert map to array
    let allPosts = Array.from(posts.values());

    // Sort based on parameter
    switch (sort) {
        case "top":
            // Sort by most likes
            allPosts = allPosts.sort((a, b) => b.likes - a.likes);
            break;
        case "hot":
            // Sort by relevance (combination of recency and engagement)
            // Hot score = likes / (hours since posted + 2)^1.5
            allPosts = allPosts.sort((a, b) => {
                const hoursA = (Date.now() - new Date(a.createdAt).getTime()) / (1000 * 60 * 60);
                const hoursB = (Date.now() - new Date(b.createdAt).getTime()) / (1000 * 60 * 60);
                const scoreA = (a.likes + a.replyCount * 2) / Math.pow(hoursA + 2, 1.5);
                const scoreB = (b.likes + b.replyCount * 2) / Math.pow(hoursB + 2, 1.5);
                return scoreB - scoreA;
            });
            break;
        case "new":
        default:
            // Sort by newest first
            allPosts = allPosts.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            break;
    }

    // Paginate
    const start = (page - 1) * limit;
    const paginatedPosts = allPosts.slice(start, start + limit);

    // Add isLiked field based on current user
    const postsWithLikeStatus = paginatedPosts.map((post) => ({
        id: post.id,
        content: post.content,
        authorId: post.authorId,
        likes: post.likes,
        replyCount: post.replyCount,
        createdAt: post.createdAt,
        isLiked: post.likedBy.has(anonId),
    }));

    return NextResponse.json({
        posts: postsWithLikeStatus,
        sort,
        pagination: {
            page,
            limit,
            total: allPosts.length,
            hasMore: start + limit < allPosts.length,
        },
    });
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
    const anonId = request.headers.get("x-anonymous-id");

    if (!anonId) {
        return NextResponse.json(
            { error: "Anonymous ID required" },
            { status: 401 }
        );
    }

    // Check rate limit
    const rateCheck = checkRateLimit(anonId, "post");
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetIn);
    }

    try {
        const body = await request.json();
        const { content } = body;

        if (!content || typeof content !== "string") {
            return NextResponse.json(
                { error: "Content is required" },
                { status: 400 }
            );
        }

        if (content.length > 2000) {
            return NextResponse.json(
                { error: "Content too long (max 2000 characters)" },
                { status: 400 }
            );
        }

        const post: Post = {
            id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            content: content.trim(),
            authorId: anonId,
            likes: 0,
            replyCount: 0,
            createdAt: new Date().toISOString(),
            likedBy: new Set<string>(),
        };

        posts.set(post.id, post);

        return NextResponse.json({
            post: {
                id: post.id,
                content: post.content,
                authorId: post.authorId,
                likes: post.likes,
                replyCount: post.replyCount,
                createdAt: post.createdAt,
                isLiked: false,
            },
        });
    } catch {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 }
        );
    }
}
