'use client';
import React from 'react';
import { skills } from '@/app/utils';

const Skills = () => {
    const skillsRow1 = skills.slice(0, Math.ceil(skills.length / 2));
    const skillsRow2 = skills.slice(Math.ceil(skills.length / 2));

    return (
        <section className="skills-marquee marquee-container overflow-hidden py-12">
            <h3 className="mb-8 text-3xl font-bold text-black dark:text-white md:text-4xl lg:text-5xl">
                Tech Stack
            </h3>

            {/* Marquee Row 1 - Forward */}
            <div className="marquee-track mb-4 overflow-hidden">
                <div className="animate-marquee-forward flex w-max gap-4">
                    {[...skillsRow1, ...skillsRow1].map((skill, i) => (
                        <span
                            key={i}
                            className="whitespace-nowrap rounded-full border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent px-7 py-4 text-base font-medium text-purple-300"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Marquee Row 2 - Reverse */}
            <div className="marquee-track overflow-hidden">
                <div className="animate-marquee-reverse flex w-max gap-4">
                    {[...skillsRow2, ...skillsRow2].map((skill, i) => (
                        <span
                            key={i}
                            className="bg-white/3 dark:bg-white/3 border-white/8 dark:border-white/8 whitespace-nowrap rounded-full border px-7 py-4 text-base font-medium text-gray-600 dark:text-gray-400"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <p className="mt-8 text-center text-xs text-gray-500 opacity-60">
                ↔ Auto-scrolling • Hover to pause
            </p>
        </section>
    );
};

export default Skills;
