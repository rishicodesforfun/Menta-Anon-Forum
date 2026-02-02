import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "MentaMind - Anonymous Mental Health Support",
    description:
        "A safe, anonymous space for mental health support. Share your thoughts, connect with others, and find peace of mind.",
    keywords: [
        "mental health",
        "anonymous",
        "support",
        "community",
        "wellness",
        "safe space",
    ],
    authors: [{ name: "MentaMind" }],
    openGraph: {
        title: "MentaMind - Anonymous Mental Health Support",
        description:
            "A safe, anonymous space for mental health support. Share your thoughts, connect with others, and find peace of mind.",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "MentaMind - Anonymous Mental Health Support",
        description:
            "A safe, anonymous space for mental health support. Share your thoughts, connect with others, and find peace of mind.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
        { media: "(prefers-color-scheme: dark)", color: "#020617" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans`}>
                <div className="relative min-h-screen overflow-hidden">
                    {/* Ambient background gradients */}
                    <div className="fixed inset-0 -z-10">
                        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
                        <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />
                        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "4s" }} />
                    </div>

                    {/* Main content */}
                    {children}
                </div>
            </body>
        </html>
    );
}
