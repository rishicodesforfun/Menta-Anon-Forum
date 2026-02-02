export default function Landing() {
    return (
        <div className="font-display bg-landing-bg text-slate-200 antialiased selection:bg-landing-primary selection:text-white overflow-x-hidden min-h-screen">
            {/* Ambient Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-landing-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-40"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-teal-accent/10 rounded-full blur-[100px] mix-blend-screen opacity-30"></div>
                <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[150px] mix-blend-overlay opacity-50"></div>
            </div>
            {/* Navigation */}
            <header className="fixed top-0 w-full z-50 glass-panel border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-gradient-to-br from-landing-primary to-teal-accent flex items-center justify-center text-white shadow-lg shadow-landing-primary/20">
                            <span className="material-symbols-outlined text-[20px]">spa</span>
                        </div>
                        <h2 className="text-white text-xl font-bold tracking-tight">Mentamind</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-slate-300 hover:text-white text-sm font-medium transition-colors" href="#">About</a>
                        <a className="text-slate-300 hover:text-white text-sm font-medium transition-colors" href="#">Methodology</a>
                        <a className="text-slate-300 hover:text-white text-sm font-medium transition-colors" href="#">Pricing</a>
                    </nav>
                    <div className="flex items-center gap-6">
                        <a className="text-slate-300 hover:text-white text-sm font-medium transition-colors hidden sm:block" href="#">Login</a>
                        <button className="flex items-center justify-center rounded-xl h-10 px-6 bg-landing-primary text-white text-sm font-bold tracking-wide button-glow">
                            <span>Get Started</span>
                        </button>
                    </div>
                </div>
            </header>
            <main className="relative z-10 flex flex-col min-h-screen pt-20">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-6 lg:px-8 overflow-hidden">
                    <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Hero Content */}
                        <div className="flex flex-col gap-8 text-left z-20 order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                                </span>
                                <span className="text-teal-200/80 text-xs font-medium tracking-wide uppercase">Now accepting new members</span>
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white text-glow">
                                A Safe Space <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-blue-200">For Your Thoughts</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-slate-400 font-light leading-relaxed max-w-xl">
                                Experience the next evolution of anonymous therapeutic support. Private. Premium. Peace. Join a community built on trust.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="h-14 px-8 rounded-xl bg-landing-primary text-white text-base font-bold tracking-wide button-glow flex items-center justify-center gap-2">
                                    <span>Begin Your Journey</span>
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </button>
                                <button className="h-14 px-8 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors text-base font-medium flex items-center justify-center backdrop-blur-md">
                                    <span>View Methodology</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 pt-8 text-sm text-slate-500">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-landing-bg bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60')] bg-cover" data-alt="User avatar 1"></div>
                                    <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-landing-bg bg-[url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=60')] bg-cover" data-alt="User avatar 2"></div>
                                    <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-landing-bg bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60')] bg-cover" data-alt="User avatar 3"></div>
                                    <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-landing-bg flex items-center justify-center text-[10px] font-bold text-white">+2k</div>
                                </div>
                                <p>Trusted by thousands seeking clarity.</p>
                            </div>
                        </div>
                        {/* Hero Visual (3D Abstract) */}
                        <div className="relative z-10 h-[500px] lg:h-[700px] w-full flex items-center justify-center order-1 lg:order-2 perspective-1000">
                            {/* Decorative glowing orbs behind image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-landing-primary/30 to-teal-accent/20 rounded-full blur-[80px] opacity-60 animate-pulse"></div>
                            <div className="relative w-full h-full rounded-3xl overflow-hidden glass-card p-2 transform rotate-y-6 hover:rotate-y-0 transition-transform duration-700 ease-out">
                                <div className="w-full h-full rounded-2xl bg-black/40 overflow-hidden relative">
                                    {/* Abstract 3D Sculpture Image */}
                                    <img alt="Abstract 3D liquid metal sculpture reflecting blue and teal light, representing peace" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000" data-alt="Abstract 3D liquid metal sculpture reflecting blue and teal light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs6B15u7dLv-8CkLdaNmmlQLZCZRlP99RpYeje7uSWUeI1bckF5sFqR4rOjeiKDDhij8CHxbq3Ypx1Ug-Jz08CiSmqfqJjoa_0IcyFkzVZxVaaoIYYfKE2CBHzAATFzgw-dmNB2Skrb-6tJJP04XI5xrIRBuvazIISsTfxM9lFWDWwIP6VAqEpoXRdzqHVR-CKDA3CyM9YVIKt0V2chkNHNIPKAJc4EhPmNRuhvSaUlNq4HUitq3EEB7WdeftEafDVrVtKhYMjzvI" />
                                    {/* Glass Overlay on image */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-landing-bg via-landing-bg/50 to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Value Props Section */}
                <section className="relative py-24 px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col gap-4 mb-16 text-center lg:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Why Mentamind?</h2>
                            <p className="text-slate-400 max-w-2xl text-lg">Our approach combines privacy with professional care, creating a sanctuary for your mental well-being.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                            {/* Feature 1 */}
                            <div className="glass-card p-8 rounded-2xl flex flex-col gap-6 group">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors">
                                    <span className="material-symbols-outlined text-3xl">fingerprint</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3">Complete Anonymity</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">Your identity remains yours alone. Encrypted, safe, and free from judgment or tracking.</p>
                                </div>
                            </div>
                            {/* Feature 2 */}
                            <div className="glass-card p-8 rounded-2xl flex flex-col gap-6 group">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-white/10 flex items-center justify-center text-teal-400 group-hover:text-teal-300 transition-colors">
                                    <span className="material-symbols-outlined text-3xl">psychology</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3">Clinical Excellence</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">Therapy guided by top-tier professionals with years of experience in cognitive behavioral therapy.</p>
                                </div>
                            </div>
                            {/* Feature 3 */}
                            <div className="glass-card p-8 rounded-2xl flex flex-col gap-6 group">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                                    <span className="material-symbols-outlined text-3xl">all_inclusive</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3">Always Available</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">Support whenever the moment strikes, day or night. Your peace of mind doesn't have office hours.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* CTA Section */}
                <section className="relative py-32 px-6 lg:px-8 overflow-hidden">
                    {/* Background glow for CTA */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-landing-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-8">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight">
                            Ready to find your peace?
                        </h2>
                        <p className="text-xl text-slate-300 font-light max-w-2xl">
                            Join the thousands who have found clarity, purpose, and calm with Mentamind's premium platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-6">
                            <button className="h-14 px-10 rounded-xl bg-landing-primary text-white text-lg font-bold tracking-wide button-glow min-w-[200px]">
                                Start Free Trial
                            </button>
                            <button className="h-14 px-10 rounded-xl bg-transparent border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all text-lg font-medium min-w-[200px]">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            {/* Footer */}
            <footer className="border-t border-white/5 bg-black/20 backdrop-blur-md relative z-10">
                <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="size-6 rounded bg-gradient-to-br from-landing-primary to-teal-accent flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-[16px]">spa</span>
                            </div>
                            <span className="text-white text-lg font-bold tracking-tight">Mentamind</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8">
                            <a className="text-slate-500 hover:text-landing-primary transition-colors text-sm" href="#">Privacy Policy</a>
                            <a className="text-slate-500 hover:text-landing-primary transition-colors text-sm" href="#">Terms of Service</a>
                            <a className="text-slate-500 hover:text-landing-primary transition-colors text-sm" href="#">Contact Support</a>
                            <a className="text-slate-500 hover:text-landing-primary transition-colors text-sm" href="#">Cookies</a>
                        </div>
                        <div className="flex gap-4">
                            <a aria-label="Twitter" className="text-slate-500 hover:text-white transition-colors" href="#">
                                <span className="material-symbols-outlined">public</span>
                            </a>
                            <a aria-label="Instagram" className="text-slate-500 hover:text-white transition-colors" href="#">
                                <span className="material-symbols-outlined">share</span>
                            </a>
                            <a aria-label="LinkedIn" className="text-slate-500 hover:text-white transition-colors" href="#">
                                <span className="material-symbols-outlined">group</span>
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/5 text-center">
                        <p className="text-slate-600 text-sm">© 2023 Mentamind Inc. All rights reserved. Designed for peace.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
