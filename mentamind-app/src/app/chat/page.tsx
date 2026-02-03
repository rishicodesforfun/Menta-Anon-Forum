"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { generateAnonName, getAnonymousId } from "@/lib/anonymous";
import {
    Send,
    Loader2,
    Bot,
    User,
    AlertTriangle,
    RefreshCw,
    Sparkles,
    Heart
} from "lucide-react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const welcomeMessages = [
    "Hello! I'm here to listen and support you. How are you feeling today?",
    "Hi there. This is a safe space to share whatever is on your mind. What would you like to talk about?",
    "Welcome. I'm here for you, without judgment. What's been on your heart lately?",
];

const CRISIS_KEYWORDS = [
    "suicide", "kill myself", "end my life", "want to die",
    "self-harm", "hurt myself", "cutting", "overdose"
];

const CRISIS_RESPONSE = `I hear you, and I'm really concerned about what you're sharing. Your life matters deeply, and there are people who want to help right now.

**Please reach out immediately:**
• **US:** Call or text 988 (Suicide & Crisis Lifeline)
• **UK:** Call 116 123 (Samaritans)
• **India:** Call iCall 9152987821
• **Text:** HOME to 741741 (Crisis Text Line)

You don't have to face this alone. Would you like to talk more about what you're going through?`;

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [anonName, setAnonName] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const id = getAnonymousId();
        setAnonName(generateAnonName(id));

        // Welcome message
        const welcomeMsg = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        setMessages([
            {
                id: "welcome",
                role: "assistant",
                content: welcomeMsg,
                timestamp: new Date(),
            },
        ]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const checkForCrisis = (text: string): boolean => {
        const lowerText = text.toLowerCase();
        return CRISIS_KEYWORDS.some((keyword) => lowerText.includes(keyword));
    };

    const simulateAIResponse = async (userMessage: string): Promise<string> => {
        // Check for crisis keywords first
        if (checkForCrisis(userMessage)) {
            return CRISIS_RESPONSE;
        }

        // Simulated responses - in production, this would call OpenAI API
        const responses = [
            "Thank you for sharing that with me. It takes courage to open up. Can you tell me more about how that makes you feel?",
            "I hear you. Those feelings are valid and you're not alone in experiencing them. What do you think triggered these feelings?",
            "That sounds really challenging. Remember, it's okay to not be okay sometimes. Have you been able to talk to anyone else about this?",
            "I appreciate you trusting me with this. Let's explore this together. What would feel like a small step forward for you?",
            "Your feelings matter, and I'm here to listen without judgment. What would help you feel a little better right now?",
        ];

        // Simulate typing delay
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));
        return responses[Math.floor(Math.random() * responses.length)];
    };

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date(),
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        setIsTyping(true);

        try {
            // Call real API with anonymous ID and conversation history
            const anonId = getAnonymousId();
            const history = updatedMessages
                .filter(m => m.id !== "welcome" && !m.id.startsWith("welcome-"))
                .map(m => ({ role: m.role, content: m.content }));

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-anonymous-id": anonId,
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    history,
                }),
            });

            const data = await res.json();

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.message || "I'm here for you. Could you tell me more?",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Failed to get response:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I'm having a moment of difficulty, but I'm still here for you. Could you try again?",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleReset = () => {
        const welcomeMsg = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        setMessages([
            {
                id: "welcome-" + Date.now(),
                role: "assistant",
                content: welcomeMsg,
                timestamp: new Date(),
            },
        ]);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 py-8">
                <div className="container mx-auto px-4 sm:px-6 h-full">
                    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-200px)]">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                                        AI <span className="gradient-text">Companion</span>
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        A supportive listener, available 24/7
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleReset}
                                    icon={<RefreshCw className="w-4 h-4" />}
                                >
                                    New Chat
                                </Button>
                            </div>
                        </motion.div>

                        {/* Disclaimer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-4"
                        >
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-muted-foreground">
                                    I&apos;m an AI companion, not a therapist. For professional help, please consult a mental health professional. In crisis? Call 988.
                                </p>
                            </div>
                        </motion.div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto scrollbar-custom mb-4 space-y-4 pr-2">
                            <AnimatePresence mode="popLayout">
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""
                                            }`}
                                    >
                                        {/* Avatar */}
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === "assistant"
                                                ? "bg-gradient-to-br from-primary to-accent"
                                                : "bg-secondary"
                                                }`}
                                        >
                                            {message.role === "assistant" ? (
                                                <Sparkles className="w-4 h-4 text-white" />
                                            ) : (
                                                <User className="w-4 h-4 text-muted-foreground" />
                                            )}
                                        </div>

                                        {/* Message Bubble */}
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "assistant"
                                                ? "glass-card !bg-card/80"
                                                : "bg-primary text-primary-foreground"
                                                }`}
                                        >
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                {message.content}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="glass-card !bg-card/80 rounded-2xl px-4 py-3">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <GlassCard className="!p-3" hover={false}>
                                <div className="flex items-end gap-3">
                                    <textarea
                                        ref={inputRef}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type your message..."
                                        className="flex-1 bg-transparent border-none resize-none focus:outline-none text-sm min-h-[40px] max-h-[120px] py-2"
                                        rows={1}
                                        disabled={isTyping}
                                    />
                                    <Button
                                        size="sm"
                                        onClick={handleSend}
                                        disabled={!input.trim() || isTyping}
                                        icon={
                                            isTyping ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Send className="w-4 h-4" />
                                            )
                                        }
                                    >
                                        Send
                                    </Button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
