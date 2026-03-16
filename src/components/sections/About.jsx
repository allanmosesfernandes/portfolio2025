import Link from 'next/link';

const stats = [
    { value: '5+', label: 'Years Experience', color: 'bg-yellow', textColor: 'text-ink' },
    { value: '50M+', label: 'Customers Worldwide', color: 'bg-pink', textColor: 'text-ink' },
    { value: '∞', label: 'Shots of Espresso', color: 'bg-indigo', textColor: 'text-paper' },
];

const About = () => {
    return (
        <section id="about" className="px-6 md:px-12 lg:px-16 py-section max-w-[1200px] mx-auto scroll-mt-[68px]">
            <div className="section-label">
                <span className="num">01</span> About Me
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left - text */}
                <div>
                    <h2 className="font-display text-display-lg text-paper mb-6">
                        Building things<br />on the <span className="text-yellow">internet.</span>
                    </h2>
                    <p className="text-muted-light leading-relaxed mb-4">
                        I&apos;ve been a software engineer for around five years, often being a victim to the
                        shiny object syndrome, getting my hands dirty writing serverless APIs, and
                        racking up infinite debt by leaving stuff running on AWS.
                    </p>
                    <p className="text-muted-light leading-relaxed mb-4">
                        With a master&apos;s degree in Computer Science, I currently work as a
                        software engineer at{' '}
                        <a href="https://www.printerpix.co.uk/" target="_blank" className="text-yellow border-b border-yellow/30 hover:border-yellow">
                            PrinterPix
                        </a>
                        , a global ecommerce platform where millions of customers turn their favourite
                        photos into personalised products. I help build and scale the{' '}
                        <a href="https://www.printerpix.co.uk/" target="_blank" className="text-yellow border-b border-yellow/30 hover:border-yellow">
                            storefront and customisation experiences
                        </a>
                        {' '}that power the platform.
                    </p>
                    <p className="text-muted-light leading-relaxed">
                        When I&apos;m not breaking things on the internet, I&apos;m busy{' '}
                        <a href="/tekkers" target="_blank" rel="noopener noreferrer" className="text-yellow border-b border-yellow/30 hover:border-yellow">playing football</a>,{' '}
                        <a href="https://www.strava.com/athletes/112155710" target="_blank" className="text-yellow border-b border-yellow/30 hover:border-yellow">running</a>, or{' '}
                        <Link href="/blog" className="text-yellow border-b border-yellow/30 hover:border-yellow">writing blog articles</Link>.
                    </p>
                </div>

                {/* Right - stat cards */}
                <div className="flex flex-col gap-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className={`${stat.color} ${stat.textColor} rounded-card p-6 relative overflow-hidden`}
                            data-cursor="card"
                        >
                            <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-current opacity-[0.08]" />
                            <p className="font-display text-display-lg relative z-10">{stat.value}</p>
                            <p className="font-mono text-label-sm uppercase tracking-widest opacity-70 relative z-10">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
