"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/session-context";
import { Home, MessageCircle, Users, Info, Shield, LogOut, Sparkles } from "lucide-react";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/community", label: "Community", icon: Users, protected: true },
    { href: "/chat", label: "AI Support", icon: MessageCircle, protected: true },
    { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
    const pathname = usePathname();
    const { isLoggedIn, identity, logout, isLoading } = useSession();

    // Don't show navbar on login page
    if (pathname === "/login") {
        return null;
    }

    return (
        <motion.header
            className="sticky top-0 z-50 w-full"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="glass-card mx-4 mt-4 !rounded-2xl">
                <nav className="flex items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 transition-shadow">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text hidden sm:block">
                            MentaMind
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            // Show protected routes only if logged in
                            if (item.protected && !isLoggedIn && !isLoading) {
                                return null;
                            }

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                    )}
                                >
                                    <span className="flex items-center gap-2">
                                        <Icon className="w-4 h-4" />
                                        <span className="hidden md:inline">{item.label}</span>
                                    </span>

                                    {isActive && (
                                        <motion.div
                                            className="absolute inset-0 rounded-xl bg-primary/10"
                                            layoutId="activeNav"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* User Identity / Login Button */}
                    {isLoading ? (
                        <div className="w-32 h-10 rounded-xl bg-secondary/50 animate-pulse" />
                    ) : isLoggedIn && identity ? (
                        <div className="flex items-center gap-3">
                            {/* Identity Badge */}
                            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 text-sm font-medium">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span>{identity.name}</span>
                                <span className="text-muted-foreground">{identity.number}</span>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={logout}
                                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                                title="Log out"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            Enter Space
                        </Link>
                    )}
                </nav>
            </div>
        </motion.header>
    );
}
