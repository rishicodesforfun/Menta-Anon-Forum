"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export function GlassCard({
    children,
    className,
    hover = true,
    ...props
}: GlassCardProps) {
    return (
        <motion.div
            className={cn(
                "glass-card p-6",
                hover && "transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1",
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
