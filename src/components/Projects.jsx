import React from 'react'
import { projects } from '@/app/utils';
import Image from 'next/image';
import Link from 'next/link';

const Projects = () => {
    return (
        <div>
            <p className="dark:bg-white dark:text-black bg-black text-white font-medium text-md rounded-lg p-2 h-fit w-fit d-flex mx-auto mt-20 mb-6">
                My Projects
            </p>
            <h2 className="text-black dark:text-white font-bold text-3xl flex items-center text-center d-flex justify-center">
                Check out my latest work
            </h2>
            <p className="text-pretty text-black dark:text-white md:text-lg my-4 text-center">
                I've worked on a variety of projects, from simple websites to complex web applications. Here are few of my finest.
            </p>
            <div className='grid grid-cols-2 gap-6 mb-6'>
                {
                    projects.map((project, index) => {
                        return (
                            <div
                                key={index}
                                className="items-center gap-4 rounded-xl bg-card dark:bg-card-dark dark:bg-white dark:text-black shadow-lg h-[100%] flex flex-col"
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={500}
                                    height={50}
                                    className="object-cover h-[200px]"
                                />
                                <div className="p-4 flex flex-col h-[100%]">
                                    <h3 className="font-semibold tracking-tight mt-1 text-base">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm">{project.date}</p>
                                    <p className="text-sm my-2">{project.summary}</p>
                                    <div className="flex gap-2 my-4 flex-wrap ]">
                                        {project.tools.map((tool, index) => {
                                            return (
                                                <p
                                                    key={index}
                                                    className="text-xs dark:text-white bg-black text-white font-medium text-md rounded-lg p-2 h-fit shadow dark:bg-gray-800 dark:border-gray-700"
                                                >
                                                    {tool}
                                                </p>
                                            );
                                        })}{' '}
                                    </div>
                                    <Link
                                        href={project.website}
                                        target="_blank"
                                        className="mt-auto text-white dark:text-white hover:underline gap-2 text-sm"
                                    >
                                        <p
                                            key={index}
                                            className="text-xs dark:text-white bg-black text-white font-medium text-md w-fit rounded-lg p-2 h-fit shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 d-flex"
                                        >
                                            <span className='flex gap-2 items-center'>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="lucide lucide-globe size-3"
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
                    })
                }
            </div>
        </div>
    );
}

export default Projects