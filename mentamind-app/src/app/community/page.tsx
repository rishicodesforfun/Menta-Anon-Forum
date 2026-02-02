"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PostCard, Post } from "@/components/forum/post-card";
import { CreatePost } from "@/components/forum/create-post";
import { GlassCard } from "@/components/ui/glass-card";
import { getAnonymousId, generateAnonName } from "@/lib/anonymous";
import { Users, TrendingUp, Clock, AlertTriangle } from "lucide-react";

// Mock data for demo - will be replaced with API calls
const mockPosts: Post[] = [
    {
        id: "1",
        content: "Today was really hard. I woke up feeling like the weight of the world was on my shoulders. But I made it through. Small wins matter. 💪",
        authorId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        likes: 24,
        replyCount: 8,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        isLiked: false,
    },
    {
        id: "2",
        content: "Does anyone else feel like they're just going through the motions? I've been feeling disconnected lately. Would love to hear how others cope with this.",
        authorId: "b2c3d4e5-f6a7-8901-bcde-f23456789012",
        likes: 45,
        replyCount: 15,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        isLiked: true,
    },
    {
        id: "3",
        content: "Just wanted to share a positive moment - I finally talked to someone about what I've been going through. It felt scary but also liberating. If you're on the fence about opening up, this is your sign. 🌟",
        authorId: "c3d4e5f6-a7b8-9012-cdef-345678901234",
        likes: 89,
        replyCount: 23,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        isLiked: false,
    },
    {
        id: "4",
        content: "Breathing exercise that helped me today: 4-7-8 technique. Breathe in for 4 seconds, hold for 7, exhale for 8. Repeat 4 times. Simple but effective.",
        authorId: "d4e5f6a7-b8c9-0123-defa-456789012345",
        likes: 156,
        replyCount: 31,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        isLiked: true,
    },
];

export default function CommunityPage() {
    const [posts, setPosts] = useState<Post[]>(mockPosts);
    const [anonId, setAnonId] = useState<string>("");
    const [anonName, setAnonName] = useState<string>("");

    useEffect(() => {
        const id = getAnonymousId();
        setAnonId(id);
        setAnonName(generateAnonName(id));
    }, []);

    const handleCreatePost = async (content: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newPost: Post = {
            id: Date.now().toString(),
            content,
            authorId: anonId,
            likes: 0,
            replyCount: 0,
            createdAt: new Date().toISOString(),
            isLiked: false,
        };

        setPosts([newPost, ...posts]);
    };

    const handleLike = (postId: string) => {
        setPosts(posts.map((post) => {
            if (post.id === postId) {
                return {
                    ...post,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                    isLiked: !post.isLiked,
                };
            }
            return post;
        }));
    };

    const handleReply = (postId: string) => {
        // TODO: Open reply modal
        console.log("Reply to:", postId);
    };

    const handleFlag = (postId: string) => {
        // TODO: Open flag modal
        console.log("Flag:", postId);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 py-8">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                                Community <span className="gradient-text">Support</span>
                            </h1>
                            <p className="text-muted-foreground">
                                Share your thoughts anonymously. We&apos;re all in this together.
                            </p>
                        </motion.div>

                        {/* User Identity Card */}
                        {anonName && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="mb-6"
                            >
                                <GlassCard className="!p-4" hover={false}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                            <span className="text-sm font-semibold text-white">
                                                {anonName.split(" ").map(w => w[0]).join("")}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Posting as</p>
                                            <p className="font-medium">{anonName}</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        )}

                        {/* Create Post */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <CreatePost onSubmit={handleCreatePost} />
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-3 gap-4 mb-8"
                        >
                            <GlassCard className="!p-4 text-center" hover={false}>
                                <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                                <p className="text-lg font-bold">247</p>
                                <p className="text-xs text-muted-foreground">Online Now</p>
                            </GlassCard>
                            <GlassCard className="!p-4 text-center" hover={false}>
                                <TrendingUp className="w-5 h-5 mx-auto mb-1 text-green-500" />
                                <p className="text-lg font-bold">{posts.length}</p>
                                <p className="text-xs text-muted-foreground">Posts Today</p>
                            </GlassCard>
                            <GlassCard className="!p-4 text-center" hover={false}>
                                <Clock className="w-5 h-5 mx-auto mb-1 text-accent" />
                                <p className="text-lg font-bold">24/7</p>
                                <p className="text-xs text-muted-foreground">Support</p>
                            </GlassCard>
                        </motion.div>

                        {/* Crisis Banner */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-8"
                        >
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                                <p className="text-sm">
                                    <span className="font-medium">In crisis?</span>{" "}
                                    <span className="text-muted-foreground">
                                        Call 988 (US) or text HOME to 741741. You matter.
                                    </span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Posts Feed */}
                        <div className="space-y-4">
                            {posts.map((post, index) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    index={index}
                                    onLike={handleLike}
                                    onReply={handleReply}
                                    onFlag={handleFlag}
                                />
                            ))}
                        </div>

                        {/* Load More */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 text-center"
                        >
                            <button className="text-muted-foreground hover:text-foreground transition-colors">
                                Load more posts...
                            </button>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
