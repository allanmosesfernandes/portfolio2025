import React from 'react';
import { formatDate } from '@/app/utils';
import Link from 'next/link';

const BlogsArticles = ({ posts }) => {
    const limitedPosts = posts.slice(0, 3);
    return (
        <div className="mt-20">
            <p className="text-black dark:text-white font-bold flex items-center text-center d-flex justify-center mb-6 text-4xl">
                Blog
            </p>
            {limitedPosts.map((post, index) => {
                return (
                    <div key={index} className="mb-6 border-b-2 border-gray-800 border-dashed">
                        <div className="space-y-2">
                            <p className="text-pantone text-sm">{formatDate(post.date)}</p>
                            <p className="dark:text-white text-black text-3xl font-bold">
                                {post.title}
                            </p>
                            <p className="dark:text-white text-black">{post.summary}</p>
                        </div>
                        <div className="flex gap-2 my-4 flex-wrap justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-sm text-pantone hover:underline hover:text-pantone"
                                >
                                    Read more
                                    <span className="sr-only">about {post.title}</span>
                                </Link>
                                <span className="text-gray-500">&bull;</span>
                                <p className="dark:text-slate-50 text-gray-500">
                                    {post.readingTime} min read
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {post.tags.map((tag, index) => {
                                    return (
                                        <p
                                            key={index}
                                            className="text-xs dark:text-white bg-black text-white font-medium text-md rounded-lg p-2 h-fit shadow dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            {tag}
                                        </p>
                                    );
                                })}{' '}
                            </div>
                        </div>
                    </div>
                );
            })}
            <Link
                href="/blog"
                className="flex justify-center dark:bg-white dark:text-black bg-black text-white font-medium text-md rounded-lg p-2 h-fit w-fit d-flex mx-auto mt-6 mb-20"
            >
                View all articles
            </Link>
        </div>
    );
};

export default BlogsArticles;
