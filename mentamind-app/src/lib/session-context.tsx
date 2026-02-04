"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface Identity {
    name: string;
    number: string;
}

interface SessionContextType {
    userId: string | null;
    identity: Identity | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    logout: () => void;
    refreshSession: () => void;
    generatePostAnonName: () => string;
    regenerateDisplayName: () => string;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const ADJECTIVES = [
    "Soothing", "Gentle", "Calm", "Serene", "Tranquil",
    "Brave", "Kind", "Wise", "Bright", "Warm",
    "Hopeful", "Radiant", "Mindful", "Graceful", "Tender",
    "Peaceful", "Caring", "Strong", "Resilient", "Quiet"
];

const ANIMALS = [
    "Bear", "Tiger", "Owl", "Fox", "Deer",
    "Swan", "Dove", "Phoenix", "Dolphin", "Panda",
    "Otter", "Rabbit", "Eagle", "Wolf", "Lion",
    "Butterfly", "Hummingbird", "Koala", "Hawk", "Sparrow"
];

// Protected routes that require login
const PROTECTED_ROUTES = ["/chat", "/community"];

export function SessionProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [userId, setUserId] = useState<string | null>(null);
    const [identity, setIdentity] = useState<Identity | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const refreshSession = useCallback(() => {
        const storedUserId = localStorage.getItem("mentamind_user_id");
        const storedIdentity = localStorage.getItem("mentamind_identity");
        const loggedIn = localStorage.getItem("mentamind_logged_in") === "true";

        if (storedUserId && storedIdentity && loggedIn) {
            setUserId(storedUserId);
            try {
                setIdentity(JSON.parse(storedIdentity));
            } catch {
                setIdentity(null);
            }
            setIsLoggedIn(true);
        } else {
            setUserId(null);
            setIdentity(null);
            setIsLoggedIn(false);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        // Initial session check
        refreshSession();
    }, [refreshSession]);

    useEffect(() => {
        // Redirect to login if accessing protected route without session
        // Skip redirect if we're still loading or if we're on the login page
        if (isLoading || pathname === "/login") {
            return;
        }

        if (!isLoggedIn) {
            const isProtected = PROTECTED_ROUTES.some(route =>
                pathname?.startsWith(route)
            );
            if (isProtected) {
                router.push("/login");
            }
        }
    }, [isLoading, isLoggedIn, pathname, router]);

    const logout = () => {
        localStorage.removeItem("mentamind_user_id");
        localStorage.removeItem("mentamind_identity");
        localStorage.removeItem("mentamind_logged_in");
        setUserId(null);
        setIdentity(null);
        setIsLoggedIn(false);
        router.push("/");
    };

    const generatePostAnonName = (): string => {
        const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
        const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
        return `${adj} ${animal}`;
    };

    /**
     * Regenerates the user's display name for enhanced privacy
     * Allows users to get a fresh anonymous identity if they feel exposed
     */
    const regenerateDisplayName = (): string => {
        const newName = generatePostAnonName();
        const number = Math.floor(Math.random() * 10000);
        const fullName = `${newName} #${number}`;

        if (identity) {
            const newIdentity = { ...identity, name: fullName };
            localStorage.setItem("mentamind_identity", JSON.stringify(newIdentity));
            setIdentity(newIdentity);
        }

        return fullName;
    };

    return (
        <SessionContext.Provider
            value={{
                userId,
                identity,
                isLoggedIn,
                isLoading,
                logout,
                refreshSession,
                generatePostAnonName,
                regenerateDisplayName,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
}
