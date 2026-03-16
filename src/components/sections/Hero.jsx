'use client';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="min-h-[calc(100vh-68px)] bg-yellow grid grid-cols-1 md:grid-cols-[3fr_2fr] overflow-hidden relative">
            {/* Geometric shapes */}
            <div className="absolute right-[-60px] top-[-80px] w-[280px] h-[500px] bg-pink rotate-[14deg] rounded-[20px] pointer-events-none hidden md:block" />
            <div className="absolute right-[60px] top-[80px] w-[200px] h-[400px] bg-indigo rotate-[14deg] rounded-[20px] pointer-events-none hidden md:block" />

            {/* Left column */}
            <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 relative z-10">
                <h1 className="font-display text-display-2xl text-ink animate-fade-up animate-delay-100">
                    Allan<br />
                    <span className="inline-block bg-ink text-yellow px-2">Moses</span><br />
                    Fernandes<span className="text-pink">.</span>
                </h1>

                <p className="text-ink/70 text-base max-w-[340px] mt-5 leading-relaxed animate-fade-up animate-delay-200">
                    Software Engineer building cool things on the internet while caring deeply about accessibility and user experience.
                </p>

                <div className="flex gap-3 mt-8 flex-wrap animate-fade-up animate-delay-300">
                    <a href="#projects" className="inline-flex items-center gap-2 bg-ink text-yellow font-sans font-semibold text-sm px-6 py-3 rounded-btn border-2 border-ink shadow-hard-sm hover:-translate-y-0.5 transition-all" data-cursor="btn">
                        View Projects →
                    </a>
                    <Link href="/blog" className="inline-flex items-center gap-2 bg-transparent text-ink font-sans font-semibold text-sm px-6 py-3 rounded-btn border-2 border-ink hover:bg-ink hover:text-yellow transition-all" data-cursor="btn">
                        Read Blog
                    </Link>
                </div>

                <a href="#about" className="mt-12 flex items-center gap-2 text-ink/40 hover:text-ink/70 transition-colors animate-fade-up animate-delay-400">
                    <span className="font-mono text-label-xs uppercase tracking-widest">Scroll</span>
                    <span className="text-lg">↓</span>
                </a>
            </div>

            {/* Right column */}
            <div className="relative hidden md:flex items-center justify-center">
                <div className="relative z-10 w-[380px] h-[380px] flex items-center justify-center">
                    <Image
                        src="/photo.png"
                        alt="Allan Fernandes"
                        width={380}
                        height={380}
                        className="object-contain w-full h-full drop-shadow-2xl"
                        priority
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
