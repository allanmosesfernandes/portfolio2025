'use client';
import Link from 'next/link';
import Image from 'next/image';

const CornerFlourish = () => (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4 50 Q4 4 50 4"
            stroke="var(--r-ink-3)"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
        />
        <path
            d="M10 44 Q10 10 44 10"
            stroke="var(--r-ink-3)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
        />
        <path
            d="M4 50 C4 30 12 16 28 8"
            stroke="var(--r-ink-3)"
            strokeWidth="0.7"
            fill="none"
            opacity="0.35"
        />
        <circle cx="4" cy="50" r="2.5" fill="var(--r-ink-3)" opacity="0.35" />
    </svg>
);

const Hero = () => {
    return (
        <section className="renaissance-hero">
            {/* Top bar */}
            <header className="renaissance-topbar">
                <div className="monogram">AF</div>
                <span className="brand-text">
                    Allan Fernandes — <span className="est"></span>
                </span>

                <ul className="renaissance-topbar-nav">
                    <li><a href="#">Home</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>

                {/* <span className="light-indicator">Light</span> */}
            </header>

            {/* Main grid */}
            <div className="renaissance-grid">
                {/* Left column — copy */}
                <div>
                    {/* Eyebrow */}
                    <div className="renaissance-eyebrow renaissance-fade-up">
                        <span className="rule" />
                    </div>

                    {/* H1 */}
                    <h1 className="renaissance-h1 renaissance-fade-up renaissance-fade-up-delay-1">
                        Software<br />
                        <em>Engineer</em>
                    </h1>

                    {/* Sub-copy */}
                    <p className="renaissance-sub renaissance-fade-up renaissance-fade-up-delay-2">
                        Building cool things on the internet while caring deeply about{' '}
                        <strong>accessibility</strong> and <strong>user experience</strong>.
                        Currently working as a software engineer at{' '}
                        <a href="https://printerpix.co.uk/" target="_blank" rel="noopener noreferrer">
                            Printerpix
                        </a>
                    </p>

                    {/* CTAs */}
                    <div className="flex gap-4 flex-wrap renaissance-fade-up renaissance-fade-up-delay-3 renaissance-cta-row">
                        <a className="seal-btn" href="#projects">
                            {/* <span className="seal" /> */}
                            <span>View Projects</span>
                            <span className="arrow">&rarr;</span>
                        </a>
                        <Link className="seal-btn ghost" href="/blog">
                            {/* <span className="seal" /> */}
                            <span>Read the Blog</span>
                            <span className="arrow">&rarr;</span>
                        </Link>
                    </div>
                </div>

                {/* Right column — portrait */}
                <div className="renaissance-portrait-wrapper renaissance-fade-in">
                    <div className="renaissance-portrait-float">
                        {/* Circular image */}
                        <div className="renaissance-portrait-image">
                            <Image
                                src="/vitruvian.png"
                                alt="Vitruvian-style illustration of Allan Fernandes"
                                width={600}
                                height={600}
                                priority
                            />
                        </div>

                        {/* Double ink ring SVG */}
                        <svg className="renaissance-ring" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="300" cy="300" r="292" stroke="var(--r-ink)" strokeWidth="1" opacity="0.55" />
                            <circle cx="300" cy="300" r="285" stroke="var(--r-ink)" strokeWidth="0.5" opacity="0.4" />
                        </svg>

                        {/* Corner flourishes */}
                        <div className="renaissance-flourish renaissance-flourish--tl"><CornerFlourish /></div>
                        <div className="renaissance-flourish renaissance-flourish--tr"><CornerFlourish /></div>
                        <div className="renaissance-flourish renaissance-flourish--bl"><CornerFlourish /></div>
                        <div className="renaissance-flourish renaissance-flourish--br"><CornerFlourish /></div>
                    </div>
                </div>
            </div>

            {/* Bottom marginalia */}
            <div className="renaissance-marginalia renaissance-marginalia--left">
                <em>&sect; I.</em> Homo faber, qui aedificat in rete.
            </div>
            <div className="renaissance-marginalia renaissance-marginalia--right">
                <em>Notanda:</em> accessibilitas prima.
            </div>

            {/* Scroll cue */}
            <div className="renaissance-scroll-cue">
                <span>Scroll &middot; continua</span>
                <div className="pulse-line" />
            </div>
        </section>
    );
};

export default Hero;
