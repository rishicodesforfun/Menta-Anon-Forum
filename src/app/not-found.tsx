"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full text-center"
            >
                <div className="glass-card p-8">
                    {/* 404 Display */}
                    <div className="mb-6">
                        <span className="text-8xl font-bold gradient-text">404</span>
                    </div>

                    <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
                    <p className="text-muted-foreground mb-8">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        Let&apos;s get you back on track.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link href="/">
                            <Button icon={<Home className="w-4 h-4" />}>
                                Go Home
                            </Button>
                        </Link>
                        <Link href="/community">
                            <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />}>
                                Community
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Helpful Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8"
                >
                    <p className="text-sm text-muted-foreground mb-4">Quick Links</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/community" className="text-sm text-primary hover:underline">
                            Community Forum
                        </Link>
                        <Link href="/chat" className="text-sm text-primary hover:underline">
                            AI Support
                        </Link>
                        <Link href="/about" className="text-sm text-primary hover:underline">
                            About Us
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
