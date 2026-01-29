import React from 'react';
import { formatDate } from '@/app/utils';
import Link from 'next/link';

const ReadWrite = ({ posts }) => {
    const latestPost = posts[0];
    const otherPosts = posts.slice(1, 3);

    return (
        <section className="read-write py-20">
            {/* Header with left border */}
            <div className="mb-12 border-l-4 border-orange-500 pl-6">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
                    BLOG
                </p>
                <h2 className="mb-2 text-4xl font-bold text-white dark:text-white md:text-5xl lg:text-6xl">
                    I write about code,
                </h2>
                <h2 className="text-4xl font-bold text-orange-500 md:text-5xl lg:text-6xl">
                    tools & life
                </h2>
            </div>

            {/* Blog Cards Grid */}
            <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Featured Post - Left Large Card */}
                {latestPost && (
                    <Link
                        href={`/blog/${latestPost.slug}`}
                        className="group relative flex min-h-[400px] flex-col rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-900/40 to-orange-950/20 p-8 transition-all duration-300 hover:border-orange-500/40"
                    >
                        <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-orange-500/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-500">
                            ★ LATEST POST
                        </span>

                        <h3 className="mb-4 text-3xl font-bold text-white transition-colors group-hover:text-orange-400">
                            {latestPost.title}
                        </h3>

                        <p className="mb-6 line-clamp-2 text-gray-400">
                            {latestPost.description || 'Click to read more...'}
                        </p>

                        <div className="mt-auto flex items-center justify-between">
                            <div className="flex gap-2">
                                {latestPost.tags?.slice(0, 2).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="rounded-lg border border-orange-500/30 bg-orange-950/50 px-3 py-1 text-xs text-orange-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <span>{formatDate(latestPost.date)}</span>
                                {latestPost.readTime && <span>• {latestPost.readTime}</span>}
                            </div>
                        </div>
                    </Link>
                )}

                {/* Other Posts - Right Side Cards */}
                <div className="flex flex-col gap-6">
                    {otherPosts.map((post, i) => (
                        <Link
                            key={i}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-1 flex-col rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-900/40 to-orange-950/20 p-6 transition-all duration-300 hover:border-orange-500/40"
                        >
                            <div className="mb-3 flex gap-2">
                                {post.tags?.slice(0, 2).map((tag, j) => (
                                    <span
                                        key={j}
                                        className="rounded-lg border border-orange-500/30 bg-orange-950/50 px-2.5 py-0.5 text-xs font-medium text-orange-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h4 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-orange-400">
                                {post.title}
                            </h4>

                            <p className="mb-2 line-clamp-2 text-sm text-gray-400">
                                {post.description || 'Click to read more...'}
                            </p>

                            <p className="mt-auto text-sm text-gray-500">{formatDate(post.date)}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Stats and CTA */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-orange-500">{posts.length}</span>
                        <span className="text-gray-400">articles</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-white">2025</span>
                        <span className="text-gray-400">writing since</span>
                    </div>
                </div>

                <Link
                    href="/blog"
                    className="flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30"
                >
                    View all articles
                    <span>→</span>
                </Link>
            </div>
        </section>
    );
};

export default ReadWrite;
