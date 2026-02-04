"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, RefreshCw, Sparkles } from "lucide-react";

/**
 * Gentle Loading States
 * 
 * PURPOSE: Non-alarming feedback for users who may already be anxious.
 * Uses soft pulsing animations instead of harsh spinners.
 */

interface LoadingProps {
    message?: string;
    size?: "sm" | "md" | "lg";
}

/**
 * GentleLoader - Soft pulsing animation, calming presence
 */
export function GentleLoader({
    message = "Loading your safe space...",
    size = "md"
}: LoadingProps) {
    const sizes = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8">
            <motion.div
                className={`${sizes[size]} rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center`}
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Sparkles className="w-1/2 h-1/2 text-primary" />
            </motion.div>
            <p className="text-sm text-muted-foreground animate-pulse">
                {message}
            </p>
        </div>
    );
}

interface ErrorProps {
    message?: string;
    onRetry?: () => void;
    showRetry?: boolean;
}

/**
 * SupportiveError - Warm, non-alarming error messaging
 * No harsh red colors, supportive tone
 */
export function SupportiveError({
    message = "Something didn't work quite right.",
    onRetry,
    showRetry = true
}: ErrorProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-4 py-8"
        >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Heart className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>

            <div className="text-center max-w-sm">
                <p className="text-muted-foreground mb-2">
                    {message}
                </p>
                <p className="text-sm text-muted-foreground/70">
                    Don&apos;t worry — this happens sometimes.
                </p>
            </div>

            {showRetry && onRetry && (
                <button
                    onClick={onRetry}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try again
                </button>
            )}
        </motion.div>
    );
}

interface EmptyStateProps {
    title?: string;
    message?: string;
    icon?: React.ReactNode;
}

/**
 * EncouragingEmpty - Supportive empty state
 * Encourages action without being pushy
 */
export function EncouragingEmpty({
    title = "Nothing here yet",
    message = "Be the first to share. This is a safe space for your thoughts.",
    icon,
}: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-4 py-12 text-center"
        >
            {icon ? (
                icon
            ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-primary/50" />
                </div>
            )}

            <div className="max-w-sm">
                <h3 className="font-medium mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">
                    {message}
                </p>
            </div>
        </motion.div>
    );
}

/**
 * TypingIndicator - Gentle bouncing dots for chat
 */
export function TypingIndicator() {
    return (
        <div className="flex gap-1 py-2">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="w-2 h-2 rounded-full bg-muted-foreground/50"
                    animate={{
                        y: [0, -4, 0],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                    }}
                />
            ))}
        </div>
    );
}

/**
 * PageLoader - Full page loading state
 */
export function PageLoader({ message = "Preparing your space..." }: LoadingProps) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <GentleLoader message={message} size="lg" />
        </div>
    );
}
