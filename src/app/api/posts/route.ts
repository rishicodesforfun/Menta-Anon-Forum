import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";

// GET /api/posts - Fetch all posts
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const sort = searchParams.get("sort") || "new"; // new, top, hot
    const anonId = request.headers.get("x-anonymous-id") || "";

    try {
        // Build orderBy based on sort
        let orderBy: object;
        switch (sort) {
            case "top":
                orderBy = { likes: "desc" as const };
                break;
            case "hot":
                // Hot score approximation - recent + popular
                orderBy = [
                    { likes: "desc" as const },
                    { createdAt: "desc" as const },
                ];
                break;
            case "new":
            default:
                orderBy = { createdAt: "desc" as const };
                break;
        }

        // Get total count for pagination
        const total = await prisma.post.count();

        // Fetch posts with pagination
        const posts = await prisma.post.findMany({
            orderBy,
            skip: (page - 1) * limit,
            take: limit,
            include: {
                likedBy: {
                    where: { userId: anonId },
                    select: { id: true },
                },
            },
        });

        // Transform posts to include isLiked
        const postsWithLikeStatus = posts.map((post) => ({
            id: post.id,
            content: post.content,
            authorId: post.authorId,
            likes: post.likes,
            replyCount: post.replyCount,
            createdAt: post.createdAt.toISOString(),
            isLiked: post.likedBy.length > 0,
        }));

        return NextResponse.json({
            posts: postsWithLikeStatus,
            sort,
            pagination: {
                page,
                limit,
                total,
                hasMore: (page - 1) * limit + posts.length < total,
            },
        });
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        );
    }
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
    const rateCheck = await checkRateLimit(anonId, "post");
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

        // Create post in database
        const post = await prisma.post.create({
            data: {
                content: content.trim(),
                authorId: anonId,
            },
        });

        return NextResponse.json({
            post: {
                id: post.id,
                content: post.content,
                authorId: post.authorId,
                likes: post.likes,
                replyCount: post.replyCount,
                createdAt: post.createdAt.toISOString(),
                isLiked: false,
            },
        });
    } catch (error) {
        console.error("Failed to create post:", error);
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}
