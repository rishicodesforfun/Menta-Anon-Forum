"use client";

import { useSidebar } from "@/lib/sidebar-context";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MainContentProps {
    children: ReactNode;
    className?: string;
}

export function MainContent({ children, className }: MainContentProps) {
    const { isCollapsed } = useSidebar();

    return (
        <main
            className={cn(
                "min-h-screen transition-all duration-300",
                isCollapsed ? "lg:ml-20" : "lg:ml-64",
                className
            )}
        >
            {children}
        </main>
    );
}
