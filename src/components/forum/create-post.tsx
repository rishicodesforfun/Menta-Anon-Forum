"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenLine, Send, Loader2 } from "lucide-react";

interface CreatePostProps {
    onSubmit: (content: string) => Promise<void>;
    placeholder?: string;
}

export function CreatePost({ onSubmit, placeholder = "Share what's on your mind..." }: CreatePostProps) {
    const [content, setContent] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!content.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await onSubmit(content.trim());
            setContent("");
            setIsExpanded(false);
        } catch (error) {
            console.error("Failed to create post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <GlassCard hover={false}>
            <AnimatePresence mode="wait">
                {!isExpanded ? (
                    <motion.button
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsExpanded(true)}
                        className="w-full flex items-center gap-3 text-left"
                    >
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                            <PenLine className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="text-muted-foreground">{placeholder}</span>
                    </motion.button>
                ) : (
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                    >
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={placeholder}
                            className="min-h-[120px] resize-none"
                            autoFocus
                        />

                        <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                                Press <kbd className="px-1.5 py-0.5 rounded bg-secondary text-xs">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-secondary text-xs">Enter</kbd> to post
                            </p>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setIsExpanded(false);
                                        setContent("");
                                    }}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleSubmit}
                                    disabled={!content.trim() || isSubmitting}
                                    icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                >
                                    {isSubmitting ? "Posting..." : "Post"}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </GlassCard>
    );
}
