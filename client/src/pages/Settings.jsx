export default function Settings() {
    return (
        <div className="font-zen bg-settings-bg text-white min-h-screen flex flex-col overflow-x-hidden selection:bg-settings-primary/30 selection:text-white">
            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 bg-zen-gradient pointer-events-none"></div>
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-settings-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-[-20%] right-[-10%] w-[40%] h-[60%] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Main Layout */}
            <div className="relative z-10 flex flex-col h-full min-h-screen w-full max-w-[1440px] mx-auto p-4 md:p-8 lg:p-12">
                {/* Top Nav (Simplified for Zen Mode) */}
                <header className="flex items-center justify-between px-2 py-4 mb-8">
                    <div className="flex items-center gap-4 text-white/90 hover:text-white transition-colors cursor-pointer">
                        <div className="size-6 text-settings-primary">
                            <span className="material-symbols-outlined text-3xl">spa</span>
                        </div>
                        <h2 className="text-2xl font-light italic tracking-tight">Mentamind <span className="text-white/40 not-italic text-sm ml-2 tracking-widest uppercase font-medium">Zen</span></h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white/80 hover:text-white">
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                        </button>
                        <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-white/10" data-alt="Abstract gradient avatar representing a user profile" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCX5uaXaw6HEnwzNHqKCnDahsB42_qJavsj-mizaCvHGB6xpvFwaWOkhx9oIG1pedXMairudNg8AjoSZwjxrnbxRh2F38imGzIrgs242TsEOgRdL0YrYUjdzUNkl4bCw8UFUYzqKBJfAHu-sVuKw2VjEtobjgZ0YwBoHhWyeucmpM8OWcPb_QZgDlwd4I7XkmaPtdxMVqBxQp4aO5h8PEQGOjq3dxj7M5c6zCPul_fvdEnggHbComNnoSk2xIOprmH2c3F4bef8s-Y")' }}></div>
                    </div>
                </header>

                {/* Glass Container */}
                <div className="flex-1 flex flex-col lg:flex-row glass-panel-zen bg-settings-glass border border-glass-border rounded-2xl overflow-hidden min-h-[700px]">
                    {/* Sidebar */}
                    <nav className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-glass-border p-6 flex flex-col justify-between bg-black/20">
                        <div className="flex flex-col gap-8">
                            {/* User Mini Profile */}
                            <div className="flex items-center gap-4 pb-6 border-b border-glass-border/50">
                                <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-lg" data-alt="Abstract calming blue and green gradient circle" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBMg738NnROJwzt5O6pH0XdY35tQn0s_W8xIa6zPAZq1xX13W_Hfc8PyjuMtlxJRx3IQ0E_7oVhcsxwRA5cWr2_6XKBf77MnvkFeXX3R1tEIllw6O2KwlhKYghLI6anVuO_xYD1FeHfc26h3_DGAjGm-K1Shab_m7gF1jBIIqHVDVt3e0HBe-0sS5PdYtZQDoUgVjBjc52PWawOFJ4gADdK_rUT1bYz0ojqcAjbANflkqWkS8lczt5Kqd4jFSDK9LUp_B8HbN6mz6c")' }}></div>
                                <div className="flex flex-col">
                                    <h1 className="text-lg font-medium leading-tight text-white/90">Settings</h1>
                                    <p className="text-sage-accent/70 text-sm italic">Manage your peace</p>
                                </div>
                            </div>
                            {/* Navigation Links */}
                            <div className="flex flex-col gap-2">
                                <button className="group flex items-center gap-4 px-4 py-3 rounded-xl bg-white/10 border border-white/5 text-white zen-transition">
                                    <span className="material-symbols-outlined text-settings-primary group-hover:scale-110 transition-transform">fingerprint</span>
                                    <div className="flex flex-col items-start">
                                        <span className="text-base font-medium">Identity</span>
                                    </div>
                                </button>
                                <button className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white zen-transition">
                                    <span className="material-symbols-outlined group-hover:text-white transition-colors">visibility</span>
                                    <div className="flex flex-col items-start">
                                        <span className="text-base font-medium">Display</span>
                                    </div>
                                </button>
                                <button className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white zen-transition">
                                    <span className="material-symbols-outlined group-hover:text-white transition-colors">shield</span>
                                    <div className="flex flex-col items-start">
                                        <span className="text-base font-medium">Privacy</span>
                                    </div>
                                </button>
                                <button className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white zen-transition">
                                    <span className="material-symbols-outlined group-hover:text-white transition-colors">tune</span>
                                    <div className="flex flex-col items-start">
                                        <span className="text-base font-medium">Soundscape</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <button className="mt-8 flex items-center gap-3 px-4 py-3 text-white/40 hover:text-red-400 transition-colors text-sm">
                            <span className="material-symbols-outlined text-[20px]">logout</span>
                            Sign Out
                        </button>
                    </nav>

                    {/* Main Content Area */}
                    <main className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12 relative">
                        {/* Section Header */}
                        <div className="max-w-3xl mx-auto mb-10">
                            <h2 className="text-4xl font-light text-white mb-2 tracking-tight">Identity Management</h2>
                            <p className="text-sage-accent text-lg font-light italic opacity-80">Your digital spirit is anonymous. Only you hold the keys to your presence.</p>
                        </div>
                        {/* Content Stack */}
                        <div className="max-w-3xl mx-auto flex flex-col gap-8">
                            {/* Card: Current Alias */}
                            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-glass-border hover:bg-white/[0.05] zen-transition">
                                <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
                                    <div className="flex-1 w-full">
                                        <label className="block text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Current Alias</label>
                                        <div className="relative group">
                                            <input className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-xl md:text-2xl text-white font-light focus:outline-none focus:border-settings-primary/50 zen-transition cursor-default" readOnly type="text" value="Wandering Willow" />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-sage-accent/50">
                                                <span className="material-symbols-outlined">badge</span>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm text-white/40 font-light">Last changed 14 days ago. You can regenerate once every 30 days.</p>
                                    </div>
                                    <button className="flex items-center justify-center gap-2 bg-settings-primary/20 hover:bg-settings-primary/30 text-settings-primary border border-settings-primary/20 px-6 py-4 rounded-xl font-medium zen-transition w-full md:w-auto whitespace-nowrap h-[66px]">
                                        <span className="material-symbols-outlined text-[20px] animate-spin-slow">autorenew</span>
                                        Regenerate Identity
                                    </button>
                                </div>
                            </div>
                            {/* Card: Recovery Key */}
                            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-glass-border hover:bg-white/[0.05] zen-transition relative overflow-hidden">
                                {/* Decorative background glow for importance */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-settings-primary/5 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h3 className="text-xl font-medium text-white/90">Recovery Key</h3>
                                            <p className="text-white/50 text-base mt-1 font-light">Used to restore your Zen state on a new device.</p>
                                        </div>
                                        <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500/80 hidden sm:block">
                                            <span className="material-symbols-outlined">lock</span>
                                        </div>
                                    </div>
                                    <label className="block text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Private Key</label>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="relative flex-1">
                                            <input className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-lg font-mono text-white/80 tracking-widest focus:outline-none" readOnly type="password" value="xk92-m29a-jj28-mm10-zk92-m29a-jj28-mm10" />
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-4 rounded-xl text-white/80 zen-transition" title="Reveal">
                                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                            </button>
                                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-4 rounded-xl text-white/80 zen-transition" title="Copy to Clipboard">
                                                <span className="material-symbols-outlined text-[20px]">content_copy</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/10 rounded-xl">
                                        <span className="material-symbols-outlined text-red-400 shrink-0 mt-0.5">warning</span>
                                        <p className="text-red-200/80 text-sm leading-relaxed">
                                            Do not share this key. Mentamind staff will never ask for your recovery key. If you lose it, your data cannot be recovered.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Divider */}
                            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>
                            {/* Other Settings Section Preview */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60 pointer-events-none select-none grayscale-[0.5]">
                                {/* Visual Context */}
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-glass-border">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium text-white/90">Display</h3>
                                        <span className="material-symbols-outlined text-white/40">visibility</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-white/70">Reduced Motion</span>
                                        <div className="w-12 h-6 bg-white/10 rounded-full relative">
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-glass-border">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium text-white/90">Privacy</h3>
                                        <span className="material-symbols-outlined text-white/40">shield</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-white/70">Anonymous Stats</span>
                                        <div className="w-12 h-6 bg-settings-primary/20 rounded-full relative">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-settings-primary rounded-full shadow-lg shadow-settings-primary/50"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            {/* Background texture overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-overlay" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCNRuvthB8HiccazuaZoPEHZapJ8Id49g4whUXA_PdTZEDDu5xq92qxm62SYcUN9desvOnx_63aCp0haxC5koKdr9evUhLc_tJTS8IpWRpZoYhHjr3sxKFrV0K8ikxswQiWvH0Ad8b0OlDgyc1JAGANGmIibH9l6E753aJ6wcgSfHeTh18tXqs7OOXoUSVKlSpMUrIwPs_shKlKz1JSQKyv50Q1cwYHN6a5YNHYB08lAVb3TigBFUJjmRYWb1MJXM1_PdqeBMhh9v8")' }}></div>
        </div>
    );
}
