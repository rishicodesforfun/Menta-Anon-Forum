import { Link } from 'react-router-dom';

export default function Philosophy() {
    return (
        <div className="font-philosophy bg-philosophy-light dark:bg-philosophy-bg text-white overflow-x-hidden selection:bg-philosophy-primary selection:text-philosophy-bg">
            {/* Main Container with Gradient Background */}
            <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-philosophy-midnight via-[#15201d] to-philosophy-bg">
                {/* Navigation */}
                <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-philosophy-bg/80 backdrop-blur-md transition-all duration-300">
                    <div className="flex h-16 max-w-[1280px] mx-auto items-center justify-between px-6 lg:px-10">
                        <div className="flex items-center gap-4 text-white">
                            <div className="text-philosophy-primary">
                                <span className="material-symbols-outlined text-3xl">spa</span>
                            </div>
                            <h2 className="text-white text-xl font-medium tracking-tight">Mentamind</h2>
                        </div>
                        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
                            <nav className="flex gap-8">
                                <a className="text-gray-300 hover:text-philosophy-primary text-sm font-medium transition-colors" href="#philosophy">Philosophy</a>
                                <a className="text-gray-300 hover:text-philosophy-primary text-sm font-medium transition-colors" href="#anonymity">Anonymity</a>
                                <a className="text-gray-300 hover:text-philosophy-primary text-sm font-medium transition-colors" href="#ai">AI</a>
                                <a className="text-gray-300 hover:text-philosophy-primary text-sm font-medium transition-colors" href="#team">Team</a>
                            </nav>
                            <Link to="/landing" className="flex h-9 items-center justify-center rounded-full bg-philosophy-primary px-5 text-philosophy-bg text-sm font-bold shadow-[0_0_15px_rgba(19,236,164,0.3)] hover:bg-[#0fd693] hover:shadow-[0_0_20px_rgba(19,236,164,0.5)] transition-all">
                                <span className="truncate">Begin Journey</span>
                            </Link>
                        </div>
                        {/* Mobile Menu Icon */}
                        <button className="md:hidden text-white">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </header>

                <main className="flex flex-col w-full">
                    {/* HERO SECTION: Philosophy */}
                    <section className="relative flex min-h-screen items-center justify-center pt-16 px-6" id="philosophy">
                        {/* Abstract Background Layer */}
                        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBr5QD7F2lqYhS_j4UkHZpOUJc7uKC-tjzYO_7nty_afl7DT6pPlRmCNkK-KuvaypuEH5APNSCsQLzBFajBwiEgkR-5JJeWZ72WsWGFksugqu8w9Tmw-N742pJ6TolNjYceXYcaeBMZCwR2aEP6REJxGdUVOw69iO_XPL_n-jZhUV7TDs3bFcKMguG2gTxhWhXBWp8VatZfaqfY23p-29fk4xjxpdyNXiPXoO9Bzk1vtkfN_QhX_I12KrriQO0e4hBLwOdR8-TYSzY")' }}></div>
                        <div className="relative z-10 flex max-w-[960px] flex-col items-center gap-8 text-center animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-philosophy-primary animate-pulse"></span>
                                <span className="text-xs font-medium uppercase tracking-widest text-gray-300">Manifesto 1.0</span>
                            </div>
                            <h1 className="font-display text-5xl font-light leading-[1.1] tracking-[-0.02em] text-white md:text-7xl lg:text-8xl glow-text">
                                The Mentamind <br /> <span className="italic text-gray-200">Philosophy</span>
                            </h1>
                            <p className="max-w-2xl text-lg font-light leading-relaxed text-gray-400 md:text-xl">
                                In a world of constant noise, we built a sanctuary. Where data meets dignity, and science meets silence. This is the future of mental clarity.
                            </p>
                            <div className="pt-8">
                                <span className="material-symbols-outlined text-white/30 text-4xl animate-bounce">keyboard_arrow_down</span>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: Anonymity (Split Layout) */}
                    <section className="relative py-24 md:py-32 px-6 lg:px-20 overflow-hidden" id="anonymity">
                        <div className="mx-auto max-w-6xl w-full">
                            <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
                                {/* Visual */}
                                <div className="w-full lg:w-1/2">
                                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-philosophy-primary/20 to-transparent mix-blend-overlay z-10"></div>
                                        <div className="h-full w-full bg-cover bg-center transition-transform duration-[20s] hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlrumGkdB5QXqiQqyN0atgKLep8LatKHeIoT4BTR6Bbpn8XV5fs6vLacO7wvo1IGoyPr0h0BQZmULs8QCVDvS7JIXbjNxN0jo7mxjfLVnJ_vA0MtYRAySczcsHfOH0z28czuOrbV9_gbSgSmzKJedTqNoqZMVKdNNdhS4WyDysofQdaenuwr1rdUkoUSui45upPNG8VMGlsyTLlJUYNBXZhJbtz6UNdJGg05vwMZE100KDI1RSmwb2gpKMzg-rZH3nflzCpX3iMkM")' }}></div>
                                    </div>
                                </div>
                                {/* Narrative */}
                                <div className="flex flex-col gap-8 lg:w-1/2">
                                    <div className="flex flex-col gap-4">
                                        <h2 className="text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
                                            The Power of <br /> <span className="text-philosophy-primary">Anonymity</span>
                                        </h2>
                                        <div className="h-1 w-20 rounded-full bg-white/10">
                                            <div className="h-full w-10 rounded-full bg-philosophy-primary"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-6 text-lg text-gray-400 font-sans font-light leading-relaxed">
                                        <p>
                                            Identity protection isn't a feature; it is the very foundation of our platform. We believe that true healing begins where judgment ends.
                                        </p>
                                        <p>
                                            By stripping away names, faces, and histories, we allow for a pure interaction between your mind and our therapeutic models. In the absence of identity, there is no room for bias—only understanding.
                                        </p>
                                    </div>
                                    <button className="group mt-4 flex w-fit items-center gap-2 border-b border-philosophy-primary pb-1 text-sm font-bold uppercase tracking-wider text-philosophy-primary hover:text-white hover:border-white transition-all">
                                        <span>Read our Privacy Pledge</span>
                                        <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: AI Philosophy (Feature Grid) */}
                    <section className="relative py-24 px-6 lg:px-20 bg-black/20" id="ai">
                        <div className="mx-auto max-w-6xl w-full">
                            <div className="flex flex-col gap-16">
                                {/* Header */}
                                <div className="flex flex-col gap-4 md:items-center md:text-center">
                                    <h2 className="text-4xl font-light leading-tight text-white md:text-6xl">
                                        Our AI Philosophy
                                    </h2>
                                    <p className="max-w-2xl text-lg text-gray-400 font-light">
                                        Built on three pillars of trust. Our models are trained to listen without retaining, guiding you towards clarity while leaving no footprint behind.
                                    </p>
                                </div>
                                {/* Cards */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    {/* Card 1 */}
                                    <div className="group relative flex flex-col gap-6 overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.05] hover:border-philosophy-primary/30 backdrop-blur-sm">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-philosophy-primary/10 text-philosophy-primary group-hover:bg-philosophy-primary group-hover:text-philosophy-bg transition-colors">
                                            <span className="material-symbols-outlined text-3xl">psychology</span>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <h3 className="text-2xl font-normal text-white">Ethical AI</h3>
                                            <p className="text-gray-400 leading-relaxed font-sans text-sm">
                                                Our intelligence respects human dignity above all. It is programmed to empower, not to profile.
                                            </p>
                                        </div>
                                        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-philosophy-primary/5 blur-3xl group-hover:bg-philosophy-primary/20 transition-all"></div>
                                    </div>
                                    {/* Card 2 */}
                                    <div className="group relative flex flex-col gap-6 overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.05] hover:border-philosophy-primary/30 backdrop-blur-sm">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-philosophy-primary/10 text-philosophy-primary group-hover:bg-philosophy-primary group-hover:text-philosophy-bg transition-colors">
                                            <span className="material-symbols-outlined text-3xl">balance</span>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <h3 className="text-2xl font-normal text-white">Non-judgmental</h3>
                                            <p className="text-gray-400 leading-relaxed font-sans text-sm">
                                                A digital space free from human bias, fatigue, or prejudice. Pure, objective reflection for your thoughts.
                                            </p>
                                        </div>
                                        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-philosophy-primary/5 blur-3xl group-hover:bg-philosophy-primary/20 transition-all"></div>
                                    </div>
                                    {/* Card 3 */}
                                    <div className="group relative flex flex-col gap-6 overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.05] hover:border-philosophy-primary/30 backdrop-blur-sm">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-philosophy-primary/10 text-philosophy-primary group-hover:bg-philosophy-primary group-hover:text-philosophy-bg transition-colors">
                                            <span className="material-symbols-outlined text-3xl">enhanced_encryption</span>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <h3 className="text-2xl font-normal text-white">Zero-Knowledge</h3>
                                            <p className="text-gray-400 leading-relaxed font-sans text-sm">
                                                End-to-end encryption ensures your thoughts remain yours. Even we cannot see what you share.
                                            </p>
                                        </div>
                                        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-philosophy-primary/5 blur-3xl group-hover:bg-philosophy-primary/20 transition-all"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: The Team (The Architects) */}
                    <section className="relative py-24 px-6 lg:px-20" id="team">
                        <div className="mx-auto max-w-6xl w-full">
                            <div className="flex flex-col gap-12">
                                <div className="flex flex-col gap-2">
                                    <span className="text-philosophy-primary font-bold tracking-widest uppercase text-xs">Who we are</span>
                                    <h2 className="text-4xl font-light text-white md:text-5xl">The Architects</h2>
                                </div>
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                    {/* Team Member 1 */}
                                    <div className="flex flex-col gap-4">
                                        <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-white/5 grayscale transition-all duration-500 hover:grayscale-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuApBOJ1CTNPmKr7A9BfFt96IXl9QlgH7vjySbW5DptIHxxXVwRP3fzG2x6Xzz1hxPk9cz1W09J0r-VeQr_PUZMhM7pJBCoHr48r1bFiL4oVANiwKPzQ9-1Mm0Obz6LOi39vJcJMrkvGbzxJ0lqAXf-d7EwF1Xmx2R58fkXGkkv7-sXcgVfZBOPC_YVViWTNvv2JL_pUq1L1XAYOjArqwOXsY_j4HhI4zNvYf-kV1R55KiouPsk-vV2PksqiueLGfM8EBvXw5fOME2E")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-xl font-bold text-white">The Architect</h3>
                                            <p className="text-sm text-philosophy-primary">Founding Partner</p>
                                        </div>
                                    </div>
                                    {/* Team Member 2 */}
                                    <div className="flex flex-col gap-4">
                                        <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-white/5 grayscale transition-all duration-500 hover:grayscale-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBB0oQl8gklvmMxup0FkKjGK7HTNF3CBWyzwkClZ7FrRjqboiImzkEhh9g_6U9mc8gHEACNfHio3iaOHxB5lt0W1crb6FDtmBib2NqZMqO4w0aOQtgnSqizWs05xaysbJiAuw_eolSUBaY0A1N7PxcLIgCSbDD-mBmwUgD1m-U8AcoztqzyxRfpUlxmbpJ-PzsLYU1lESVS0DSEdxeQnCtToVkVJMf8Xa4TTt7suZolt6RDBbM368sIM5_EKH3sTM2naig_4zb8Do4")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-xl font-bold text-white">The Scientist</h3>
                                            <p className="text-sm text-philosophy-primary">Head of AI</p>
                                        </div>
                                    </div>
                                    {/* Team Member 3 */}
                                    <div className="flex flex-col gap-4">
                                        <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-white/5 grayscale transition-all duration-500 hover:grayscale-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCxbiwJ5y9EWySCzJ1iuGjI9MTt4u8T7yBNXK6J642KzV6UpRUk7txeeRVdRnuDQ4SXCulwB7gQHye2Stno0XJGBcRwWKzzrw7zaLmZrGqiygTQVoNQdTUJFCeUZCu9Nnwvud9JIOqDPXSz2qEHdct1IC-uEcJNA4mE4GGns2gQzI1G640vP1Qg59Q2xuGytap8dN7qQFdhKkQdGeX48VtMlvLVoJvviJbFVXs5ONmyifxitKjK451fmwjOIgmi9zYnzaIvCd6mz4Y")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-xl font-bold text-white">The Guardian</h3>
                                            <p className="text-sm text-philosophy-primary">Security Lead</p>
                                        </div>
                                    </div>
                                    {/* Team Member 4 */}
                                    <div className="flex flex-col gap-4">
                                        <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-white/5 grayscale transition-all duration-500 hover:grayscale-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAVh2mmGeoR9ZuBzp6XfnutRXnSJ09FhZEmR_Nek3cgrlIasAl24bAh9HohGkIcSF55UqtoJIa-W4uWSWJvOK-NNHb4-tRHLu57tj7JxW-yLhFTCaIAUGXLQ9k07BUW3qQwTA-X_D1F2XU92n551QlVxz_o5IlpxjbJqCrVXkME1QKRIevcRG643l3g0de-BL1_24nI34nYjzIU4RlXggwfS2_R0lxm31er3hUmum3CJf1iOBg41t1XI6ZtbIqe4hIv3XYlRyyF0Y0")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-xl font-bold text-white">The Visionary</h3>
                                            <p className="text-sm text-philosophy-primary">Creative Director</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FOOTER CTA */}
                    <section className="relative flex flex-col items-center justify-center py-32 px-6 text-center">
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                        <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl">
                            <span className="material-symbols-outlined text-6xl text-philosophy-primary opacity-80">self_improvement</span>
                            <h2 className="text-4xl md:text-5xl font-light text-white">Ready to explore your mind?</h2>
                            <p className="text-lg text-gray-400">Join thousands of others in the silent revolution of self-care.</p>
                            <button className="mt-4 flex h-14 min-w-[200px] cursor-pointer items-center justify-center rounded-full bg-philosophy-primary px-8 text-philosophy-bg text-base font-bold tracking-wide shadow-[0_0_20px_rgba(19,236,164,0.4)] transition-all hover:scale-105 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                                <span className="truncate">Start Your Journey</span>
                            </button>
                        </div>
                    </section>

                    {/* Simple Footer */}
                    <footer className="border-t border-white/5 bg-black py-12 px-6">
                        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
                            <div className="flex items-center gap-2 text-white/50">
                                <span className="material-symbols-outlined text-xl">spa</span>
                                <span className="text-sm font-medium">© 2024 Mentamind Inc.</span>
                            </div>
                            <div className="flex gap-8">
                                <a className="text-sm text-gray-500 hover:text-philosophy-primary" href="#">Privacy Policy</a>
                                <a className="text-sm text-gray-500 hover:text-philosophy-primary" href="#">Terms of Service</a>
                                <a className="text-sm text-gray-500 hover:text-philosophy-primary" href="#">Contact</a>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
}
