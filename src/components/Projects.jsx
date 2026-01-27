'use client';
import { projects } from '@/app/utils';
import Image from 'next/image';
import Link from 'next/link';
import HorizontalScroll from './HorizontalScroll';

const Projects = () => {
    return (
        <section id="projects" className="pt-12">
            <HorizontalScroll title="Selected Work">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} featured={index === 0} />
                ))}
            </HorizontalScroll>
            
            <div className="flex justify-center mt-8">
                <Link
                    role="button"
                    href="/projects"
                    className="text-md group relative mx-auto flex h-fit justify-center overflow-hidden rounded-full bg-black px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 w-fit"
                >
                    <span className="relative block transition-transform duration-300 ease-out group-hover:-translate-y-[120%]">
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
            className={`project-card rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 flex flex-col snap-start ${
                featured 
                    ? 'min-w-[480px] h-[420px] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent border-indigo-500/30' 
                    : 'min-w-[320px] h-[420px] bg-white/2 dark:bg-white/2 border-white/6 dark:border-white/6'
            }`}
        >
            {featured && (
                <span className="inline-block px-3 py-1 bg-indigo-500/30 rounded-full text-xs text-purple-300 mb-4 w-fit">
                    ★ FEATURED
                </span>
            )}
            
            <div className="flex-1 rounded-xl overflow-hidden mb-5 bg-white/5 dark:bg-white/3">
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={250}
                    className="w-full h-full object-cover"
                />
            </div>
            
            <div className="mt-auto">
                <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                    {title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                    {summary}
                </p>
                
                <div className="flex flex-wrap gap-2">
                    {tools.map((tech, i) => (
                        <span 
                            key={i} 
                            className="px-3 py-1 bg-white/8 dark:bg-white/8 rounded-xl text-xs text-gray-600 dark:text-gray-400"
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
