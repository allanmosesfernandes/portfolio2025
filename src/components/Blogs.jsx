import React from 'react';
import { formatDate } from '@/app/utils';
import Link from 'next/link';
import { backgroundColors } from '@/utils/utils';

const BlogsArticles = ({ posts }) => {
    const limitedPosts = posts.slice(0, 3);
    return (
        <div className="mt-20">
            <p className="d-flex mb-6 flex items-center justify-center text-center text-4xl font-bold text-pantone">
                Blog
            </p>
            {limitedPosts.map((post, index) => {
                return (
                    <Link href={`/blog/${post.slug}`} key={index}>
                        <div
                            key={index}
                            className={`bg-variant-${index % 10} article-block mb-8 cursor-pointer p-4`}
                        >
                            <div className="space-y-4">
                                <p className="article-link relative inline-block text-3xl font-bold text-white">
                                    {post.title}
                                </p>
                                <p className="mt-2 text-sm font-thin text-white">
                                    {formatDate(post.date)}
                                </p>
                                <p className="text-white">{post.summary}</p>
                            </div>
                            <div className="my-4 flex flex-wrap items-center justify-between gap-2">
                                <div className="flex gap-2">
                                    {post.tags.map((tag, index) => {
                                        return (
                                            <p
                                                key={index}
                                                className="text-md h-fit cursor-pointer rounded-2xl border border-white px-4 py-2 text-xs font-medium uppercase text-white shadow"
                                            >
                                                {tag}
                                            </p>
                                        );
                                    })}{' '}
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
            <Link
                href="/blog"
                className="text-md group relative mx-auto mb-10 mt-6 flex h-fit w-fit justify-center overflow-hidden rounded-full bg-black px-4 py-2 font-medium text-white transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
                <span className="relative block transition-transform duration-300 ease-out group-hover:-translate-y-[120%]">
                    View all articles
                </span>
                <span className="absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-300 ease-out group-hover:translate-y-0">
                    View all articles
                </span>
            </Link>
        </div>
    );
};

export default BlogsArticles;
