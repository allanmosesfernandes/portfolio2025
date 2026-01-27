'use client';
import { useState, useEffect } from 'react';
import headshot2 from '@/app/assets/profile-2.jpg';
import Image from 'next/image';
import Link from 'next/link';

const Introduction = () => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prev) => (prev === 0 ? 1 : 0));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero relative min-h-[90vh] flex flex-col justify-center py-20 overflow-hidden">
            {/* Background gradient accent */}
            <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-gradient-radial from-indigo-500/15 via-transparent to-transparent pointer-events-none" />
            
            <div className="hero__content flex justify-between items-center gap-16 flex-col-reverse lg:flex-row">
                {/* Left side: Text content */}
                <div className="hero__text max-w-full lg:max-w-[60%] text-center lg:text-left">
                    <div className="hero__badge inline-flex items-center gap-2 bg-indigo-500/15 px-4 py-2 rounded-full mb-6">
                        <span className="text-2xl font-bold text-indigo-400">{counter}</span>
                        <span className="text-gray-500">→</span>
                        <span className="text-2xl font-bold text-indigo-400">{counter === 0 ? 1 : 0}</span>
                        <span className="text-sm text-gray-400">builder</span>
                    </div>
                    
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] mb-6 bg-gradient-to-br from-black dark:from-white to-indigo-400 bg-clip-text text-transparent">
                        Software<br />Engineer
                    </h1>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-[500px] mx-auto lg:mx-0">
                        Building cool things on the internet while caring deeply about accessibility and user experience.
                    </p>
                    
                    <div className="hero__cta flex gap-3 justify-center lg:justify-start flex-wrap">
                        <a 
                            href="#projects" 
                            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
                        >
                            View Projects
                        </a>
                        <Link 
                            href="/blog" 
                            className="px-6 py-3 bg-white/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-white/10 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300"
                        >
                            Read Blog
                        </Link>
                    </div>
                </div>
                
                {/* Right side: Avatar */}
                <div className="hero__avatar-wrapper relative">
                    <Image
                        src={headshot2}
                        alt="Allan Fernandes"
                        width={280}
                        height={280}
                        className="hero__avatar rounded-full object-cover border-2 border-white/10"
                    />
                    <div className="hero__status absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-full text-xs text-green-500 border border-green-500/30 whitespace-nowrap">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                        Available for work
                    </div>
                </div>
            </div>
            
            {/* Company logos */}
            <div className="hero__companies mt-16 pt-8 border-t border-gray-200 dark:border-white/5">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                    Currently at Royal London • Previously
                </p>
                <div className="hero__companies-logos flex gap-8 items-center flex-wrap">
                    <div className="px-5 py-2 bg-white/5 dark:bg-white/3 rounded-lg text-sm text-gray-600 dark:text-gray-500">
                        Royal London
                    </div>
                    <div className="px-5 py-2 bg-white/5 dark:bg-white/3 rounded-lg text-sm text-gray-600 dark:text-gray-500">
                        Nottingham Trent SU
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="mt-20">
                <h3 className="text-2xl font-bold text-pantone mb-4">About</h3>
                <p className="text-pretty text-black dark:text-white text-base md:text-lg leading-relaxed">
                    I've been a software engineer for around five years, often being a victim to the shiny object syndrome, getting my hands dirty writing serverless APIs, and racking up infinite debt by leaving stuff running on AWS.
                    <br />
                    <br /> With a master's degree in Computer Science, I am currently working as a software
                    engineer at{' '}
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
                <p className="text-pretty text-black dark:text-white text-base md:text-lg leading-relaxed">
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
