import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

interface PostLikeParams {
    params: Promise<{
        id: string;
    }>;
}

export async function POST(request: NextRequest, { params }: PostLikeParams) {
    const anonId = request.headers.get("x-anonymous-id");
    const { id } = await params;

    if (!anonId) {
        return NextResponse.json(
            { error: "Anonymous ID required" },
            { status: 401 }
        );
    }

    try {
        // Check if post exists
        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (!post) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

        // Check if already liked
        const existingLike = await prisma.postLike.findUnique({
            where: {
                postId_userId: {
                    postId: id,
                    userId: anonId,
                },
            },
        });

        if (existingLike) {
            // Unlike: remove like and decrement count
            await prisma.$transaction([
                prisma.postLike.delete({
                    where: { id: existingLike.id },
                }),
                prisma.post.update({
                    where: { id },
                    data: { likes: { decrement: 1 } },
                }),
            ]);

            return NextResponse.json({
                success: true,
                postId: id,
                liked: false,
                likes: post.likes - 1,
            });
        } else {
            // Like: add like and increment count
            await prisma.$transaction([
                prisma.postLike.create({
                    data: {
                        postId: id,
                        userId: anonId,
                    },
                }),
                prisma.post.update({
                    where: { id },
                    data: { likes: { increment: 1 } },
                }),
            ]);

            return NextResponse.json({
                success: true,
                postId: id,
                liked: true,
                likes: post.likes + 1,
            });
        }
    } catch (error) {
        console.error("Failed to toggle like:", error);
        return NextResponse.json(
            { error: "Failed to update like status" },
            { status: 500 }
        );
    }
}
