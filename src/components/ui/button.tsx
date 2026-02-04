"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export function Button({
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    children,
    className,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] focus:ring-primary",
        secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 active:scale-[0.98] focus:ring-secondary",
        ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground focus:ring-secondary",
        danger: "bg-destructive text-destructive-foreground shadow-lg shadow-destructive/25 hover:shadow-xl hover:shadow-destructive/30 hover:scale-[1.02] active:scale-[0.98] focus:ring-destructive",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm gap-1.5",
        md: "px-6 py-3 text-base gap-2",
        lg: "px-8 py-4 text-lg gap-2.5",
    };

    return (
        <motion.button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || loading}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            {...props}
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : icon ? (
                <span className="flex-shrink-0">{icon}</span>
            ) : null}
            <span>{children}</span>
        </motion.button>
    );
}
