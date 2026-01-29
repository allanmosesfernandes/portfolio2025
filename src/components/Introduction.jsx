'use client';
import headshot2 from '@/app/assets/profile-2.jpg';
import Image from 'next/image';
import Link from 'next/link';

const Introduction = () => {
    return (
        <section className="hero relative flex min-h-[90vh] flex-col justify-center overflow-hidden py-12 lg:py-16">
            {/* Background gradient accent */}
            <div className="bg-gradient-radial pointer-events-none absolute right-[-10%] top-[-50%] h-[600px] w-[600px] from-indigo-500/15 via-transparent to-transparent" />

            <div className="hero__content flex flex-col-reverse items-center gap-16 lg:flex-row">
                {/* Left side: Text content - 60% */}
                <div className="hero__text max-w-full text-center lg:w-[60%] lg:text-left">
                    <h1 className="mb-6 bg-gradient-to-br from-black to-indigo-400 bg-clip-text text-5xl font-extrabold leading-[1.05] text-transparent dark:from-white sm:text-6xl md:text-7xl lg:text-8xl">
                        Software
                        <br />
                        Engineer
                    </h1>

                    <p className="mx-auto mb-8 max-w-[500px] text-lg leading-relaxed text-gray-600 dark:text-gray-400 lg:mx-0">
                        Building cool things on the internet while caring deeply about accessibility
                        and user experience.
                    </p>

                    <div className="hero__cta flex flex-wrap justify-center gap-3 lg:justify-start">
                        <a
                            href="#projects"
                            className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30"
                        >
                            View Projects
                        </a>
                        <Link
                            href="/blog"
                            className="rounded-full border border-gray-200 bg-white/5 px-6 py-3 text-sm text-gray-700 transition-all duration-300 hover:bg-white/10 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
                        >
                            Read Blog
                        </Link>
                    </div>
                </div>

                {/* Right side: Avatar - 40% */}
                <div className="hero__avatar-wrapper relative flex lg:w-[40%] lg:justify-start">
                    <Image
                        src={headshot2}
                        alt="Allan Fernandes"
                        width={280}
                        height={280}
                        className="hero__avatar rounded-full border-2 border-white/10 object-cover"
                    />
                </div>
            </div>
            {/* About Section */}
            <div className="mt-20">
                <h3 className="mb-4 text-3xl font-bold text-black dark:text-white md:text-4xl lg:text-5xl">
                    About
                </h3>
                <p className="text-pretty text-base leading-relaxed text-black dark:text-white md:text-lg">
                    I've been a software engineer for around five years, often being a victim to the
                    shiny object syndrome, getting my hands dirty writing serverless APIs, and
                    racking up infinite debt by leaving stuff running on AWS.
                    <br />
                    <br /> With a master's degree in Computer Science, I am currently working as a
                    software engineer at{' '}
                    <a
                        href="https://equityrelease.royallondon.com/adviser"
                        target="_blank"
                        className="hover-links"
                    >
                        Royal London Equity Release
                    </a>
                    , where I work as part of an agile team focused on building{' '}
                    <a
                        href="https://equityrelease.royallondon.com/adviser/broker-portal"
                        target="_blank"
                        className="hover-links"
                    >
                        bespoke financial applications
                    </a>{' '}
                    to transform the equity release space. <br />
                    <br />
                </p>
                <p className="text-pretty text-base leading-relaxed text-black dark:text-white md:text-lg">
                    When I&apos;m not breaking things on the internet, I'm busy&nbsp;
                    <Link
                        href="tekkers"
                        aria-label="Allan fernandes tekkers"
                        title="Goalzo mate"
                        className="hover-links"
                    >
                        playing football,
                    </Link>
                    &nbsp;
                    <a
                        href="https://www.strava.com/athletes/112155710"
                        target="_blank"
                        aria-label="Allan fernandes strava account"
                        title="Strava account"
                        className="hover-links"
                    >
                        running,
                    </a>
                    &nbsp;or&nbsp;
                    <Link
                        href="/blog"
                        aria-label="Link to blog articles"
                        title="Blog articles"
                        className="hover-links"
                    >
                        writing blog articles.
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Introduction;
