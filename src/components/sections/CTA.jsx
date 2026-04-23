const CTA = () => {
    return (
        <section className="bg-yellow relative overflow-hidden">
            {/* Geometric shapes */}
            <div className="absolute right-[-40px] top-[-60px] w-[220px] h-[400px] bg-pink rotate-[14deg] rounded-[20px] pointer-events-none opacity-80" />
            <div className="absolute right-[50px] top-[60px] w-[160px] h-[320px] bg-indigo rotate-[14deg] rounded-[20px] pointer-events-none opacity-80" />

            <div className="relative z-10 px-6 md:px-12 lg:px-16 py-section max-w-[1200px] mx-auto">
                <h2 className="font-display text-display-xl text-ink mb-4">
                    Got a cool idea?<br />
                    Let&apos;s build it<span className="text-pink">.</span>
                </h2>
                <p className="text-ink/60 max-w-md mb-8">
                    I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                </p>
                <div className="flex gap-3 flex-wrap">
                    <a
                        href="mailto:allanmosesfernandes@gmail.com"
                        className="btn-ghost-dark"
                        data-cursor="btn"
                    >
                        Say Hello →
                    </a>
                    <a
                        href="https://www.linkedin.com/in/allanmosesfernandes/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost-dark"
                        data-cursor="btn"
                    >
                        LinkedIn ↗
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTA;
