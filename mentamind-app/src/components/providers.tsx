"use client";

import { SessionProvider } from "@/lib/session-context";
import { SidebarProvider } from "@/lib/sidebar-context";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <SidebarProvider>
                {children}
            </SidebarProvider>
        </SessionProvider>
    );
}
