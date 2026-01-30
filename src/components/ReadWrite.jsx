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
                <h2 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    I also write sometimes,
                </h2>
            </div>

            {/* Blog Cards Grid */}
            <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Featured Post - Left Large Card */}
                {latestPost && (
                    <Link
                        href={`/blog/${latestPost.slug}`}
                        className="group relative flex min-h-[200px] flex-col rounded-3xl border border-orange-300 bg-gradient-to-br from-orange-100 to-orange-50 p-6 transition-all duration-300 hover:border-orange-400 dark:border-orange-500/20 dark:from-orange-900/40 dark:to-orange-950/20 dark:hover:border-orange-500/40 lg:min-h-[400px] lg:p-8"
                    >
                        <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-orange-500/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-500">
                            ★ LATEST POST
                        </span>

                        <h3 className="mb-4 text-3xl font-bold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                            {latestPost.title}
                        </h3>

                        <p className="mb-6 line-clamp-2 text-gray-600 dark:text-gray-400">
                            {latestPost.summary || 'Click to read more...'}
                        </p>

                        <div className="mt-auto flex items-center justify-between">
                            <div className="flex gap-2">
                                {latestPost.tags?.slice(0, 2).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="rounded-lg border border-orange-400/50 bg-orange-100 px-3 py-1 text-xs text-orange-700 dark:border-orange-500/30 dark:bg-orange-950/50 dark:text-orange-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <span>{formatDate(latestPost.date)}</span>
                                {latestPost.readingTime && <span>• {latestPost.readingTime} min</span>}
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
                            className="group flex min-h-[200px] flex-col rounded-2xl border border-orange-300 bg-gradient-to-br from-orange-100 to-orange-50 p-6 transition-all duration-300 hover:border-orange-400 dark:border-orange-500/20 dark:from-orange-900/40 dark:to-orange-950/20 dark:hover:border-orange-500/40 lg:min-h-0 lg:flex-1"
                        >
                            <div className="mb-3 flex gap-2">
                                {post.tags?.slice(0, 2).map((tag, j) => (
                                    <span
                                        key={j}
                                        className="rounded-lg border border-orange-400/50 bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:border-orange-500/30 dark:bg-orange-950/50 dark:text-orange-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h4 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                                {post.title}
                            </h4>

                            <p className="mb-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                {post.summary || 'Click to read more...'}
                            </p>

                            <p className="mt-auto text-sm text-gray-500">{formatDate(post.date)}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* View All Button */}
            <div className="flex justify-center">
                <Link
                    href="/blog"
                    className="group inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-6 py-3 font-medium text-orange-400 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/20"
                >
                    <span>View all articles</span>
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

export default ReadWrite;
