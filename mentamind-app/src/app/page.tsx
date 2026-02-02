"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
    Shield,
    Users,
    MessageCircle,
    Heart,
    Lock,
    Sparkles,
    ArrowRight,
    Check
} from "lucide-react";

const features = [
    {
        icon: Lock,
        title: "100% Anonymous",
        description: "No sign-ups, no emails, no tracking. Your identity stays completely private.",
        color: "from-green-500 to-emerald-500",
    },
    {
        icon: Users,
        title: "Supportive Community",
        description: "Connect with others who understand. Share experiences, give and receive support.",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: MessageCircle,
        title: "AI Companion",
        description: "Talk to our compassionate AI anytime. It listens without judgment.",
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: Shield,
        title: "Safe Space",
        description: "Moderated for safety with crisis resources always available.",
        color: "from-orange-500 to-red-500",
    },
];

const stats = [
    { value: "100%", label: "Anonymous" },
    { value: "24/7", label: "Available" },
    { value: "Zero", label: "Data Stored" },
];

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
                            >
                                <Sparkles className="w-4 h-4" />
                                <span>Your safe space for mental wellness</span>
                            </motion.div>

                            {/* Main Heading */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-balance mb-6"
                            >
                                You&apos;re{" "}
                                <span className="gradient-text">Not Alone</span>
                                <br />
                                in This Journey
                            </motion.h1>

                            {/* Subheading */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
                            >
                                A completely anonymous platform where you can share your thoughts,
                                connect with understanding peers, and find support — no sign-up required.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            >
                                <Link href="/community">
                                    <Button size="lg" icon={<Users className="w-5 h-5" />}>
                                        Join Community
                                    </Button>
                                </Link>
                                <Link href="/chat">
                                    <Button variant="secondary" size="lg" icon={<MessageCircle className="w-5 h-5" />}>
                                        Talk to AI
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex items-center justify-center gap-8 sm:gap-12 mt-16"
                            >
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-2xl sm:text-3xl font-bold gradient-text">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 lg:py-32">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Built for Your <span className="gradient-text">Peace of Mind</span>
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Every feature is designed with your privacy and mental wellness as the top priority.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <GlassCard className="h-full">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                                            <feature.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-20 lg:py-32 bg-secondary/30">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                How <span className="gradient-text">It Works</span>
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Getting started is simple. No barriers, just support.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {[
                                {
                                    step: "01",
                                    title: "Just Visit",
                                    description: "Open MentaMind. That's it. No sign-up needed.",
                                },
                                {
                                    step: "02",
                                    title: "Stay Anonymous",
                                    description: "You're automatically assigned a friendly anonymous identity.",
                                },
                                {
                                    step: "03",
                                    title: "Find Support",
                                    description: "Share in the community or chat with our AI companion.",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-5xl font-bold gradient-text mb-4">{item.step}</div>
                                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Privacy Promise Section */}
                <section className="py-20 lg:py-32">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <GlassCard className="relative overflow-hidden">
                                {/* Decorative gradient */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                <div className="relative z-10 p-4 sm:p-8">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                                            <Lock className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Our Privacy Promise</h2>
                                            <p className="text-muted-foreground">Your privacy isn&apos;t a feature — it&apos;s our foundation.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            "No email or phone required",
                                            "No personal data collected",
                                            "No IP address logging",
                                            "No third-party tracking",
                                            "Encrypted connections only",
                                            "Session-based anonymity",
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                                    <Check className="w-3 h-3 text-green-500" />
                                                </div>
                                                <span className="text-sm sm:text-base">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 lg:py-32">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <Heart className="w-12 h-12 text-destructive mx-auto mb-6" />
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Ready to Start?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Take the first step towards feeling heard and supported.
                                Your anonymous journey begins now.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/community">
                                    <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                                        Enter Community
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
