"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Flag, Clock } from "lucide-react";
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

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
}

export function PostCard({ post, onLike, onReply, onFlag, index = 0 }: PostCardProps) {
    const authorName = generateAnonName(post.authorId);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
        >
            <GlassCard className="group">
                {/* Author Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center">
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

                    {/* Flag Button */}
                    <button
                        onClick={() => onFlag?.(post.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-destructive"
                        title="Report this post"
                    >
                        <Flag className="w-4 h-4" />
                    </button>
                </div>

                {/* Content */}
                <p className="text-foreground leading-relaxed mb-4 whitespace-pre-wrap">
                    {post.content}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onLike?.(post.id)}
                        className={cn(
                            "gap-2",
                            post.isLiked && "text-pink-500 hover:text-pink-600"
                        )}
                    >
                        <Heart
                            className={cn(
                                "w-4 h-4 transition-all",
                                post.isLiked && "fill-current scale-110"
                            )}
                        />
                        <span>{post.likes}</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onReply?.(post.id)}
                        className="gap-2"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.replyCount}</span>
                    </Button>
                </div>
            </GlassCard>
        </motion.div>
    );
}
