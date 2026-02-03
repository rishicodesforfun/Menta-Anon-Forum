"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PostCard, Post } from "@/components/forum/post-card";
import { CreatePost } from "@/components/forum/create-post";
import { GlassCard } from "@/components/ui/glass-card";
import { useSession } from "@/lib/session-context";
import { Users, TrendingUp, Clock, AlertTriangle, Flame, ArrowUp, Sparkles } from "lucide-react";

type SortOption = "new" | "top" | "hot";

export default function CommunityPage() {
    const { userId, identity, isLoading: sessionLoading } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rateLimitError, setRateLimitError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>("hot");

    // Get the display name from session identity
    const displayName = identity ? `${identity.name} ${identity.number}` : "";
    const initials = identity ? identity.name.split(" ").map((w: string) => w[0]).join("") : "";

    // Fetch posts from API
    const fetchPosts = useCallback(async (sort: SortOption = sortBy) => {
        if (!userId) return;

        setIsLoadingPosts(true);
        try {
            const res = await fetch(`/api/posts?sort=${sort}`, {
                headers: {
                    "x-anonymous-id": userId,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch posts");

            const data = await res.json();
            setPosts(data.posts);
        } catch (err) {
            console.error("Failed to fetch posts:", err);
            setError("Failed to load posts. Please try again.");
        } finally {
            setIsLoadingPosts(false);
        }
    }, [userId, sortBy]);

    useEffect(() => {
        if (userId) {
            fetchPosts(sortBy);
        }
    }, [userId, sortBy, fetchPosts]);

    const handleSortChange = (newSort: SortOption) => {
        setSortBy(newSort);
    };

    const handleCreatePost = async (content: string) => {
        if (!userId) return;

        setRateLimitError(null);

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-anonymous-id": userId,
                },
                body: JSON.stringify({ content }),
            });

            if (res.status === 429) {
                const data = await res.json();
                setRateLimitError(`Rate limit reached. Please wait ${data.retryAfter} seconds before posting again.`);
                return;
            }

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to create post");
            }

            const data = await res.json();
            setPosts([data.post, ...posts]);
        } catch (err) {
            console.error("Failed to create post:", err);
            setError("Failed to create post. Please try again.");
        }
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
                    {/* Two Column Layout */}
                    <div className="flex gap-8 max-w-6xl mx-auto">
                        {/* Main Content - Posts */}
                        <div className="flex-1 max-w-2xl">
                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6"
                            >
                                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                                    Community <span className="gradient-text">Support</span>
                                </h1>
                                <p className="text-muted-foreground">
                                    Share your thoughts anonymously. We&apos;re all in this together.
                                </p>
                            </motion.div>

                            {/* Sort Tabs */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="mb-6"
                            >
                                <GlassCard className="!p-2" hover={false}>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleSortChange("hot")}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${sortBy === "hot"
                                                ? "bg-primary/20 text-primary"
                                                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                                }`}
                                        >
                                            <Flame className="w-4 h-4" />
                                            Hot
                                        </button>
                                        <button
                                            onClick={() => handleSortChange("new")}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${sortBy === "new"
                                                ? "bg-primary/20 text-primary"
                                                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                                }`}
                                        >
                                            <Sparkles className="w-4 h-4" />
                                            New
                                        </button>
                                        <button
                                            onClick={() => handleSortChange("top")}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${sortBy === "top"
                                                ? "bg-primary/20 text-primary"
                                                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                                }`}
                                        >
                                            <ArrowUp className="w-4 h-4" />
                                            Top
                                        </button>
                                    </div>
                                </GlassCard>
                            </motion.div>

                            {/* Posts Feed */}
                            <div className="space-y-4">
                                {isLoadingPosts ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        Loading posts...
                                    </div>
                                ) : posts.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No posts yet. Be the first to share!
                                    </div>
                                ) : (
                                    posts.map((post, index) => (
                                        <PostCard
                                            key={post.id}
                                            post={post}
                                            index={index}
                                            onLike={handleLike}
                                            onReply={handleReply}
                                            onFlag={handleFlag}
                                        />
                                    ))
                                )}
                            </div>

                            {/* Load More */}
                            {posts.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-8 text-center"
                                >
                                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                                        Load more posts...
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="hidden lg:block w-80 flex-shrink-0">
                            <div className="sticky top-24 space-y-4">
                                {/* User Identity Card */}
                                {identity && !sessionLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <GlassCard className="!p-4" hover={false}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                                    <span className="text-sm font-semibold text-white">
                                                        {initials}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Posting as</p>
                                                    <p className="font-medium">{displayName}</p>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                )}

                                {/* Create Post */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 }}
                                >
                                    <CreatePost onSubmit={handleCreatePost} />

                                    {/* Rate Limit Error */}
                                    {rateLimitError && (
                                        <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm">
                                            ⏱️ {rateLimitError}
                                        </div>
                                    )}

                                    {/* General Error */}
                                    {error && (
                                        <div className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                            {error}
                                        </div>
                                    )}
                                </motion.div>

                                {/* Quick Stats */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <GlassCard className="!p-4" hover={false}>
                                        <h3 className="font-medium mb-3">Community Stats</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <Users className="w-5 h-5 text-primary" />
                                                <div>
                                                    <p className="font-bold">247</p>
                                                    <p className="text-xs text-muted-foreground">Online Now</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <TrendingUp className="w-5 h-5 text-green-500" />
                                                <div>
                                                    <p className="font-bold">{posts.length}</p>
                                                    <p className="text-xs text-muted-foreground">Posts Today</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Clock className="w-5 h-5 text-accent" />
                                                <div>
                                                    <p className="font-bold">24/7</p>
                                                    <p className="text-xs text-muted-foreground">Support</p>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>

                                {/* Crisis Banner */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.25 }}
                                >
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                                        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-medium">In crisis?</p>
                                            <p className="text-muted-foreground mt-1">
                                                Call 988 (US) or text HOME to 741741.
                                            </p>
                                            <p className="text-muted-foreground">You matter. 💙</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile: Create Post shown below posts */}
                    <div className="lg:hidden max-w-2xl mx-auto mt-8">
                        {/* Mobile Identity Card */}
                        {identity && !sessionLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4"
                            >
                                <GlassCard className="!p-4" hover={false}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                            <span className="text-sm font-semibold text-white">
                                                {initials}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Posting as</p>
                                            <p className="font-medium">{displayName}</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        )}

                        <CreatePost onSubmit={handleCreatePost} />

                        {rateLimitError && (
                            <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm">
                                ⏱️ {rateLimitError}
                            </div>
                        )}

                        {/* Mobile Crisis Banner */}
                        <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                            <p className="text-sm">
                                <span className="font-medium">In crisis?</span>{" "}
                                <span className="text-muted-foreground">
                                    Call 988 (US) or text HOME to 741741.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
