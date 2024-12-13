import React from 'react'
import { projects } from '@/app/utils';
import Image from 'next/image';

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
            <div className='grid grid-cols-2 gap-6'>
                {
                    projects.map((project, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col gap-4 rounded-xl bg-card dark:bg-card-dark dark:bg-white dark:text-black"
                            >
                                <Image
                                    src={project.image}
                                    alt={project.company}
                                    width={500}
                                    height={50}
                                    className="object-cover h-[200px] rounded-lg"
                                />
                                <div className="p-4">
                                    <h3 class="font-semibold tracking-tight mt-1 text-base">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm">{project.date}</p>
                                    <p className='text-sm my-2'>{project.summary}</p>
                                    <div className="flex gap-2 my-4">
                                        {project.tools.map((tool, index) => {
                                            return (
                                                <p
                                                    key={index}
                                                    className="text-xs dark:bg-black dark:text-white bg-white text-black font-medium text-md rounded-lg p-2 h-fit"
                                                >
                                                    {tool}
                                                </p>
                                            );
                                        })}{' '}
                                    </div>
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