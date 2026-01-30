import React from 'react';
import { formatDate } from '@/app/utils';
import Link from 'next/link';

const ReadWrite = ({ posts }) => {
    const latestPost = posts[0];
    const otherPosts = posts.slice(1, 3);

    return (
        <section className="read-write py-20">
            {/* Header with left border */}
            <div className="mb-12 border-l-4 border-indigo-500 pl-6">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
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
                        className="group relative flex min-h-[200px] flex-col rounded-3xl border border-indigo-300 bg-gradient-to-br from-indigo-100 via-purple-50 to-white p-6 transition-all duration-300 hover:border-indigo-400 dark:border-indigo-500/30 dark:from-indigo-500/20 dark:via-purple-500/10 dark:to-transparent dark:hover:border-indigo-500/50 lg:min-h-[400px] lg:p-8"
                    >
                        <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-purple-300">
                            ★ LATEST POST
                        </span>

                        <h3 className="mb-4 text-3xl font-bold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
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
                                        className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1 text-xs text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/50 dark:text-indigo-300"
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
                            className="group flex min-h-[200px] flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 lg:min-h-0 lg:flex-1"
                        >
                            <div className="mb-3 flex gap-2">
                                {post.tags?.slice(0, 2).map((tag, j) => (
                                    <span
                                        key={j}
                                        className="rounded-lg border border-indigo-300 bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/50 dark:text-indigo-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h4 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
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
                    className="group inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent px-6 py-3 font-medium text-indigo-700 transition-all duration-300 hover:border-indigo-500 hover:from-indigo-500/20 dark:text-indigo-400"
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
