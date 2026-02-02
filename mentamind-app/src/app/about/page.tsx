"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Shield,
    Heart,
    Lock,
    Users,
    MessageCircle,
    ArrowRight,
    Check,
    AlertTriangle
} from "lucide-react";

const values = [
    {
        icon: Lock,
        title: "Privacy First",
        description: "We never collect personal information. No emails, no phone numbers, no tracking.",
    },
    {
        icon: Heart,
        title: "Compassion Always",
        description: "Every feature is designed with empathy and understanding at its core.",
    },
    {
        icon: Shield,
        title: "Safety Matters",
        description: "Crisis resources are always visible. Your wellbeing is our priority.",
    },
    {
        icon: Users,
        title: "Community Support",
        description: "Connect with others who understand without fear of judgment.",
    },
];

const crisisResources = [
    { region: "United States", number: "988", name: "Suicide & Crisis Lifeline" },
    { region: "United Kingdom", number: "116 123", name: "Samaritans" },
    { region: "India", number: "9152987821", name: "iCall" },
    { region: "Australia", number: "13 11 14", name: "Lifeline" },
    { region: "Canada", number: "1-833-456-4566", name: "Crisis Services" },
    { region: "International", number: "Text HOME to 741741", name: "Crisis Text Line" },
];

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-20 lg:py-32">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
                            >
                                <Shield className="w-4 h-4" />
                                <span>Our Mission</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                            >
                                Making Mental Health Support{" "}
                                <span className="gradient-text">Accessible to All</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
                            >
                                MentaMind was created with a simple belief: everyone deserves a
                                safe space to express themselves without fear of judgment or
                                exposure. We&apos;re removing barriers to mental health support.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 bg-secondary/30">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Our <span className="gradient-text">Core Values</span>
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Every decision we make is guided by these principles.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <GlassCard className="h-full">
                                        <value.icon className="w-10 h-10 text-primary mb-4" />
                                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                        <p className="text-muted-foreground">{value.description}</p>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* What We Don't Do */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                    What We <span className="text-destructive">Don&apos;t</span> Do
                                </h2>
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    Transparency is key. Here&apos;s what you&apos;ll never find on MentaMind.
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "We don't provide clinical diagnosis",
                                    "We don't replace professional therapy",
                                    "We don't collect personal information",
                                    "We don't track your browsing behavior",
                                    "We don't sell or share any data",
                                    "We don't require account creation",
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/10"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                                            <span className="text-destructive text-sm font-bold">✕</span>
                                        </div>
                                        <span className="text-sm">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Crisis Resources */}
                <section className="py-20 bg-destructive/5">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <div className="flex items-center justify-center gap-2 text-destructive mb-4">
                                <AlertTriangle className="w-6 h-6" />
                                <h2 className="text-3xl sm:text-4xl font-bold">Crisis Resources</h2>
                            </div>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                If you&apos;re in immediate danger or experiencing a mental health crisis,
                                please reach out to one of these resources immediately.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                            {crisisResources.map((resource, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <GlassCard className="text-center" hover={false}>
                                        <p className="text-sm text-muted-foreground mb-1">{resource.region}</p>
                                        <p className="text-2xl font-bold text-destructive mb-1">{resource.number}</p>
                                        <p className="text-sm font-medium">{resource.name}</p>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-6" />
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Ready to Start?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Join our anonymous community or talk to our AI companion.
                                No sign-up required.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/community">
                                    <Button size="lg" icon={<Users className="w-5 h-5" />}>
                                        Join Community
                                    </Button>
                                </Link>
                                <Link href="/chat">
                                    <Button variant="secondary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                                        Talk to AI
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
