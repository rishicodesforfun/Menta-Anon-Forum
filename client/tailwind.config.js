/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Landing Page Theme
                "landing-primary": "#1152d4",
                "landing-bg": "#101622",
                "landing-light": "#f6f6f8",
                "teal-accent": "#14b8a6",
                "midnight": "#020617",

                // Settings Page Theme
                "settings-primary": "#39c91d",
                "settings-bg": "#0f172a",
                "settings-light": "#f6f8f6",
                "glass-surface": "rgba(255, 255, 255, 0.03)",
                "glass-border": "rgba(255, 255, 255, 0.08)",
                "sage-accent": "#a2b79e",

                // Dashboard Page Theme
                "dashboard-primary": "#1dc948",
                "dashboard-bg": "#112115",
                "dashboard-light": "#f6f8f6",
                "surface-dark": "#1a2a1e",
                "surface-hover": "#233628",

                // Identity Page Theme
                "identity-primary": "#17cf91",
                "identity-bg": "#0a1f1c",
                "identity-light": "#f6f8f7",

                // Philosophy Page Theme
                "philosophy-primary": "#13eca4",
                "philosophy-bg": "#10221c",
                "philosophy-light": "#f6f8f7",
                "philosophy-charcoal": "#111816",
                "philosophy-midnight": "#0f172a",

                // Forum Page Theme
                "forum-primary": "#6BA3D8",
                "forum-bg-light": "#F8F9FA",
                "forum-bg-dark": "#101922",
                "forum-blue-10": "rgba(107, 163, 216, 0.1)",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "zen": ["Newsreader", "serif"],
                "dashboard": ["Manrope", "sans-serif"],
                "philosophy": ["Noto Serif", "serif"],
                "sans": ["Inter", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "0.5rem",
                "lg": "1rem",
                "xl": "1.5rem",
                "2xl": "2rem",
                "full": "9999px"
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
                'zen-gradient': 'radial-gradient(circle at 50% 0%, #1e293b 0%, #020617 100%)',
                'settings-glass': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
            },
            animation: {
                'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 8s ease-in-out infinite',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0) scale(1)' },
                    '50%': { transform: 'translateY(-20px) scale(1.05)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
