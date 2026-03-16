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
                    className="group inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent px-6 py-3 font-medium text-indigo-700 transition-all duration-300 hover:border-indigo-500 hover:from-indigo-500/20 dark:text-indigo-400"
                >
                    <span>View all projects</span>
                    <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
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
                    ? 'h-[320px] min-w-[300px] border-indigo-300 bg-gradient-to-br from-indigo-100 via-purple-50 to-white dark:border-indigo-500/30 dark:from-indigo-500/20 dark:via-purple-500/10 dark:to-transparent md:h-[420px] md:min-w-[480px]'
                    : 'h-[320px] min-w-[300px] border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5 md:h-[420px] md:min-w-[320px]'
            }`}
        >
            {featured && (
                <span className="mb-4 inline-block w-fit rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-700 dark:bg-indigo-500/30 dark:text-purple-300">
                    ★ FEATURED
                </span>
            )}

            <div className="mb-5 flex-1 overflow-hidden rounded-xl bg-gray-200 dark:bg-white/5">
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
                            className="rounded-xl bg-gray-200 px-3 py-1 text-xs text-gray-700 dark:bg-white/10 dark:text-gray-400"
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
