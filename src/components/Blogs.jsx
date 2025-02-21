import React from 'react';
import { formatDate } from '@/app/utils';
import Link from 'next/link';
const backgroundColors = ['#F3EF97', '#FAF3E5', '#69B88E'];
const BlogsArticles = ({ posts }) => {
    const limitedPosts = posts.slice(0, 3);
    return (
        <div className="mt-20">
            <p className="text-pantone font-bold flex items-center text-center d-flex justify-center mb-6 text-4xl">
                Blog
            </p>
            {limitedPosts.map((post, index) => {
                return (
                    <Link href={`/blog/${post.slug}`} key={index}>
                        <div
                            key={index}
                            style={{ backgroundColor: backgroundColors[index] }}
                            className="mb-8 p-4 article-block cursor-pointer"
                        >
                            <div className="space-y-4">
                                <Link
                                    className="text-black text-3xl font-bold article-link inline-block relative"
                                    href={`/blog/${post.slug}`}
                                >
                                    {post.title}
                                </Link>
                                <p className="font-thin text-sm mt-2">{formatDate(post.date)}</p>
                                <p className="text-black">{post.summary}</p>
                            </div>
                            <div className="flex gap-2 my-4 flex-wrap justify-between items-center">
                                <div className="flex gap-2">
                                    {post.tags.map((tag, index) => {
                                        return (
                                            <p
                                                key={index}
                                                className="uppercase text-xs text-black font-medium text-md rounded-2xl py-2 px-4 h-fit shadow  border border-black cursor-pointer"
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
                className="flex justify-center dark:bg-white dark:text-black bg-black text-white font-medium text-md rounded-lg p-2 h-fit w-fit d-flex mx-auto mt-6 mb-20"
            >
                View all articles
            </Link>
        </div>
    );
};

export default BlogsArticles;
