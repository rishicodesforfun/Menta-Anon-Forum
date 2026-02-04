"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to console (in production, send to error tracking service)
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full text-center"
            >
                <div className="glass-card p-8">
                    <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="w-8 h-8 text-destructive" />
                    </div>

                    <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
                    <p className="text-muted-foreground mb-6">
                        We encountered an unexpected error. Don&apos;t worry, your data is safe and this has been logged.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button onClick={reset} icon={<RefreshCw className="w-4 h-4" />}>
                            Try Again
                        </Button>
                        <Link href="/">
                            <Button variant="secondary" icon={<Home className="w-4 h-4" />}>
                                Go Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
