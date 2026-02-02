"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Heart, Github, Twitter } from "lucide-react";

export function Footer() {
    return (
        <motion.footer
            className="mt-auto border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold gradient-text">MentaMind</span>
                        </Link>
                        <p className="text-muted-foreground max-w-sm">
                            A safe, anonymous space for mental health support. You&apos;re not alone in this journey.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Navigate</h4>
                        <ul className="space-y-2">
                            {[
                                { href: "/community", label: "Community" },
                                { href: "/chat", label: "AI Support" },
                                { href: "/about", label: "About Us" },
                                { href: "/resources", label: "Resources" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-foreground transition-colors link-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Crisis Resources */}
                    <div>
                        <h4 className="font-semibold mb-4 text-destructive">Crisis Help</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="text-muted-foreground">
                                <span className="font-medium text-foreground">US:</span> 988 Suicide & Crisis Lifeline
                            </li>
                            <li className="text-muted-foreground">
                                <span className="font-medium text-foreground">UK:</span> 116 123 Samaritans
                            </li>
                            <li className="text-muted-foreground">
                                <span className="font-medium text-foreground">India:</span> iCall 9152987821
                            </li>
                            <li className="text-muted-foreground">
                                <span className="font-medium text-foreground">Text:</span> HOME to 741741
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-border/50">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for mental wellness
                    </p>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} MentaMind. All rights reserved.
                    </p>
                </div>
            </div>
        </motion.footer>
    );
}
