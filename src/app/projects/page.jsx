'use client';
import { allProjects } from '../utils';
import Image from 'next/image';
import Link from 'next/link';

export default function Projects() {
    return (
        <>
            <h2 className="text-black dark:text-white font-bold text-3xl flex items-center text-center d-flex justify-center mb-8">
                Check out all of my projects
            </h2>
            {allProjects.map((project, index) => {
                return (
                    <div key={index} className="flex gap-6 mt-6 mb-8">
                        <div className="w-[100px]">
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={50}
                                height={50}
                                className="rounded-full object-cover"
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className="text-gray-500 text-xs">{project.timeline}</p>
                            <h2 className="text-black dark:text-white font-bold">
                                {project.title}
                            </h2>
                            <p className="text-black dark:text-white text-sm">{project.description}</p>
                            <Link
                                href={project.link}
                                target="_blank"
                                className="mt-auto text-white dark:text-white hover:underline gap-2 text-sm"
                            >
                                <p
                                    key={index}
                                    className="text-xs dark:text-white bg-black text-white font-medium text-md w-fit rounded-lg p-2 h-fit shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 d-flex mt-2"
                                >
                                    <span className="flex gap-2 items-center">
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
                                            className="lucide lucide-globe size-3"
                                        >
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                                            <path d="M2 12h20"></path>
                                        </svg>
                                        Website
                                    </span>
                                </p>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
