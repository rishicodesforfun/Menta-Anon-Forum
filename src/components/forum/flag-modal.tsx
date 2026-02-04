"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Heart, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlagModalProps {
    isOpen: boolean;
    postId: string;
    onClose: () => void;
    onSubmit: (postId: string, reason: string, details?: string) => void;
}

const FLAG_REASONS = [
    {
        id: "spam",
        label: "Spam or advertising",
        description: "Promotional content or repetitive posts",
        icon: "🚫",
    },
    {
        id: "harmful",
        label: "Harmful content",
        description: "Content that could cause harm to others",
        icon: "⚠️",
    },
    {
        id: "crisis",
        label: "Crisis concern",
        description: "This person may need immediate help",
        icon: "🆘",
        priority: true, // Auto-escalates
    },
    {
        id: "inappropriate",
        label: "Inappropriate language",
        description: "Offensive or abusive language",
        icon: "🔇",
    },
    {
        id: "other",
        label: "Other",
        description: "Something else that concerns you",
        icon: "💭",
    },
];

export function FlagModal({ isOpen, postId, onClose, onSubmit }: FlagModalProps) {
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [details, setDetails] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (!selectedReason) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        onSubmit(postId, selectedReason, details || undefined);
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Auto-close after showing confirmation
        setTimeout(() => {
            handleClose();
        }, 2000);
    };

    const handleClose = () => {
        setSelectedReason(null);
        setDetails("");
        setIsSubmitting(false);
        setIsSubmitted(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-x-4 top-[20%] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-md"
                    >
                        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold">Report this post</h2>
                                        <p className="text-xs text-muted-foreground">
                                            Help us keep this space safe
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                {isSubmitted ? (
                                    // Success state
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-8"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                                            <Heart className="w-8 h-8 text-green-600 dark:text-green-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            Thank you for helping
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            Your report helps keep this community safe and supportive for everyone.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <>
                                        {/* Reason selection */}
                                        <div className="space-y-2 mb-4">
                                            {FLAG_REASONS.map((reason) => (
                                                <button
                                                    key={reason.id}
                                                    onClick={() => setSelectedReason(reason.id)}
                                                    className={cn(
                                                        "w-full text-left p-3 rounded-xl border transition-all",
                                                        selectedReason === reason.id
                                                            ? "border-primary bg-primary/5"
                                                            : "border-border hover:border-muted-foreground/50 hover:bg-secondary/50",
                                                        reason.priority && "ring-1 ring-amber-500/50"
                                                    )}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-lg">{reason.icon}</span>
                                                        <div>
                                                            <div className="font-medium text-sm flex items-center gap-2">
                                                                {reason.label}
                                                                {reason.priority && (
                                                                    <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
                                                                        Priority
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground mt-0.5">
                                                                {reason.description}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Optional details */}
                                        {selectedReason && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                            >
                                                <textarea
                                                    value={details}
                                                    onChange={(e) => setDetails(e.target.value)}
                                                    placeholder="Any additional details? (optional)"
                                                    className="w-full p-3 rounded-xl border border-border bg-secondary/30 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                                                    rows={2}
                                                />
                                            </motion.div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Footer */}
                            {!isSubmitted && (
                                <div className="p-4 border-t border-border bg-secondary/30">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleClose}
                                            className="flex-1 px-4 py-2.5 rounded-xl border border-border hover:bg-secondary transition-colors font-medium text-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!selectedReason || isSubmitting}
                                            className={cn(
                                                "flex-1 px-4 py-2.5 rounded-xl font-medium text-sm transition-all",
                                                selectedReason
                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                    : "bg-muted text-muted-foreground cursor-not-allowed"
                                            )}
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit Report"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
