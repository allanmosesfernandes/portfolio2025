'use client';
import { allProjects } from '../utils';
import Image from 'next/image';
import Link from 'next/link';

export default function Projects() {
    return (
        <div className="max-w-[1040px] mx-auto px-6 md:px-12 py-16">
            {/* Hero */}
            <div className="mb-12">
                <div className="section-label">
                    <span className="num">★</span> All Projects
                </div>
                <h1 className="font-display text-display-xl text-paper mb-4">
                    Things I&apos;ve <span className="text-yellow">Built.</span>
                </h1>
                <p className="text-muted-light max-w-lg">
                    Work projects, personal projects, and everything in between — all curated with intense shots of espresso.
                </p>
            </div>

            {/* Project list */}
            <div className="flex flex-col">
                {allProjects.map((project, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr_auto] items-start gap-4 md:gap-6 py-6 border-b border-ink-mid group"
                    >
                        {/* Number */}
                        <span className="font-display text-[2rem] text-ink-faint leading-none group-hover:text-yellow transition-colors">
                            {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Content */}
                        <div>
                            <p className="font-mono text-label-xs text-muted uppercase tracking-widest mb-1">
                                {project.timeline}
                            </p>
                            <h2 className="font-display text-display-md text-paper group-hover:text-yellow transition-colors mb-2">
                                {project.title}
                            </h2>
                            <p className="text-sm text-muted-light leading-relaxed mb-3">
                                {project.description}
                            </p>
                            {project.link && project.link !== '' && (
                                <Link
                                    href={project.link}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 font-mono text-label-sm text-yellow hover:text-yellow-light transition-colors uppercase tracking-widest"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                                        <path d="M2 12h20"></path>
                                    </svg>
                                    Website
                                </Link>
                            )}
                        </div>

                        {/* Image */}
                        <div className="hidden md:block w-[80px] h-[60px] rounded-card overflow-hidden bg-ink-soft border border-ink-mid">
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={80}
                                height={60}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
