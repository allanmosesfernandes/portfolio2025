'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { formatDate } from '../utils';

const tagColorMap = {
    code: 'border-indigo/40 text-indigo bg-indigo/[0.06]',
    life: 'border-pink/40 text-pink bg-pink/[0.06]',
    tools: 'border-yellow/30 text-yellow-dark bg-yellow/[0.05]',
};

const getTagColor = (tag) => {
    const lower = tag.toLowerCase();
    return tagColorMap[lower] || 'border-ink-faint text-muted-light';
};

const BlogClient = ({ allPostsData, allTags }) => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredPosts = useMemo(() => {
        if (activeFilter === 'all') return allPostsData;
        return allPostsData.filter((post) =>
            post.tags?.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase())
        );
    }, [activeFilter, allPostsData]);

    const featured = filteredPosts[0];
    const recentPosts = filteredPosts.slice(1, 5);
    const olderPosts = filteredPosts.slice(5);

    return (
        <div>
            {/* Hero */}
            <section className="px-6 md:px-12 py-16 md:py-20 border-b border-ink-mid relative overflow-hidden">
                <div className="absolute right-[-20px] top-[-20px] font-display text-[clamp(12rem,22vw,18rem)] text-ink-soft leading-none pointer-events-none select-none tracking-tight">
                    BLOG
                </div>
                <div className="max-w-[1040px] mx-auto relative z-10">
                    <div className="flex items-center gap-2 font-mono text-label-xs uppercase tracking-widest text-muted-light mb-5 animate-fade-up">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow animate-pulse-dot"></span>
                        Words from the void
                    </div>
                    <h1 className="font-display text-[clamp(4rem,8vw,7rem)] leading-[0.92] tracking-[0.01em] mb-6 animate-fade-up animate-delay-100">
                        I also<br />write<br />
                        <em className="not-italic bg-yellow text-ink px-3">sometimes</em>
                    </h1>
                    <p className="text-muted-light max-w-[480px] leading-relaxed mb-9 animate-fade-up animate-delay-200">
                        Incessant yapping about code, tech, hacks and life&apos;s nuances — manifested in textual form.
                    </p>
                    <div className="flex gap-10 animate-fade-up animate-delay-300">
                        <div>
                            <p className="font-display text-[2.2rem] text-paper leading-none">{String(allPostsData.length).padStart(2, '0')}</p>
                            <p className="font-mono text-label-xs uppercase tracking-widest text-muted mt-1">Articles</p>
                        </div>
                        <div>
                            <p className="font-display text-[2.2rem] text-paper leading-none">{allTags.length}</p>
                            <p className="font-mono text-label-xs uppercase tracking-widest text-muted mt-1">Topics</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="px-6 md:px-12 py-5 border-b border-ink-mid">
                <div className="max-w-[1040px] mx-auto flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-label-xs uppercase tracking-widest text-muted mr-1">Filter:</span>
                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`font-mono text-label-sm font-bold tracking-wide uppercase px-3.5 py-1.5 rounded-badge border transition-all cursor-pointer ${
                            activeFilter === 'all'
                                ? 'bg-yellow text-ink border-yellow'
                                : 'border-ink-faint text-muted-light hover:border-paper hover:text-paper'
                        }`}
                    >
                        All
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveFilter(tag)}
                            className={`font-mono text-label-sm font-bold tracking-wide uppercase px-3.5 py-1.5 rounded-badge border transition-all cursor-pointer ${
                                activeFilter.toLowerCase() === tag.toLowerCase()
                                    ? 'bg-yellow text-ink border-yellow'
                                    : 'border-ink-faint text-muted-light hover:border-paper hover:text-paper'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                    <span className="ml-auto font-mono text-label-xs text-muted">
                        {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Main content */}
            <main className="max-w-[1040px] mx-auto px-6 md:px-12 py-14">
                {/* Featured post */}
                {featured && (
                    <>
                        <div className="flex items-center gap-3 font-mono text-label-xs uppercase tracking-widest text-muted mb-7">
                            <span className="text-yellow">★</span> Latest Post
                            <span className="flex-1 h-px bg-ink-mid"></span>
                        </div>

                        <Link
                            href={`/blog/${featured.slug}`}
                            className="block bg-yellow rounded-card-lg overflow-hidden mb-14 shadow-hard-md hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-hard-xl transition-all duration-300 group"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="p-8 md:p-12 flex flex-col justify-between">
                                    <div>
                                        <span className="inline-flex items-center gap-2 bg-ink text-yellow font-mono text-label-sm font-bold tracking-wide uppercase px-3 py-1 rounded-badge mb-6">
                                            ★ Latest
                                        </span>
                                        <h2 className="font-display text-[clamp(2rem,3.5vw,2.8rem)] leading-none tracking-[0.01em] text-ink mb-4">
                                            {featured.title}
                                        </h2>
                                        <p className="text-sm text-ink/60 leading-relaxed max-w-[340px]">
                                            {featured.summary || 'Click to read more...'}
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="font-mono text-label-xs text-ink/50">{formatDate(featured.date)}</span>
                                            {featured.readingTime && (
                                                <span className="font-mono text-label-xs text-ink/50">{featured.readingTime} min read</span>
                                            )}
                                        </div>
                                        <span className="inline-flex items-center gap-2 bg-ink text-yellow font-bold text-sm px-5 py-3 rounded-btn group-hover:gap-3.5 transition-all">
                                            Read Article <span>→</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-ink relative overflow-hidden min-h-[320px] hidden md:flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_30px,rgba(245,200,0,0.04)_30px,rgba(245,200,0,0.04)_31px)]" />
                                    <div className="relative z-10 bg-[#0a0a0a] border border-ink-mid rounded-[10px] p-6 mx-8 w-[calc(100%-64px)] font-mono text-label-sm leading-relaxed text-muted">
                                        <div><span className="text-ink-faint mr-4 select-none">1</span><span className="text-[#444] italic">// {new Date().getFullYear()}</span></div>
                                        <div><span className="text-ink-faint mr-4 select-none">2</span><span className="text-indigo">const</span> joy = <span className="text-yellow">&quot;writing code&quot;</span>;</div>
                                        <div><span className="text-ink-faint mr-4 select-none">3</span><span className="text-indigo">const</span> ai = <span className="text-yellow">&quot;writing it for me&quot;</span>;</div>
                                        <div><span className="text-ink-faint mr-4 select-none">4</span></div>
                                        <div><span className="text-ink-faint mr-4 select-none">5</span>console.log(joy === ai); <span className="text-[#444] italic">// false</span></div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </>
                )}

                {/* Recent articles grid */}
                {recentPosts.length > 0 && (
                    <>
                        <div className="flex items-center gap-3 font-mono text-label-xs uppercase tracking-widest text-muted mb-7">
                            <span className="text-yellow">01</span> Recent Articles
                            <span className="flex-1 h-px bg-ink-mid"></span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
                            {recentPosts.map((post, i) => (
                                <Link
                                    key={post.id || i}
                                    href={`/blog/${post.slug}`}
                                    className={`card group ${i === 0 ? 'md:col-span-2' : ''}`}
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex gap-1.5 flex-wrap">
                                                {post.tags?.slice(0, 2).map((tag, j) => (
                                                    <span key={j} className={`font-mono text-label-xs uppercase tracking-wide px-2 py-0.5 rounded-[3px] border ${getTagColor(tag)}`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-ink-faint group-hover:text-yellow group-hover:translate-x-[3px] group-hover:-translate-y-[3px] transition-all">↗</span>
                                        </div>
                                        <h3 className="font-display text-[1.5rem] tracking-[0.02em] leading-tight text-paper group-hover:text-yellow transition-colors mb-2.5">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-muted-light leading-relaxed mb-5 line-clamp-2">
                                            {post.summary || ''}
                                        </p>
                                        <div className="flex items-center gap-3.5 pt-4 border-t border-ink-mid">
                                            <span className="font-mono text-label-xs text-muted">{formatDate(post.date)}</span>
                                            {post.readingTime && (
                                                <span className="font-mono text-label-xs text-muted before:content-['·'] before:mr-3.5">{post.readingTime} min read</span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {/* Older posts list */}
                {olderPosts.length > 0 && (
                    <>
                        <div className="flex items-center gap-3 font-mono text-label-xs uppercase tracking-widest text-muted mb-7">
                            <span className="text-yellow">02</span> More Articles
                            <span className="flex-1 h-px bg-ink-mid"></span>
                        </div>

                        <div className="flex flex-col">
                            {olderPosts.map((post, i) => (
                                <Link
                                    key={post.id || i}
                                    href={`/blog/${post.slug}`}
                                    className="grid grid-cols-[80px_1fr_auto] items-center gap-6 py-4.5 border-b border-ink-mid first:border-t hover:bg-ink-soft px-2 -mx-2 transition-colors group"
                                >
                                    <span className="font-display text-[1.8rem] text-ink-faint leading-none group-hover:text-yellow transition-colors">
                                        {String(i + recentPosts.length + 2).padStart(2, '0')}
                                    </span>
                                    <div>
                                        <p className="font-sans font-bold text-paper group-hover:text-yellow transition-colors mb-1">{post.title}</p>
                                        <p className="text-sm text-muted line-clamp-1">{post.summary || ''}</p>
                                    </div>
                                    <div className="text-right hidden md:block">
                                        <p className="font-mono text-label-xs text-muted whitespace-nowrap">{formatDate(post.date)}</p>
                                        <div className="flex gap-1 justify-end mt-1.5">
                                            {post.tags?.slice(0, 2).map((tag, j) => (
                                                <span key={j} className="font-mono text-[0.55rem] uppercase tracking-wide px-1.5 py-0.5 rounded-[3px] border border-ink-faint text-muted">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {filteredPosts.length === 0 && (
                    <p className="text-center text-muted py-20">No articles found for this filter.</p>
                )}
            </main>
        </div>
    );
};

export default BlogClient;
