import React from 'react';
import { skills } from '@/app/utils';

const Skills = () => {
    return (
        <div className="mt-20">
            <h3 className="text-pantone font-bold text-2xl mt-6">Skills</h3>
            <div className="flex gap-4 w-full flex-wrap">
                <p className="text-pretty text-black dark:text-white md:text-lg my-4">
                    Programming languages, frameworks, tools and technologies I&apos;ve had
                    hands-down experience with and while I won&apos;t claim mastery in all,
                    I&apos;ve fearlessly delved into their realm, expanding my skills.
                </p>
                <div className="flex gap-2 flex-wrap justify-center">
                    {skills.map((skill, index) => {
                        return (
                            <p
                                key={index}
                                className="bg-transparent dark:text-white dark:border-white border-black border-[0.5px] font-medium text-md rounded-lg py-2 px-4 h-fit"
                            >
                                {skill}
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Skills;
