"use client";

import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "mentamind_anon_id";

/**
 * Get or create an anonymous user ID
 * This persists across browser sessions using localStorage
 */
export function getAnonymousId(): string {
    if (typeof window === "undefined") {
        return "";
    }

    let anonId = localStorage.getItem(STORAGE_KEY);

    if (!anonId) {
        anonId = uuidv4();
        localStorage.setItem(STORAGE_KEY, anonId);
    }

    return anonId;
}

/**
 * Generate a friendly anonymous name from UUID
 * Creates names like "Brave Fox" or "Gentle Owl"
 */
export function generateAnonName(uuid: string): string {
    const adjectives = [
        "Brave", "Gentle", "Kind", "Peaceful", "Calm",
        "Hopeful", "Serene", "Wise", "Bright", "Warm",
        "Caring", "Tender", "Quiet", "Strong", "Resilient",
        "Mindful", "Patient", "Grateful", "Joyful", "Radiant"
    ];

    const animals = [
        "Fox", "Owl", "Bear", "Deer", "Wolf",
        "Hawk", "Swan", "Dove", "Otter", "Rabbit",
        "Butterfly", "Phoenix", "Dolphin", "Panda", "Koala",
        "Eagle", "Hummingbird", "Lion", "Tiger", "Sparrow"
    ];

    // Use UUID to deterministically pick names
    const hash = uuid.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const adjIndex = hash % adjectives.length;
    const animalIndex = Math.floor(hash / adjectives.length) % animals.length;

    return `${adjectives[adjIndex]} ${animals[animalIndex]}`;
}

/**
 * Check if this is the user's first visit
 */
export function isFirstVisit(): boolean {
    if (typeof window === "undefined") {
        return true;
    }
    return !localStorage.getItem(STORAGE_KEY);
}

/**
 * Clear the anonymous session (for testing)
 */
export function clearSession(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
    }
}
