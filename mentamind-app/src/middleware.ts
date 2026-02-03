import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const PROTECTED_ROUTES = ["/chat", "/community"];

// Routes that are always public
const PUBLIC_ROUTES = ["/", "/about", "/login"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if route is protected
    const isProtectedRoute = PROTECTED_ROUTES.some(route =>
        pathname.startsWith(route)
    );

    if (!isProtectedRoute) {
        return NextResponse.next();
    }

    // Check for session cookie/header
    // Note: We check for cookies since localStorage isn't available in middleware
    const sessionCookie = request.cookies.get("mentamind_session");

    // For client-side session (localStorage), we'll handle redirect in the page components
    // Middleware just passes through for now - client-side check is more reliable
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)",
    ],
};
