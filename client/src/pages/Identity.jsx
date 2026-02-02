export default function Identity() {
    return (
        <div className="bg-identity-light dark:bg-identity-bg font-display text-white transition-colors duration-300 min-h-screen flex flex-col overflow-hidden relative">
            {/* Top Navigation */}
            <nav className="absolute top-0 left-0 w-full z-20 px-6 py-6 md:px-12 flex items-center justify-between">
                <div className="flex items-center gap-3 text-white opacity-80 hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-identity-primary text-2xl">spa</span>
                    <span className="text-xl font-medium tracking-wide">Zen Identity</span>
                </div>
                <button className="flex items-center gap-2 text-[#9db8af] hover:text-white transition-colors text-sm md:text-base font-sans">
                    <span className="material-symbols-outlined text-[20px]">help_outline</span>
                    <span>Need help?</span>
                </button>
            </nav>

            {/* Main Content */}
            <main className="relative flex-1 flex flex-col items-center justify-center p-4 w-full h-full min-h-screen z-10">
                {/* Background Ambient Orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-identity-primary/10 blur-[120px] animate-pulse-slow pointer-events-none z-0"></div>
                <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-teal-500/5 blur-[80px] animate-float pointer-events-none z-0"></div>

                <div className="relative z-10 flex flex-col items-center max-w-2xl w-full gap-8 md:gap-12 animate-fade-in-up">
                    {/* Heading */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-tight drop-shadow-sm">
                            Restore Identity
                        </h1>
                        <p className="text-[#9db8af] text-lg md:text-xl font-light font-display italic opacity-90 max-w-lg mx-auto leading-relaxed">
                            Breathe. Enter your 12-word recovery phrase to reclaim your space.
                        </p>
                    </div>

                    {/* Input Section */}
                    <div className="w-full relative group">
                        {/* Subtle glow border effect on focus-within */}
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-identity-primary/30 to-transparent rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 blur-sm"></div>
                        <div className="relative glass-effect rounded-2xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 group-focus-within:border-identity-primary/40 group-focus-within:bg-identity-bg/60">
                            <div className="absolute top-4 right-4 text-xs font-sans text-identity-primary/60 tracking-wider uppercase font-bold">
                                Secure Input
                            </div>
                            <textarea
                                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-[#5e756e] text-lg md:text-2xl leading-relaxed font-display p-8 min-h-[220px] resize-none focus:outline-none selection:bg-identity-primary/30"
                                placeholder="ocean  breeze  calm  mountain  silent  wisdom  breathe  light  shadow  grow  peace  eternal..."
                                spellCheck="false"
                            ></textarea>
                            {/* Word Counter / Status */}
                            <div className="absolute bottom-0 left-0 w-full px-6 py-3 bg-black/20 backdrop-blur-sm border-t border-white/5 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-identity-primary/60 text-sm">lock</span>
                                    <span className="text-xs text-[#9db8af] font-sans">End-to-end encrypted</span>
                                </div>
                                <span className="text-xs text-[#9db8af] font-sans">0/12 words</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-center gap-6 w-full">
                        <button className="relative group cursor-pointer overflow-hidden rounded-xl bg-identity-primary hover:bg-[#1ce19f] text-[#0a1f1c] px-10 py-4 shadow-[0_0_20px_rgba(23,207,145,0.3)] hover:shadow-[0_0_35px_rgba(23,207,145,0.5)] transition-all duration-300 transform hover:-translate-y-0.5">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative text-lg font-bold font-sans tracking-wide flex items-center gap-2">
                                Restore My Space
                                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </span>
                        </button>
                        <a className="text-[#5e756e] hover:text-identity-primary transition-colors text-sm font-sans underline decoration-1 underline-offset-4 decoration-[#5e756e]/50 hover:decoration-identity-primary" href="#">
                            Lost your recovery key?
                        </a>
                    </div>
                </div>
            </main>

            {/* Footer Decoration */}
            <div className="absolute bottom-0 left-0 w-full p-6 flex justify-center opacity-30 pointer-events-none">
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-identity-primary/40 to-transparent rounded-full"></div>
            </div>
        </div>
    );
}
