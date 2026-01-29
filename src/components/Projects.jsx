'use client';
import { projects } from '@/app/utils';
import Image from 'next/image';
import Link from 'next/link';
import HorizontalScroll from './HorizontalScroll';

const Projects = () => {
    return (
        <section id="projects" className="pt-8">
            <HorizontalScroll title="Selected Work">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} featured={index === 0} />
                ))}
            </HorizontalScroll>

            <div className="mt-8 flex justify-center">
                <Link
                    role="button"
                    href="/projects"
                    className="text-md group relative mx-auto flex h-fit w-fit justify-center overflow-hidden rounded-full bg-black px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                    <span className="relative block transition-transform duration-300 ease-out group-hover:-translate-y-[150%]">
                        View all projects
                    </span>
                    <span className="absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-300 ease-out group-hover:translate-y-0">
                        View all projects
                    </span>
                </Link>
            </div>
        </section>
    );
};

function ProjectCard({ title, date, summary, image, tools, website, featured }) {
    return (
        <Link
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className={`project-card flex snap-start flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                featured
                    ? 'h-[320px] min-w-[300px] border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent md:h-[420px] md:min-w-[480px]'
                    : 'bg-white/2 dark:bg-white/2 border-white/6 dark:border-white/6 h-[320px] min-w-[300px] md:h-[420px] md:min-w-[320px]'
            }`}
        >
            {featured && (
                <span className="mb-4 inline-block w-fit rounded-full bg-indigo-500/30 px-3 py-1 text-xs text-purple-300">
                    ★ FEATURED
                </span>
            )}

            <div className="dark:bg-white/3 mb-5 flex-1 overflow-hidden rounded-xl bg-white/5">
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={250}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="mt-auto">
                <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">{title}</h3>
                <p className="mb-4 line-clamp-2 text-sm text-gray-700 dark:text-gray-300">
                    {summary}
                </p>

                <div className="flex flex-wrap gap-2">
                    {tools.map((tech, i) => (
                        <span
                            key={i}
                            className="bg-white/8 dark:bg-white/8 rounded-xl px-3 py-1 text-xs text-gray-600 dark:text-gray-400"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}

export default Projects;
