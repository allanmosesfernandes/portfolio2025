import { projects } from '@/app/utils';
import Image from 'next/image';
import Link from 'next/link';

const gradientColors = [
    'from-indigo/20 via-pink/10 to-transparent',
    'from-yellow/15 via-yellow/5 to-transparent',
    'from-pink/15 via-pink/5 to-transparent',
    'from-indigo/15 via-indigo/5 to-transparent',
];

const ProjectsSection = () => {
    return (
        <section id="projects" className="px-6 md:px-12 lg:px-16 py-section max-w-[1200px] mx-auto">
            <div className="section-label">
                <span className="num">05</span> Selected Work
            </div>

            <div className="flex items-end justify-between mb-10">
                <h2 className="font-display text-display-lg text-paper">
                    Things I&apos;ve <span className="text-yellow">Built.</span>
                </h2>
                <Link
                    href="/projects"
                    className="font-mono text-label-sm text-muted hover:text-yellow transition-colors uppercase tracking-widest hidden md:block"
                >
                    View All →
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((project, i) => (
                    <Link
                        key={i}
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`card group ${i === 0 ? 'md:col-span-2' : ''}`}
                        data-cursor="card"
                    >
                        {/* Gradient header */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[i % gradientColors.length]} opacity-50 pointer-events-none`} />

                        <div className="relative z-10">
                            {i === 0 && (
                                <span className="badge-yellow mb-4">★ Featured</span>
                            )}

                            <h3 className="font-display text-display-md text-paper group-hover:text-yellow transition-colors mb-2">
                                {project.title}
                            </h3>

                            <p className="text-sm text-muted-light mb-4 line-clamp-2 max-w-xl">
                                {project.summary}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tools.map((tech, j) => (
                                    <span key={j} className="tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-6 text-center md:hidden">
                <Link href="/projects" className="btn-ghost">View All Projects →</Link>
            </div>
        </section>
    );
};

export default ProjectsSection;
