"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="relative w-full">
                {label && (
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {label}
                    </label>
                )}
                <textarea
                    className={cn(
                        "textarea-premium",
                        error && "border-destructive focus:border-destructive focus:ring-destructive/20",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-sm text-destructive">{error}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

export { Textarea };
