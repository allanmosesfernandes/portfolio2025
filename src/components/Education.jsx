'use client';
import React from 'react';
import Link from 'next/link';
import { educationJSON } from '@/app/utils';
import Image from 'next/image';

const Education = () => {
    return (
        <div className="mt-12">
            <h3 className="text-pantone font-bold text-2xl pt-6">Education & Certifications</h3>
            {educationJSON.map((education) => {
                return (
                    <div className="mt-4 mb-6 flex-col gap-4 group" key={education.id}>
                        <div className="flex">
                            <Image
                                src={education.logo}
                                alt={education.university}
                                width={80}
                                height={80}
                                title={education.course}
                                className="w-[80px] h-[50px] inline object-scale-down mr-4"
                            />
                            <div>
                                <Link href={education.url} target="_blank">
                                    <div className="flex items-center gap-1">
                                        <h4 className="text-black dark:text-white font-bold text-md">
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
                                            className="lucide lucide-chevron-right size-4 transform transition-all duration-300 ease-out sm:opacity-0 group-hover:opacity-100 group-hover:translate-x-1 stroke-black dark:stroke-white"
                                        >
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    </div>
                                    <p className="text-black dark:text-white text-sm">
                                        {education.course}
                                    </p>
                                    <p className="ml-auto text-black dark:text-white text-sm sm:hidden block">
                                        {education.year}
                                    </p>
                                </Link>
                            </div>
                            <div className="ml-auto sm:block hidden">
                                <p className="ml-auto text-black dark:text-white text-md">
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
