import { projects } from '@/app/utils';
import Image from 'next/image';
import Link from 'next/link';

const Projects = () => {
    return (
        <div>
            <p className="text-md d-flex mx-auto mb-6 mt-20 h-fit w-fit rounded-full bg-black px-4 py-2 font-medium text-white dark:bg-white dark:text-black">
                My Projects
            </p>
            <h2 className="d-flex flex items-center justify-center text-center text-3xl font-bold text-pantone">
                Check out my latest work
            </h2>
            <p className="my-4 text-pretty text-center text-black dark:text-white md:text-lg">
                I've worked on a range of projects, from simple websites to complex web
                applications. Here are a few of my finest.
            </p>
            <div className="mb-4 grid gap-6 md:grid-cols-2">
                {projects.map((project, index) => {
                    return (
                        <div
                            key={index}
                            className="bg-card dark:bg-card-dark flex h-[100%] flex-col items-center gap-4 rounded-xl rounded-t-md shadow-lg dark:bg-white dark:text-black"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={500}
                                height={50}
                                className="h-[200px] rounded-t-md object-cover"
                            />
                            <div className="flex h-[100%] flex-col p-4">
                                <h3 className="mt-1 text-base font-semibold tracking-tight">
                                    {project.title}
                                </h3>
                                <p className="text-sm">{project.date}</p>
                                <p className="my-2 flex min-h-[140px] items-center text-sm">
                                    {project.summary}
                                </p>
                                <div className="my-4 flex flex-wrap gap-2">
                                    {project.tools.map((tool, index) => {
                                        return (
                                            <p
                                                key={index}
                                                className="text-md h-fit rounded-2xl bg-black px-4 py-2 text-xs font-medium text-white shadow dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                            >
                                                {tool}
                                            </p>
                                        );
                                    })}{' '}
                                </div>
                                <Link
                                    href={project.website}
                                    target="_blank"
                                    className="mt-auto gap-2 text-sm text-white dark:text-white"
                                >
                                    <p
                                        key={index}
                                        className="text-md d-flex h-fit w-fit rounded-2xl bg-black p-2 text-xs font-medium text-white shadow dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        <span className="flex items-center gap-2">
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
            </div>
            <Link
                role="button"
                href="/projects"
                className="text-md group relative mx-auto mb-10 mt-6 flex h-fit justify-center overflow-hidden rounded-full bg-black px-4 py-2 font-medium text-white transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 w-fit"
            >
                <span className="relative block transition-transform duration-300 ease-out group-hover:-translate-y-[120%]">
                    View all projects
                </span>
                <span className="absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-300 ease-out group-hover:translate-y-0">
                    View all projects
                </span>
            </Link>
        </div>
    );
};

export default Projects;
