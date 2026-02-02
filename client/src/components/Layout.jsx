import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
    const location = useLocation();

    // Chat and Landing have their own layouts
    if (location.pathname === '/chat' || location.pathname === '/') {
        return <Outlet />;
    }

    return (
        <div className="min-h-screen bg-background-dark text-slate-200 font-display overflow-x-hidden">

            {/* Ambient Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-40"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-teal-accent/10 rounded-full blur-[100px] mix-blend-screen opacity-30"></div>
            </div>

            {/* Navigation */}
            <header className="fixed top-0 w-full z-50 glass-panel border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-teal-accent flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-[20px]">spa</span>
                        </div>
                        <h2 className="text-white text-xl font-bold tracking-tight">Mentamind</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/forum" className={`text-sm font-medium transition-colors ${location.pathname === '/forum' ? 'text-white' : 'text-slate-300 hover:text-white'}`}>Community</Link>
                        <Link to="/resources" className={`text-sm font-medium transition-colors ${location.pathname === '/resources' ? 'text-white' : 'text-slate-300 hover:text-white'}`}>Resources</Link>
                        <Link to="/chat" className={`text-sm font-medium transition-colors ${location.pathname === '/chat' ? 'text-white' : 'text-slate-300 hover:text-white'}`}>AI Chat</Link>
                    </nav>
                    <div className="flex items-center gap-6">
                        <Link to="/chat" className="flex items-center justify-center rounded-xl h-10 px-6 bg-primary text-white text-sm font-bold tracking-wide button-glow">
                            <span>Get Started</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 pt-20">
                <Outlet />
            </main>
        </div>
    );
}
