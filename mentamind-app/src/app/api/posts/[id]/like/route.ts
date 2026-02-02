import { NextRequest, NextResponse } from "next/server";

// Reference to the shared posts store from the main route
// In production, this would be a database call

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

    // In a real app, this would update the database
    // For now, returning a mock response
    return NextResponse.json({
        success: true,
        postId: id,
        liked: true,
        message: "Like status updated",
    });
}
