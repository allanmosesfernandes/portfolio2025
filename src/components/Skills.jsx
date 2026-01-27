'use client';
import React from 'react';
import { skills } from '@/app/utils';

const Skills = () => {
    const skillsRow1 = skills.slice(0, Math.ceil(skills.length / 2));
    const skillsRow2 = skills.slice(Math.ceil(skills.length / 2));
    
    return (
        <section className="skills-marquee py-20 overflow-hidden marquee-container">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-black dark:text-white">
                Tech Stack
            </h3>
            
            {/* Marquee Row 1 - Forward */}
            <div className="marquee-track overflow-hidden mb-4">
                <div className="flex gap-4 w-max animate-marquee-forward">
                    {[...skillsRow1, ...skillsRow1].map((skill, i) => (
                        <span 
                            key={i}
                            className="px-7 py-4 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 rounded-full text-base text-purple-300 font-medium whitespace-nowrap"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
            
            {/* Marquee Row 2 - Reverse */}
            <div className="marquee-track overflow-hidden">
                <div className="flex gap-4 w-max animate-marquee-reverse">
                    {[...skillsRow2, ...skillsRow2].map((skill, i) => (
                        <span 
                            key={i}
                            className="px-7 py-4 bg-white/3 dark:bg-white/3 border border-white/8 dark:border-white/8 rounded-full text-base text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
            
            <p className="text-xs text-gray-500 text-center mt-8 opacity-60">
                ↔ Auto-scrolling • Hover to pause
            </p>
        </section>
    );
};

export default Skills;
