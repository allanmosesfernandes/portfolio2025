import React from 'react'
import { skills } from '@/app/utils';

const Skills = () => {
    return (
        <div>
            <h3 className="text-black dark:text-white font-bold text-2xl mt-6">Skills</h3>
            <div className="flex gap-4 w-full flex-wrap my-4">
                <p className="text-pretty text-black dark:text-white md:text-lg">
                    Programming languages, frameworks, tools and technologies I've had hands-down
                    experience with and while I won't claim mastery in all, I've fearlessly
                    delved into their realm, expanding my skills.
                </p>
                {skills.map((skill, index) => {
                    return (
                        <p
                            key={index}
                            className="dark:bg-white dark:text-black bg-black text-white font-medium text-md rounded-lg p-2 h-fit"
                        >
                            {skill}
                        </p>
                    );
                })}
            </div>
        </div>
    );
}

export default Skills