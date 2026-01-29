'use client';
import React from 'react';
import Link from 'next/link';
import { educationJSON } from '@/app/utils';
import Image from 'next/image';

const Education = () => {
    return (
        <div className="mt-12">
            <h3 className="pt-6 text-3xl font-bold text-black dark:text-white md:text-4xl lg:text-5xl">
                Education & Certifications
            </h3>
            {educationJSON.map((education) => {
                return (
                    <div className="group mb-6 mt-4 flex-col gap-4" key={education.id}>
                        <div className="flex">
                            <Image
                                src={education.logo}
                                alt={education.university}
                                width={80}
                                height={80}
                                title={education.course}
                                className="mr-4 inline h-[50px] w-[80px] object-scale-down"
                            />
                            <div>
                                <Link href={education.url} target="_blank">
                                    <div className="flex items-center gap-1">
                                        <h4 className="text-md font-bold text-black dark:text-white">
                                            {education.university}
                                        </h4>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-chevron-right size-4 transform stroke-black transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 dark:stroke-white sm:opacity-0"
                                        >
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    </div>
                                    <p className="text-sm text-black dark:text-white">
                                        {education.course}
                                    </p>
                                    <p className="ml-auto block text-sm text-black dark:text-white sm:hidden">
                                        {education.year}
                                    </p>
                                </Link>
                            </div>
                            <div className="ml-auto hidden sm:block">
                                <p className="text-md ml-auto text-black dark:text-white">
                                    {education.year}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Education;
