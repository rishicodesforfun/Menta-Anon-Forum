"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/session-context";
import {
    Shield,
    RefreshCw,
    Copy,
    Check,
    ArrowRight,
    Key,
    Sparkles,
    AlertCircle
} from "lucide-react";

// Word list for recovery phrase generation
const WORD_LIST = [
    "ocean", "galaxy", "mountain", "river", "silence", "forest",
    "echo", "breeze", "solar", "lunar", "crystal", "orbit",
    "meadow", "aurora", "whisper", "harmony", "serenity", "cascade",
    "twilight", "ember", "mist", "zen", "bloom", "drift",
    "haven", "frost", "glow", "haze", "calm", "wave",
    "cloud", "star", "moon", "sun", "rain", "wind",
    "leaf", "stone", "light", "shadow", "dream", "hope"
];

const ADJECTIVES = [
    "Peaceful", "Gentle", "Calm", "Serene", "Tranquil",
    "Brave", "Kind", "Wise", "Bright", "Warm",
    "Hopeful", "Radiant", "Mindful", "Graceful", "Tender"
];

const ANIMALS = [
    "Butterfly", "Owl", "Fox", "Deer", "Swan",
    "Dove", "Phoenix", "Dolphin", "Hummingbird", "Panda",
    "Otter", "Rabbit", "Eagle", "Wolf", "Bear"
];

function generateRecoveryPhrase(): string[] {
    const phrase: string[] = [];
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
        phrase.push(WORD_LIST[randomIndex]);
    }
    return phrase;
}

function generateIdentity(): { name: string; number: string } {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    const number = Math.floor(1000 + Math.random() * 9000).toString();
    return { name: `${adj} ${animal}`, number: `#${number}` };
}

function phraseToUserId(phrase: string[]): string {
    // Simple hash of phrase to create consistent userId
    const joined = phrase.join("-");
    let hash = 0;
    for (let i = 0; i < joined.length; i++) {
        const char = joined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return `user-${Math.abs(hash).toString(16)}`;
}

export default function LoginPage() {
    const router = useRouter();
    const { refreshSession } = useSession();
    const [identity, setIdentity] = useState({ name: "", number: "" });
    const [recoveryPhrase, setRecoveryPhrase] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);
    const [showRecovery, setShowRecovery] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        regenerateIdentity();
    }, []);

    const regenerateIdentity = () => {
        setIdentity(generateIdentity());
        setRecoveryPhrase(generateRecoveryPhrase());
        setCopied(false);
    };

    const copyToClipboard = async () => {
        const text = recoveryPhrase.join(" ");
        try {
            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers or non-HTTPS
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleContinue = () => {
        setIsLoading(true);

        // Store session data
        const userId = phraseToUserId(recoveryPhrase);
        localStorage.setItem("mentamind_user_id", userId);
        localStorage.setItem("mentamind_identity", JSON.stringify(identity));
        localStorage.setItem("mentamind_logged_in", "true");

        // Refresh the session context so it picks up the new values
        refreshSession();

        // Navigate to community
        setTimeout(() => {
            router.push("/community");
        }, 300);
    };

    const handleRecoverAccount = () => {
        setShowRecovery(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                <GlassCard className="!p-8 text-center" hover={false}>
                    {/* Encrypted Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6"
                    >
                        <Shield className="w-4 h-4" />
                        Encrypted & Private
                    </motion.div>

                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1 className="text-2xl font-bold mb-2">
                            Welcome to your safe space
                        </h1>
                        <p className="text-muted-foreground text-sm mb-8">
                            We've created a secure, anonymous identity for you.
                        </p>
                    </motion.div>

                    {/* Avatar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="flex justify-center mb-4"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-emerald-500/20 flex items-center justify-center border border-primary/20">
                            <Sparkles className="w-10 h-10 text-primary" />
                        </div>
                    </motion.div>

                    {/* Identity Name */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mb-4"
                    >
                        <h2 className="text-xl font-semibold">
                            {identity.name} <span className="text-muted-foreground">{identity.number}</span>
                        </h2>
                    </motion.div>

                    {/* Regenerate Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-6"
                    >
                        <button
                            onClick={regenerateIdentity}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-secondary/50 transition-colors text-sm text-muted-foreground"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Regenerate
                        </button>
                    </motion.div>

                    {/* Recovery Key Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-secondary/30 rounded-xl p-4 mb-6 text-left"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Recovery Key
                            </span>
                            <button
                                onClick={copyToClipboard}
                                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="bg-background/50 rounded-lg p-3 font-mono text-sm leading-relaxed">
                            {recoveryPhrase.slice(0, 6).join(" ")}
                            <br />
                            {recoveryPhrase.slice(6, 12).join(" ")}
                        </div>

                        <div className="flex items-start gap-2 mt-3 text-xs text-amber-600 dark:text-amber-400">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>
                                Save this phrase. It is the only way to recover your account and history.
                            </span>
                        </div>
                    </motion.div>

                    {/* Continue Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Button
                            onClick={handleContinue}
                            className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary via-accent to-emerald-500 hover:opacity-90 transition-opacity"
                            loading={isLoading}
                            icon={<ArrowRight className="w-5 h-5" />}
                        >
                            Continue to the Space
                        </Button>
                    </motion.div>

                    {/* Privacy Note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4"
                    >
                        <Shield className="w-3 h-3" />
                        No personal data is linked to this session.
                    </motion.p>

                    {/* Returning User Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-6 pt-4 border-t border-border"
                    >
                        <button
                            onClick={handleRecoverAccount}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Returning user?{" "}
                            <span className="text-primary hover:underline">
                                I have a key
                            </span>
                        </button>
                    </motion.div>
                </GlassCard>
            </motion.div>

            {/* Recovery Modal */}
            {showRecovery && (
                <RecoveryModal onClose={() => setShowRecovery(false)} />
            )}
        </div>
    );
}

function RecoveryModal({ onClose }: { onClose: () => void }) {
    const router = useRouter();
    const { refreshSession } = useSession();
    const [phrase, setPhrase] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRecover = () => {
        const words = phrase.trim().split(/\s+/);
        if (words.length !== 12) {
            setError("Please enter all 12 words of your recovery phrase.");
            return;
        }

        setIsLoading(true);

        // Recover identity from phrase
        const userId = phraseToUserId(words);
        const identity = generateIdentity(); // Generate new display identity

        localStorage.setItem("mentamind_user_id", userId);
        localStorage.setItem("mentamind_identity", JSON.stringify(identity));
        localStorage.setItem("mentamind_logged_in", "true");

        // Refresh session context
        refreshSession();

        setTimeout(() => {
            router.push("/community");
        }, 300);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md"
            >
                <GlassCard className="!p-6" hover={false}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Key className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Recover Your Account</h3>
                            <p className="text-sm text-muted-foreground">
                                Enter your 12-word recovery phrase
                            </p>
                        </div>
                    </div>

                    <textarea
                        value={phrase}
                        onChange={(e) => {
                            setPhrase(e.target.value);
                            setError("");
                        }}
                        placeholder="ocean galaxy mountain river silence forest..."
                        className="w-full h-24 p-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none resize-none font-mono text-sm"
                    />

                    {error && (
                        <p className="text-sm text-red-500 mt-2">{error}</p>
                    )}

                    <div className="flex gap-3 mt-4">
                        <Button variant="ghost" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button onClick={handleRecover} loading={isLoading} className="flex-1">
                            Recover
                        </Button>
                    </div>
                </GlassCard>
            </motion.div>
        </motion.div>
    );
}
