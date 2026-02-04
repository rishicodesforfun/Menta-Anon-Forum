"use client";

import Link from "next/link";
import { Sidebar } from "@/components/layout/sidebar";
import { MainContent } from "@/components/layout/main-content";
import { Footer } from "@/components/layout/footer";
import { Users, MessageCircle, Check, Phone } from "lucide-react";

// India-focused crisis resources - functional, not decorative
const crisisHelplines = [
    { name: "iCall", number: "9152987821", note: "TISS Mumbai" },
    { name: "Vandrevala", number: "1860-2662-345", note: "24/7" },
    { name: "NIMHANS", number: "080-46110007", note: "Bangalore" },
];

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <Sidebar />

            <MainContent>
                {/* 
                    HERO SECTION
                    Design rationale: Single clear message. No decorative badges.
                    User in distress needs immediate clarity, not marketing.
                */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-6">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                                Anonymous mental health support.
                                <span className="block text-muted-foreground font-normal text-2xl sm:text-3xl lg:text-4xl mt-2">
                                    No sign-up. No tracking. Just help.
                                </span>
                            </h1>

                            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                                Share anonymously with a supportive community or talk to an AI companion.
                                Your identity is auto-generated — we never ask who you are.
                            </p>

                            {/* Primary actions - 2 choices max */}
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/community"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                                >
                                    <Users className="w-5 h-5" />
                                    Join Community
                                </Link>
                                <Link
                                    href="/chat"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Talk to AI
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 
                    TRUST SECTION
                    Design rationale: Functional checklist answering real user concerns.
                    Not a "features" marketing grid. Direct answers to "will this track me?"
                */}
                <section className="py-12 border-t border-border">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl">
                            <h2 className="text-xl font-semibold mb-6">How your privacy works</h2>

                            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
                                {[
                                    "No account or email required",
                                    "Random anonymous name assigned automatically",
                                    "No IP addresses logged",
                                    "Posts are not linked to your device",
                                    "No third-party analytics",
                                    "Crisis resources always visible",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-muted-foreground">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 
                    CRISIS RESOURCES SECTION
                    Design rationale: Elevated prominence. This is functional content
                    that could save lives - not decorative. India-focused per user requirement.
                */}
                <section className="py-12 border-t border-border bg-destructive/5">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-3 mb-4">
                                <Phone className="w-5 h-5 text-destructive" />
                                <h2 className="text-xl font-semibold">Need immediate help?</h2>
                            </div>

                            <p className="text-muted-foreground mb-6">
                                If you&apos;re in crisis, please reach out to a trained counselor:
                            </p>

                            <div className="grid sm:grid-cols-3 gap-4">
                                {crisisHelplines.map((helpline) => (
                                    <a
                                        key={helpline.name}
                                        href={`tel:${helpline.number.replace(/-/g, '')}`}
                                        className="block p-4 rounded-xl bg-white dark:bg-slate-900 border border-border hover:border-destructive/50 transition-colors"
                                    >
                                        <div className="font-medium">{helpline.name}</div>
                                        <div className="text-lg font-semibold text-destructive">{helpline.number}</div>
                                        <div className="text-sm text-muted-foreground">{helpline.note}</div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </MainContent>
        </div >
    );
}
