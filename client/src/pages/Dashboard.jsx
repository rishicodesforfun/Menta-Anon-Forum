export default function Dashboard() {
    return (
        <div className="font-dashboard bg-dashboard-light dark:bg-dashboard-bg text-[#111713] dark:text-white overflow-hidden h-screen flex">
            {/* SideNavBar */}
            <aside className="w-20 lg:w-72 flex-shrink-0 border-r border-[#29382d] bg-dashboard-bg flex flex-col justify-between py-6 px-4 z-20 transition-all duration-300">
                <div className="flex flex-col gap-8">
                    {/* Logo */}
                    <div className="flex items-center gap-3 px-2">
                        <div className="flex items-center justify-center size-10 rounded-full bg-gradient-to-br from-dashboard-primary/20 to-dashboard-primary/5 border border-dashboard-primary/30">
                            <span className="material-symbols-outlined text-dashboard-primary text-2xl">mindfulness</span>
                        </div>
                        <div className="hidden lg:flex flex-col">
                            <h1 className="text-white text-lg font-bold leading-none tracking-tight">Mentamind</h1>
                            <p className="text-[#9eb7a5] text-xs font-medium tracking-wide mt-1">Admin Console</p>
                        </div>
                    </div>
                    {/* Navigation */}
                    <nav className="flex flex-col gap-2">
                        <a className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-hover group transition-colors" href="#">
                            <span className="material-symbols-outlined text-[#9eb7a5] group-hover:text-white transition-colors">dashboard</span>
                            <span className="hidden lg:block text-[#9eb7a5] text-sm font-medium group-hover:text-white transition-colors">Dashboard</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-3 rounded-xl bg-dashboard-primary/10 border border-dashboard-primary/10 group transition-colors relative overflow-hidden" href="#">
                            <div className="absolute inset-y-0 left-0 w-1 bg-dashboard-primary rounded-r-full"></div>
                            <span className="material-symbols-outlined text-dashboard-primary">shield_lock</span>
                            <span className="hidden lg:block text-white text-sm font-bold">Safety Queue</span>
                            <span className="hidden lg:flex ml-auto size-5 items-center justify-center rounded-full bg-dashboard-primary text-[#112115] text-[10px] font-bold">14</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-hover group transition-colors" href="#">
                            <span className="material-symbols-outlined text-[#9eb7a5] group-hover:text-white transition-colors">group</span>
                            <span className="hidden lg:block text-[#9eb7a5] text-sm font-medium group-hover:text-white transition-colors">User Management</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-hover group transition-colors" href="#">
                            <span className="material-symbols-outlined text-[#9eb7a5] group-hover:text-white transition-colors">description</span>
                            <span className="hidden lg:block text-[#9eb7a5] text-sm font-medium group-hover:text-white transition-colors">Reports & Logs</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-hover group transition-colors" href="#">
                            <span className="material-symbols-outlined text-[#9eb7a5] group-hover:text-white transition-colors">analytics</span>
                            <span className="hidden lg:block text-[#9eb7a5] text-sm font-medium group-hover:text-white transition-colors">Platform Analytics</span>
                        </a>
                    </nav>
                </div>
                {/* Bottom Actions */}
                <div className="flex flex-col gap-2">
                    <button className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-hover group transition-colors w-full">
                        <span className="material-symbols-outlined text-[#9eb7a5] group-hover:text-white">settings</span>
                        <span className="hidden lg:block text-[#9eb7a5] text-sm font-medium group-hover:text-white">Settings</span>
                    </button>
                    <div className="hidden lg:flex items-center gap-3 px-3 py-4 border-t border-[#29382d] mt-2">
                        <div className="size-8 rounded-full bg-cover bg-center" data-alt="Admin user avatar" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAgAhoKWE7cLuQ8ZE63wOtzPYIsSSLXeLkzFnXFtY7iQxGkPmkk72VaMROzUGJWU7vNG4C2nqgNjf-rB0yvGdMu82kI2FY6afpLSejmSwW9EeB99Mf1YkesnAZKmZkakLyVxGqPkw9pT-52xB-2G_yaTuCVdEDlcqR5bZOjaPCtDfZ8KaVc5assF581sr2Fi8rdIqYamv1cvFugklR9ir2IFcJ6e7NlHcL1frSyCmQFz7EQHt-tNJeZ79LGkHQzBwJWv3-TCEOB46Y")' }}></div>
                        <div className="flex flex-col">
                            <p className="text-white text-sm font-medium leading-none">Alex M.</p>
                            <p className="text-[#9eb7a5] text-xs">Senior Mod</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Page Heading & Filters */}
                <header className="flex-shrink-0 px-8 py-6 pb-0 z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white tracking-tight mb-1">Safety Queue</h2>
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-red-500 animate-pulse"></span>
                                <p className="text-[#9eb7a5] text-sm font-medium">High Priority • 14 Pending Items</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-dark border border-[#29382d] text-[#9eb7a5] hover:text-white hover:border-[#9eb7a5] transition-all">
                                <span className="material-symbols-outlined text-sm">filter_list</span>
                                <span className="text-sm font-medium">Filter</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-dark border border-[#29382d] text-[#9eb7a5] hover:text-white hover:border-[#9eb7a5] transition-all">
                                <span className="material-symbols-outlined text-sm">sort</span>
                                <span className="text-sm font-medium">Sort</span>
                            </button>
                        </div>
                    </div>
                    {/* Charts / KPI Section (Collapsed for Zen feel) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Main Chart */}
                        <div className="col-span-1 lg:col-span-2 rounded-2xl bg-surface-dark/50 border border-[#29382d] p-5 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-[#9eb7a5] text-xs font-semibold uppercase tracking-wider mb-1">Community Health</p>
                                    <div className="flex items-baseline gap-2">
                                        <h3 className="text-2xl font-bold text-white">98.2%</h3>
                                        <span className="text-dashboard-primary text-sm font-medium flex items-center">
                                            <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>
                                            +0.4%
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 rounded bg-dashboard-bg text-[#9eb7a5] text-xs font-medium">24h</span>
                                    <span className="px-2 py-1 rounded hover:bg-dashboard-bg text-[#9eb7a5]/50 hover:text-[#9eb7a5] text-xs font-medium cursor-pointer transition-colors">7d</span>
                                </div>
                            </div>
                            {/* Minimal Line Chart SVG */}
                            <div className="h-24 w-full">
                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#1dc948" stopOpacity="0.2"></stop>
                                            <stop offset="100%" stopColor="#1dc948" stopOpacity="0"></stop>
                                        </linearGradient>
                                    </defs>
                                    <path d="M0,80 Q40,70 80,60 T160,55 T240,65 T320,40 T400,20" fill="none" stroke="#1dc948" strokeLinecap="round" strokeWidth="2"></path>
                                    <path d="M0,80 Q40,70 80,60 T160,55 T240,65 T320,40 T400,20 V100 H0 Z" fill="url(#chartGradient)" stroke="none"></path>
                                </svg>
                            </div>
                        </div>
                        {/* Mini KPI */}
                        <div className="rounded-2xl bg-surface-dark/50 border border-[#29382d] p-5 flex flex-col justify-center gap-4">
                            <div className="flex items-center justify-between">
                                <p className="text-[#9eb7a5] text-xs font-semibold uppercase tracking-wider">Avg. Resolution Time</p>
                                <span className="material-symbols-outlined text-[#9eb7a5]">timer</span>
                            </div>
                            <p className="text-3xl font-bold text-white">1m 42s</p>
                            <div className="w-full bg-[#29382d] rounded-full h-1.5 overflow-hidden">
                                <div className="bg-dashboard-primary h-full rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <p className="text-[#9eb7a5] text-xs">15% faster than yesterday</p>
                        </div>
                    </div>
                    {/* Chips/Tabs */}
                    <div className="flex gap-2 pb-4 overflow-x-auto no-scrollbar">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-dashboard-primary text-[#112115] text-sm font-bold shadow-lg shadow-dashboard-primary/20 transition-transform active:scale-95">
                            <span>All Content</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-dark border border-[#29382d] text-[#9eb7a5] hover:text-white hover:border-[#9eb7a5] transition-all active:scale-95">
                            <span className="material-symbols-outlined text-sm">image</span>
                            <span>Images</span>
                            <span className="bg-[#29382d] text-xs px-1.5 py-0.5 rounded ml-1">8</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-dark border border-[#29382d] text-[#9eb7a5] hover:text-white hover:border-[#9eb7a5] transition-all active:scale-95">
                            <span className="material-symbols-outlined text-sm">videocam</span>
                            <span>Video</span>
                            <span className="bg-[#29382d] text-xs px-1.5 py-0.5 rounded ml-1">4</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-dark border border-[#29382d] text-[#9eb7a5] hover:text-white hover:border-[#9eb7a5] transition-all active:scale-95">
                            <span className="material-symbols-outlined text-sm">article</span>
                            <span>Text</span>
                            <span className="bg-[#29382d] text-xs px-1.5 py-0.5 rounded ml-1">2</span>
                        </button>
                    </div>
                </header>
                {/* Scrollable Grid Content */}
                <div className="flex-1 overflow-y-auto px-8 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Card 1: Image Violation */}
                        <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-dark border border-[#29382d] hover:border-[#9eb7a5]/50 hover:shadow-2xl hover:shadow-dashboard-primary/5 transition-all duration-300">
                            {/* Background Image with Blur Effect */}
                            <div className="absolute inset-0 bg-cover bg-center blur-reveal" data-alt="Abstract blurred colors representing potentially sensitive image content" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCI3BbQopNZoyNfe0qNvXYsTf7eGcFs6gXlV0uU7AlHEjJTiBTkYVQbmQXBwyTbV9GFSIFz4UvZhujdlxY5RXTBkxd8AlM0FpLz9q0eUXwARn8pCk8ytx7DOiMbg5PaWlKPQbgD2484fjf4VZhYQRmOoBlD2uI3EEiT1ouWPMM3_MlCw6k3zHT4QNXmyOldYskZ2spRqVJvqVbraVUoO3J_N5SaF3oKkayvoPs35CJfC6-F_GLghTHPMVznHemqBOF2JbWeOWXzJbc")' }}></div>
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {/* Top Info */}
                            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
                                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                                    <div className="size-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">JD</div>
                                    <span className="text-xs font-medium text-white/90">@jdoe_88</span>
                                </div>
                                <span className="text-[10px] font-bold text-white/60 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">2m ago</span>
                            </div>
                            {/* Bottom Content & Actions */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col gap-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-500/20 text-red-200 border border-red-500/20 text-xs font-bold mb-2 backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-[14px]">warning</span>
                                        Hate Symbols
                                    </div>
                                    <p className="text-sm text-white/80 line-clamp-2 text-shadow-sm">System flagged pattern match with known hate group imagery.</p>
                                </div>
                                {/* Hover Actions */}
                                <div className="grid grid-cols-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                    <button className="flex items-center justify-center h-10 rounded-lg bg-red-500/90 hover:bg-red-500 text-white backdrop-blur-sm transition-colors" title="Confirm Violation">
                                        <span className="material-symbols-outlined">block</span>
                                    </button>
                                    <button className="flex items-center justify-center h-10 rounded-lg bg-yellow-500/90 hover:bg-yellow-500 text-black backdrop-blur-sm transition-colors" title="Escalate">
                                        <span className="material-symbols-outlined">flag</span>
                                    </button>
                                    <button className="flex items-center justify-center h-10 rounded-lg bg-dashboard-primary/90 hover:bg-dashboard-primary text-[#112115] backdrop-blur-sm transition-colors" title="Mark Safe">
                                        <span className="material-symbols-outlined">check</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Card 2: Text Violation */}
                        <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-dark border border-[#29382d] hover:border-[#9eb7a5]/50 hover:shadow-2xl hover:shadow-dashboard-primary/5 transition-all duration-300">
                            <div className="absolute inset-0 bg-surface-hover p-6 flex items-center justify-center">
                                <p className="text-white/40 text-2xl font-serif italic text-center blur-sm group-hover:blur-none transition-all duration-300">
                                    "This is a placeholder for sensitive text content that would be blurred initially."
                                </p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
                                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                                    <div className="size-6 rounded-full bg-purple-500 flex items-center justify-center text-[10px] text-white font-bold">MK</div>
                                    <span className="text-xs font-medium text-white/90">@mk_ultra</span>
                                </div>
                                <span className="text-[10px] font-bold text-white/60 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">5m ago</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col gap-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-200 border border-orange-500/20 text-xs font-bold mb-2 backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-[14px]">psychology_alt</span>
                                        Harassment
                                    </div>
                                    <p className="text-sm text-white/80 line-clamp-2 text-shadow-sm">High toxicity score (0.92) detected in comment thread.</p>
                                </div>
                                <div className="grid grid-cols-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                    <button className="flex items-center justify-center h-10 rounded-lg bg-red-500/90 hover:bg-red-500 text-white backdrop-blur-sm transition-colors">
                                        <span className="material-symbols-outlined">block</span>
                                    </button>
                                    <button className="flex items-center justify-center h-10 rounded-lg bg-yellow-500/90 hover:bg-yellow-500 text-black backdrop-blur-sm transition-colors">
                                        <span className="material-symbols-outlined">flag</span>
                                    </button>
                                    <button className="flex items-center justify-center h-10 rounded-lg bg-dashboard-primary/90 hover:bg-dashboard-primary text-[#112115] backdrop-blur-sm transition-colors">
                                        <span className="material-symbols-outlined">check</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Card 3: Video Violation */}
                        <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-dark border border-[#29382d] hover:border-[#9eb7a5]/50 hover:shadow-2xl hover:shadow-dashboard-primary/5 transition-all duration-300">
                            <div className="absolute inset-0 bg-cover bg-center blur-reveal" data-alt="Blurred video thumbnail of a street scene" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAxUV2Z8LvBat-1V2fECJ2vxkQZdXGfY6TIkqpINBg7ggEPcYDVffQEwLuUGU9m1Y2C6pcypiyL7N0OniFlC6qVsGBTmcJtrDeZiGkE7dKqq9e99NKMzzcYOmBkAJJ6jOqQdS8Q9Bc_ToE_fK3fntj6kbgZUPTmyVEywYOIs4CShYSukoX_wo47pmnuROXHcxsCQI0_C1Zl49HP5Vf8AYSXEpeNKv6mv6HbcaDyhk2JY-Ks7S3TfU6qPL2xb0NnD2Lf_kNl-JR2FC4")' }}></div>
                            {/* Video Icon Overlay (Always visible) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                                <div className="size-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20">
                                    <span className="material-symbols-outlined text-white">play_arrow</span>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
                                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                                    <div className="size-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">SP</div>
                                    <span className="text-xs font-medium text-white/90">@speed_demon</span>
                                </div>
                                <span className="text-[10px] font-bold text-white/60 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">12m ago</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col gap-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-500/20 text-red-200 border border-red-500/20 text-xs font-bold mb-2 backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-[14px]">report</span>
                                        Violence
                                    </div>
                                    <p className="text-sm text-white/80 line-clamp-2 text-shadow-sm">User reported for dangerous acts in livestream.</p>
                                </div>
                                <div className="grid grid-cols-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                    <button className="flex items-center justify-center h-10 rounded-lg bg-red-500/90 hover:bg-red-500 text-white backdrop-blur-sm transition-colors">
                                        <span className="material-symbols-outlined">block</span>
                                    </button>
                                    <button className="flex items-center justify-center h-10 rounded-lg bg-yellow-500/90 hover:bg-yellow-500 text-black backdrop-blur-sm transition-colors">
                                        <span className="material-symbols-outlined">flag</span>
                                    </button>
                                    <button className="flex items-center justify-center h-10 rounded-lg bg-dashboard-primary/90 hover:bg-dashboard-primary text-[#112115] backdrop-blur-sm transition-colors">
                                        <span className="material-symbols-outlined">check</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Card 4: Spam */}
                        <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-dark border border-[#29382d] hover:border-[#9eb7a5]/50 hover:shadow-2xl hover:shadow-dashboard-primary/5 transition-all duration-300">
                            <div className="absolute inset-0 bg-cover bg-center blur-reveal" data-alt="Blurred abstract pattern of repetitive text" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAyFteVYDJrfmoJC8Q3yoDx9Orinsav4rAhzHkEJzCppF-yQqnD7gCjsDRQeR4QlmkWU1sRI4BT4b2jMH_PSryEm3R7fpgrGsRkp2J23gPmhvxp6C3OoVP-x_DrHPJU9fKWNRGo491QYvoOFzZYujEVGvoRwud6maoFbeK_2JQV9qCRJTUclOhsBaRO7G_fUdoKEb3VCxGdEpO6cZ0CFS_Ujn0ZWI5HocpznxR82AKYbEa8KQbfAiuQ8yrg-4IZKq1ryvLSZd8Gdnc")' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
                                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                                    <div className="size-6 rounded-full bg-pink-500 flex items-center justify-center text-[10px] text-white font-bold">BT</div>
                                    <span className="text-xs font-medium text-white/90">@bot_net_99</span>
                                </div>
                                <span className="text-[10px] font-bold text-white/60 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">15m ago</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col gap-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-200 border border-blue-500/20 text-xs font-bold mb-2 backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-[14px]">mail</span>
                                        Spam
                                    </div>
                                    <p className="text-sm text-white/80 line-clamp-2 text-shadow-sm">Repetitive posting detected across multiple channels.</p>
                                </div>
                                <div className="grid grid-cols-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                    <button className="flex items-center justify-center h-10 rounded-lg bg-red-500/90 hover:bg-red-500 text-white backdrop-blur-sm transition-colors">
                                        <span className="material-symbols-outlined">block</span>
                                    </button>
                                    <button className="flex items-center justify-center h-10 rounded-lg bg-yellow-500/90 hover:bg-yellow-500 text-black backdrop-blur-sm transition-colors">
                                        <span className="material-symbols-outlined">flag</span>
                                    </button>
                                    <button className="flex items-center justify-center h-10 rounded-lg bg-dashboard-primary/90 hover:bg-dashboard-primary text-[#112115] backdrop-blur-sm transition-colors">
                                        <span className="material-symbols-outlined">check</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
