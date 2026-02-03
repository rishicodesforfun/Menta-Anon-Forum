"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/session-context";
import { useSidebar } from "@/lib/sidebar-context";
import { Home, MessageCircle, Users, Info, Shield, LogOut, Sparkles, Menu, ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/community", label: "Community", icon: Users, protected: true },
    { href: "/chat", label: "AI Support", icon: MessageCircle, protected: true },
    { href: "/about", label: "About", icon: Info },
];

export function Sidebar() {
    const pathname = usePathname();
    const { isLoggedIn, identity, logout, isLoading } = useSession();
    const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar();

    // Don't show sidebar on login page
    if (pathname === "/login") {
        return null;
    }

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl glass-card"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <motion.aside
                className={cn(
                    "fixed left-0 top-0 h-full z-50 glass-card !rounded-none lg:!rounded-r-2xl border-r border-border/50",
                    "flex flex-col transition-all duration-300",
                    // Width based on collapsed state
                    isCollapsed ? "lg:w-20" : "lg:w-64",
                    "w-64", // Always full width on mobile
                    // Mobile: slide in/out
                    "lg:translate-x-0",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Logo Section with Collapse Toggle */}
                <div className="p-4 border-b border-border/30">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className={cn(
                                "flex items-center gap-3 group",
                                isCollapsed && "lg:justify-center"
                            )}
                            onClick={() => setIsMobileOpen(false)}
                        >
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 transition-shadow flex-shrink-0">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            {!isCollapsed && (
                                <span className="text-xl font-bold gradient-text hidden lg:block">
                                    MentaMind
                                </span>
                            )}
                            {/* Always show on mobile */}
                            <span className="text-xl font-bold gradient-text lg:hidden">
                                MentaMind
                            </span>
                        </Link>

                        {/* Collapse Toggle - Desktop only */}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
                            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            {isCollapsed ? (
                                <ChevronRight className="w-4 h-4" />
                            ) : (
                                <ChevronLeft className="w-4 h-4" />
                            )}
                        </button>

                        {/* Mobile Close Button */}
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-2 space-y-1">
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
                                onClick={() => setIsMobileOpen(false)}
                                className={cn(
                                    "relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "text-primary bg-primary/10"
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                                    isCollapsed && "lg:justify-center lg:px-2"
                                )}
                                title={isCollapsed ? item.label : undefined}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                {!isCollapsed && <span className="hidden lg:inline">{item.label}</span>}
                                {/* Always show on mobile */}
                                <span className="lg:hidden">{item.label}</span>

                                {isActive && (
                                    <motion.div
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-primary to-accent"
                                        layoutId="activeSidebar"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="p-2 border-t border-border/30">
                    {isLoading ? (
                        <div className={cn(
                            "rounded-xl bg-secondary/50 animate-pulse",
                            isCollapsed ? "lg:w-12 lg:h-12 lg:mx-auto w-full h-16" : "w-full h-16"
                        )} />
                    ) : isLoggedIn && identity ? (
                        <div className={cn("space-y-2", isCollapsed && "lg:space-y-2")}>
                            {/* Identity Badge */}
                            <div className={cn(
                                "flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10",
                                isCollapsed && "lg:justify-center lg:p-2"
                            )}>
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                {!isCollapsed && (
                                    <div className="flex-1 min-w-0 hidden lg:block">
                                        <p className="text-sm font-medium truncate">{identity.name}</p>
                                        <p className="text-xs text-muted-foreground">{identity.number}</p>
                                    </div>
                                )}
                                {/* Always show on mobile */}
                                <div className="flex-1 min-w-0 lg:hidden">
                                    <p className="text-sm font-medium truncate">{identity.name}</p>
                                    <p className="text-xs text-muted-foreground">{identity.number}</p>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={() => {
                                    logout();
                                    setIsMobileOpen(false);
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors",
                                    isCollapsed && "lg:justify-center lg:px-2"
                                )}
                                title={isCollapsed ? "Log out" : undefined}
                            >
                                <LogOut className="w-5 h-5 flex-shrink-0" />
                                {!isCollapsed && <span className="hidden lg:inline">Log out</span>}
                                <span className="lg:hidden">Log out</span>
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setIsMobileOpen(false)}
                            className={cn(
                                "block w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium text-center hover:opacity-90 transition-opacity",
                                isCollapsed && "lg:px-2"
                            )}
                            title={isCollapsed ? "Enter Space" : undefined}
                        >
                            {isCollapsed ? (
                                <>
                                    <span className="hidden lg:inline">→</span>
                                    <span className="lg:hidden">Enter Space</span>
                                </>
                            ) : (
                                "Enter Space"
                            )}
                        </Link>
                    )}
                </div>
            </motion.aside>
        </>
    );
}

// Hook to get the current sidebar margin for main content
export function useSidebarMargin() {
    const { isCollapsed } = useSidebar();
    return isCollapsed ? "lg:ml-20" : "lg:ml-64";
}
