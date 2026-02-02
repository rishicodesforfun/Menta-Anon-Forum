import { Link } from 'react-router-dom';

export default function Forum() {
    return (
        <div className="font-display bg-forum-bg-light dark:bg-forum-bg-dark text-[#111418] dark:text-gray-100 antialiased min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] dark:border-[#2d3748] bg-white dark:bg-[#1a202c] px-4 py-3 lg:px-10">
                <div className="flex items-center gap-4 lg:gap-8">
                    <Link to="/" className="flex items-center gap-4 text-[#111418] dark:text-white">
                        <div className="size-8 rounded-lg bg-forum-primary/10 flex items-center justify-center text-forum-primary">
                            <span className="material-symbols-outlined">spa</span>
                        </div>
                        <h2 className="text-[#111418] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] hidden sm:block">Mentamind</h2>
                    </Link>
                    <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
                        <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                            <div className="text-[#617589] flex border-none bg-[#f0f2f4] dark:bg-[#2d3748] items-center justify-center pl-4 rounded-l-xl border-r-0">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] dark:bg-[#2d3748] focus:border-none h-full placeholder:text-[#617589] px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" placeholder="Search topics..." defaultValue="" />
                        </div>
                    </label>
                </div>
                <div className="flex flex-1 justify-end gap-4 lg:gap-8 items-center">
                    <div className="hidden lg:flex items-center gap-9">
                        <a className="text-[#111418] dark:text-white text-sm font-medium hover:text-forum-primary transition-colors" href="#">Community</a>
                        <a className="text-[#617589] dark:text-gray-400 text-sm font-medium hover:text-forum-primary transition-colors" href="#">Resources</a>
                        <a className="text-[#617589] dark:text-gray-400 text-sm font-medium hover:text-forum-primary transition-colors" href="#">Groups</a>
                    </div>
                    <div className="flex gap-3 items-center">
                        <button className="hidden md:flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] dark:bg-[#2d3748] text-[#111418] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <span className="truncate flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">shield_person</span>
                                Browsing as: Admin
                            </span>
                        </button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-white dark:border-gray-800 shadow-sm cursor-pointer hover:opacity-80 transition-opacity" data-alt="User avatar with a calming gradient pattern" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB849LpkXX_zJfEu5t7gaQtEqITZfr0HAjxH-FA1U5HhhJH7OS5yyYPBkr24tNZKxfNVrgc5sN-4HY_wQ4O6JxYGJ7_MxyVcspCjjetMj0ecxTocDo8y8O-A7M3D9rRvHhcg_qiiIE0Mj7YxW9kd1wzetqsTyNfyD2MpQ3gxyRLBVVwyN744K-Phpm8hESLalC8gCpNZSKMnj2L2RYoC201FIyNyAUT4gAXzdKt-ggQ-rwxkQ9-suozvwPA5uxE09WsKa-h95sNTZw")' }}></div>
                    </div>
                </div>
            </header>
            <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="w-full rounded-xl border border-[#4A5568]/20 bg-[#EDF2F7] dark:bg-[#2d3748] dark:border-gray-600 px-4 py-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-8 items-center justify-center rounded-lg bg-[#4A5568] text-white">
                                        <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#4A5568] dark:text-gray-200">Admin Mode</p>
                                        <p className="text-xs text-[#4A5568]/80 dark:text-gray-400">Full moderation privileges active</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="text-xs font-medium text-[#4A5568] dark:text-gray-400">Live</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-[#111418] dark:text-white text-[32px] font-bold leading-tight tracking-tight">Community Discussions</h1>
                                <p className="text-[#617589] dark:text-gray-400 text-sm mt-1">Review and moderate community posts.</p>
                            </div>
                            <button className="lg:hidden flex items-center justify-center rounded-xl h-10 px-4 bg-forum-primary text-white text-sm font-bold shadow-lg shadow-blue-500/30">
                                Create Post
                            </button>
                        </div>
                        <div className="border-b border-[#dbe0e6] dark:border-gray-700">
                            <div className="flex gap-6 overflow-x-auto no-scrollbar">
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-[#111418] dark:border-b-white pb-3 min-w-[60px]" href="#">
                                    <p className="text-[#111418] dark:text-white text-sm font-bold whitespace-nowrap">Latest</p>
                                </a>
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent pb-3 min-w-[60px] hover:border-b-gray-300 transition-colors" href="#">
                                    <p className="text-[#617589] dark:text-gray-400 text-sm font-medium whitespace-nowrap">Flagged</p>
                                </a>
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent pb-3 min-w-[60px] hover:border-b-gray-300 transition-colors" href="#">
                                    <p className="text-[#617589] dark:text-gray-400 text-sm font-medium whitespace-nowrap">Unanswered</p>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <article className="group relative flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1a202c] p-5 border border-[#E9ECEF] dark:border-gray-700 hover:border-forum-primary dark:hover:border-forum-primary transition-all duration-200">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div aria-label="Avatar for User1234" className="size-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                                            <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-[#111418] dark:text-white">User8821</span>
                                            <span className="text-xs text-[#617589] dark:text-gray-400">2 hours ago</span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                        <span className="material-symbols-outlined">more_horiz</span>
                                    </button>
                                </div>
                                <div className="cursor-pointer">
                                    <h3 className="text-lg font-bold text-forum-primary dark:text-[#8ac5ff] mb-2 group-hover:text-primary transition-colors">Feeling overwhelmed by work today...</h3>
                                    <p className="text-[#617589] dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
                                        It just feels like the deadlines keep piling up and I can't catch a break. I tried taking a walk but the anxiety just follows me. Has anyone found good grounding techniques for office stress?
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center justify-between gap-y-3 pt-2">
                                    <div className="flex gap-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300">
                                            #Anxiety
                                        </span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                                            #WorkStress
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-1.5 text-xs font-medium text-[#617589] dark:text-gray-400 hover:text-forum-primary transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                                            12 Replies
                                        </button>
                                        <button className="flex items-center gap-1.5 text-xs font-medium text-[#617589] dark:text-gray-400 hover:text-pink-500 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">favorite</span>
                                            24 Supports
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
                                    <div className="flex items-center gap-1 text-xs font-semibold text-[#4A5568]/70 dark:text-gray-500">
                                        <span className="material-symbols-outlined text-[16px]">shield</span>
                                        <span>Moderation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-xs font-bold text-[#4A5568] transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700">
                                            <span className="material-symbols-outlined text-[18px]">lock</span>
                                            Lock Discussion
                                        </button>
                                        <button className="flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-xs font-bold text-[#4A5568] transition-colors hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-900/30 dark:hover:text-red-400">
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                            Delete Post
                                        </button>
                                    </div>
                                </div>
                            </article>
                            <article className="group relative flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1a202c] p-5 border border-[#E9ECEF] dark:border-gray-700 hover:border-forum-primary dark:hover:border-forum-primary transition-all duration-200">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">
                                            <span className="material-symbols-outlined text-[20px]">forest</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-[#111418] dark:text-white">NatureLover</span>
                                            <span className="text-xs text-[#617589] dark:text-gray-400">4 hours ago</span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <span className="material-symbols-outlined">more_horiz</span>
                                    </button>
                                </div>
                                <div className="cursor-pointer">
                                    <h3 className="text-lg font-bold text-forum-primary dark:text-[#8ac5ff] mb-2 group-hover:text-primary transition-colors">Small win: I finally went for a walk!</h3>
                                    <p className="text-[#617589] dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
                                        I've been staying inside for almost a week due to low mood. Today I forced myself to put on shoes and just walk to the corner. It wasn't much, but the sun felt nice. Baby steps.
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center justify-between gap-y-3 pt-2">
                                    <div className="flex gap-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E0F7FA] text-[#006064] dark:bg-teal-900/30 dark:text-teal-300">
                                            #Positivity
                                        </span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E0F7FA] text-[#006064] dark:bg-teal-900/30 dark:text-teal-300">
                                            #SmallWins
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-1.5 text-xs font-medium text-[#617589] dark:text-gray-400 hover:text-forum-primary transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                                            8 Replies
                                        </button>
                                        <button className="flex items-center gap-1.5 text-xs font-medium text-[#617589] dark:text-gray-400 hover:text-pink-500 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">favorite</span>
                                            56 Supports
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
                                    <div className="flex items-center gap-1 text-xs font-semibold text-[#4A5568]/70 dark:text-gray-500">
                                        <span className="material-symbols-outlined text-[16px]">shield</span>
                                        <span>Moderation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-xs font-bold text-[#4A5568] transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700">
                                            <span className="material-symbols-outlined text-[18px]">lock</span>
                                            Lock Discussion
                                        </button>
                                        <button className="flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-xs font-bold text-[#4A5568] transition-colors hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-900/30 dark:hover:text-red-400">
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                            Delete Post
                                        </button>
                                    </div>
                                </div>
                            </article>
                            <article className="group relative flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1a202c] p-5 border border-[#E9ECEF] dark:border-gray-700 hover:border-forum-primary dark:hover:border-forum-primary transition-all duration-200">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                                            <span className="material-symbols-outlined text-[20px]">pets</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-[#111418] dark:text-white">CuriousCat</span>
                                            <span className="text-xs text-[#617589] dark:text-gray-400">12 hours ago</span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <span className="material-symbols-outlined">more_horiz</span>
                                    </button>
                                </div>
                                <div className="cursor-pointer">
                                    <h3 className="text-lg font-bold text-forum-primary dark:text-[#8ac5ff] mb-2 group-hover:text-primary transition-colors">Just need to vent about my family situation</h3>
                                    <p className="text-[#617589] dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
                                        No advice needed, just need to get this off my chest. Thanksgiving plans are becoming a nightmare and boundaries are being crossed left and right. Why is saying "no" so hard?
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center justify-between gap-y-3 pt-2">
                                    <div className="flex gap-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                            #Venting
                                        </span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300">
                                            #Family
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-1.5 text-xs font-medium text-[#617589] dark:text-gray-400 hover:text-forum-primary transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                                            3 Replies
                                        </button>
                                        <button className="flex items-center gap-1.5 text-xs font-medium text-[#617589] dark:text-gray-400 hover:text-pink-500 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">favorite</span>
                                            15 Supports
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
                                    <div className="flex items-center gap-1 text-xs font-semibold text-[#4A5568]/70 dark:text-gray-500">
                                        <span className="material-symbols-outlined text-[16px]">shield</span>
                                        <span>Moderation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-xs font-bold text-[#4A5568] transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700">
                                            <span className="material-symbols-outlined text-[18px]">lock</span>
                                            Lock Discussion
                                        </button>
                                        <button className="flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-xs font-bold text-[#4A5568] transition-colors hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-900/30 dark:hover:text-red-400">
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                            Delete Post
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="flex justify-center py-6">
                            <span className="material-symbols-outlined animate-spin text-gray-400">progress_activity</span>
                        </div>
                    </div>
                    <div className="hidden lg:block lg:col-span-4 space-y-6">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-[#FFF0ED] dark:bg-[#2A2422] rounded-xl p-5 border border-orange-100 dark:border-gray-800">
                                <h3 className="text-base font-bold text-[#111418] dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-forum-primary">edit_note</span>
                                    Share what's on your mind
                                </h3>
                                <div className="flex flex-col gap-3">
                                    <textarea className="w-full resize-none rounded-xl bg-white/60 dark:bg-[#2d3748] border-none p-3 text-sm focus:ring-2 focus:ring-forum-primary/20 placeholder:text-gray-400 dark:text-white h-24" placeholder="How are you feeling today? (Anonymous)"></textarea>
                                    <div className="flex items-center justify-between">
                                        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-forum-primary transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">sell</span>
                                            Add Tags
                                        </button>
                                        <div className="text-xs text-gray-400">0/500</div>
                                    </div>
                                    <button className="flex w-full cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-forum-primary text-white text-sm font-bold shadow-md shadow-blue-500/20 hover:bg-[#5a8bc0] transition-colors">
                                        Post Anonymously
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-[#1a202c] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-800">
                                <h3 className="text-sm font-bold text-[#111418] dark:text-white mb-4 uppercase tracking-wider text-xs text-gray-500">Trending Topics</h3>
                                <div className="flex flex-col gap-3">
                                    <a className="flex justify-between items-center group" href="#">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-forum-primary transition-colors">#MentalHealth</span>
                                        <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-md">245 posts</span>
                                    </a>
                                    <a className="flex justify-between items-center group" href="#">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-forum-primary transition-colors">#Relationships</span>
                                        <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-md">182 posts</span>
                                    </a>
                                    <a className="flex justify-between items-center group" href="#">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-forum-primary transition-colors">#Depression</span>
                                        <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-md">120 posts</span>
                                    </a>
                                    <a className="flex justify-between items-center group" href="#">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-forum-primary transition-colors">#Joy</span>
                                        <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-md">98 posts</span>
                                    </a>
                                </div>
                            </div>
                            <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-4 border border-orange-100 dark:border-orange-800/30">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-orange-500 mt-0.5">warning</span>
                                    <div>
                                        <h4 class="text-sm font-bold text-orange-800 dark:text-orange-200">Need immediate help?</h4>
                                        <p className="text-xs text-orange-700 dark:text-orange-300/80 mt-1 leading-relaxed">
                                            If you or someone else is in danger, please contact local emergency services or call the Suicide & Crisis Lifeline at 988.
                                        </p>
                                        <a className="inline-block mt-2 text-xs font-bold text-orange-600 dark:text-orange-300 underline" href="#">View Crisis Resources</a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 px-2">
                                <a className="text-xs text-gray-400 hover:text-gray-600" href="#">Guidelines</a>
                                <a className="text-xs text-gray-400 hover:text-gray-600" href="#">Privacy Policy</a>
                                <a className="text-xs text-gray-400 hover:text-gray-600" href="#">About Mentamind</a>
                                <span className="text-xs text-gray-300">© 2023 Mentamind</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
