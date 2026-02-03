"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share, Flag, MoreHorizontal, Clock } from "lucide-react";
import { generateAnonName } from "@/lib/anonymous";
import { cn } from "@/lib/utils";

export interface Post {
    id: string;
    content: string;
    authorId: string;
    likes: number;
    replyCount: number;
    createdAt: string;
    isLiked?: boolean;
}

interface PostCardProps {
    post: Post;
    onLike?: (postId: string) => void;
    onReply?: (postId: string) => void;
    onFlag?: (postId: string) => void;
    index?: number;
}

function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
}

export function PostCard({ post, onLike, onReply, onFlag, index = 0 }: PostCardProps) {
    const authorName = generateAnonName(post.authorId);

    // Generate consistent color based on author ID
    const colors = [
        "bg-gradient-to-br from-teal-400 to-emerald-500",
        "bg-gradient-to-br from-orange-400 to-pink-500",
        "bg-gradient-to-br from-purple-400 to-indigo-500",
        "bg-gradient-to-br from-blue-400 to-cyan-500",
        "bg-gradient-to-br from-rose-400 to-red-500",
        "bg-gradient-to-br from-amber-400 to-orange-500",
    ];
    const colorIndex = post.authorId.charCodeAt(0) % colors.length;
    const avatarColor = colors[colorIndex];

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="glass-card p-5"
        >
            {/* Author Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    {/* Avatar with varied colors */}
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", avatarColor)}>
                        <span className="text-sm font-semibold text-white">
                            {authorName.split(" ").map(w => w[0]).join("")}
                        </span>
                    </div>
                    <div>
                        <p className="font-medium text-sm">{authorName}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(post.createdAt)}
                        </p>
                    </div>
                </div>

                {/* More options */}
                <button
                    className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>

            {/* Content */}
            <p className="text-foreground leading-relaxed mb-4 whitespace-pre-wrap">
                {post.content}
            </p>

            {/* Action buttons - Like first, then comments */}
            <div className="flex items-center gap-1 pt-3 border-t border-border/50">
                {/* Like Button */}
                <button
                    onClick={() => onLike?.(post.id)}
                    className={cn(
                        "btn-ghost flex items-center gap-2",
                        post.isLiked && "text-pink-500 hover:text-pink-600"
                    )}
                >
                    <Heart
                        className={cn(
                            "w-4 h-4 transition-all",
                            post.isLiked && "fill-current scale-110"
                        )}
                    />
                    <span className="text-sm font-medium">{post.likes}</span>
                </button>

                {/* Comments Button */}
                <button
                    onClick={() => onReply?.(post.id)}
                    className="btn-ghost flex items-center gap-2"
                >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{post.replyCount} Comments</span>
                </button>

                {/* Share Button */}
                <button className="btn-ghost flex items-center gap-2">
                    <Share className="w-4 h-4" />
                    <span className="text-sm font-medium hidden sm:inline">Share</span>
                </button>

                {/* Report Button */}
                <button
                    onClick={() => onFlag?.(post.id)}
                    className="btn-ghost flex items-center gap-2 ml-auto"
                >
                    <Flag className="w-4 h-4" />
                    <span className="text-sm font-medium hidden sm:inline">Report</span>
                </button>
            </div>
        </motion.article>
    );
}
