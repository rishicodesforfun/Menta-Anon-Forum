"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Heart, ExternalLink } from "lucide-react";

/**
 * Crisis Modal
 * 
 * PURPOSE: Non-blocking, supportive display of crisis resources.
 * Appears when crisis content is detected, but doesn't prevent user from continuing.
 * 
 * DESIGN: Warm, supportive, NOT scary or clinical.
 */

interface CrisisModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CRISIS_HELPLINES = [
    {
        name: "iCall",
        number: "9152987821",
        description: "TISS Mumbai - Mental health support",
        hours: "Mon-Sat, 8am-10pm",
    },
    {
        name: "Vandrevala Foundation",
        number: "1860-2662-345",
        description: "Free professional counseling",
        hours: "24/7",
        featured: true,
    },
    {
        name: "NIMHANS",
        number: "080-46110007",
        description: "National Institute of Mental Health",
        hours: "24/7",
    },
    {
        name: "Snehi",
        number: "044-24640050",
        description: "Emotional support helpline",
        hours: "24/7",
    },
];

export function CrisisModal({ isOpen, onClose }: CrisisModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop - semi-transparent, not fully blocking */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="fixed inset-x-4 top-[10%] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-lg max-h-[80vh] overflow-auto"
                    >
                        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header - Warm, not alarming */}
                            <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center">
                                            <Heart className="w-6 h-6 text-rose-500" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold">
                                                You&apos;re not alone
                                            </h2>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                There are people who want to help
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className="text-muted-foreground mb-6">
                                    If you&apos;re feeling overwhelmed, please consider reaching out
                                    to someone who can help. These services are free and confidential.
                                </p>

                                {/* Helplines */}
                                <div className="space-y-3">
                                    {CRISIS_HELPLINES.map((helpline) => (
                                        <a
                                            key={helpline.name}
                                            href={`tel:${helpline.number.replace(/-/g, '')}`}
                                            className={`block p-4 rounded-xl border transition-all hover:shadow-md ${helpline.featured
                                                    ? "border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20"
                                                    : "border-border hover:border-muted-foreground/50"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">
                                                            {helpline.name}
                                                        </span>
                                                        {helpline.featured && (
                                                            <span className="text-xs bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded-full">
                                                                Recommended
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-lg font-semibold text-rose-600 dark:text-rose-400 mt-1">
                                                        {helpline.number}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground mt-1">
                                                        {helpline.description} • {helpline.hours}
                                                    </div>
                                                </div>
                                                <Phone className="w-5 h-5 text-muted-foreground" />
                                            </div>
                                        </a>
                                    ))}
                                </div>

                                {/* Supportive message */}
                                <div className="mt-6 p-4 rounded-xl bg-secondary/50 text-center">
                                    <p className="text-sm text-muted-foreground">
                                        💙 Remember: Seeking help is a sign of strength, not weakness.
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-border bg-secondary/30">
                                <button
                                    onClick={onClose}
                                    className="w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                                >
                                    I understand, continue chatting
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
