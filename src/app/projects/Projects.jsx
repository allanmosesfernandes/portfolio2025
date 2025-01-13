'use client';
import { allProjects } from '../utils';
import Image from 'next/image';
import Link from 'next/link';

export default function Projects() {
    return (
        <>
            <h2 className="text-black</div> dark:text-white font-bold text-3xl flex items-center text-center d-flex justify-center mb-4">
                Check out some of my projects
            </h2>
            <p className="text-black dark:text-white text-center items-center relative">
                Work projects, personal projects, and everything in between – all curated with the
                help of intense shots of espresso{' '}
                <span>
                    <Image
                        width={30}
                        height={30}
                        src="/projects/espressos.png"
                        alt="Coffee"
                        className='inline'
                    ></Image>
                </span>
            </p>
            <ul className="md:ml-0 ml-8 border-l border-dashed border-gray-800 dark:border-gray-800 -z-1">
                {allProjects.map((project, index) => {
                    return (
                        <li key={index} className="flex gap-6 mt-6 mb-8">
                            <div className="flex flex-col gap-2 pl-10 relative border-b border-black dark:border-gray-800 pb-6 w-full">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={50}
                                    height={50}
                                    className="dark:bg-black bg-white rounded-full object-cover absolute -left-[1.5rem] z-10"
                                />
                                <p className="text-gray-500 text-xs">{project.timeline}</p>
                                <h2 className="text-black dark:text-white font-bold">
                                    {project.title}
                                </h2>
                                <p className="text-black dark:text-white text-sm">
                                    {project.description}
                                </p>
                                {project.link !== '' && (
                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        className="mt-auto text-white dark:text-white gap-2 text-sm"
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
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
