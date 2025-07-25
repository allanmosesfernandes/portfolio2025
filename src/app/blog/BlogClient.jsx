// app/blog/BlogClient.js

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { formatDate } from '../utils';
import { backgroundColors } from '@/utils/utils';
import safespace from '@/app/assets/safe-space.jpeg';
import Image from 'next/image';

/**
 * Client Component: Handles interactivity and state.
 * @param {Object} props
 * @param {Array} props.allPostsData - Array of all post objects.
 * @param {Array} props.allTags - Array of all unique tags.
 */
const BlogClient = ({ allPostsData, allTags }) => {
    // State to manage selected tags
    const [selectedTags, setSelectedTags] = useState([]);

    // Function to handle tag clicks
    const handleTagClick = (tag) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tag)
                ? prevSelectedTags.filter((t) => t !== tag)
                : [...prevSelectedTags, tag]
        );
    };

    // Compute filtered posts based on selected tags
    const filteredPosts = useMemo(() => {
        if (selectedTags.length === 0) return allPostsData;
        return allPostsData.filter((post) => selectedTags.some((tag) => post.tags.includes(tag)));
    }, [selectedTags, allPostsData]);

    return (
        <div className="container mx-auto sm:px-4 px-0">
            <h2 className="font-bold text-pantone sm:text-5xl text-3xl flex items-center justify-center">
                Blog
            </h2>
            <Image
                src={safespace}
                alt="Safe Space"
                className="rounded-xl w-full h-auto mt-4 rounded-lg dark:border-0 border-2 border-[#646cff] p-2"
            />
            <p className="sm:mt-8 mt-4 justify-center text-center">
                Incessant yapping about frontend, tech, hacks and life's nuances manifested in its
                textual form.
            </p>
            {/* Display All Tags */}
            <div className="mt-4">
                <h3 className="text-2xl font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                            <button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                aria-pressed={isSelected}
                                className={`uppercase flex items-center text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full transition border border-black dark:border-white ${
                                    isSelected ? 'border-red' : ''
                                }`}
                            >
                                <span>{tag}</span>
                                {isSelected && (
                                    <span className="ml-2 text-red-500 font-bold">&times;</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Active Filters and Clear All Button */}
            {selectedTags.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-xl font-semibold mb-2">Active Filters:</h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center bg-pantone text-white px-3 py-1 rounded-full"
                            >
                                {tag}
                                <button
                                    onClick={() => handleTagClick(tag)}
                                    className="ml-2 text-lg leading-none"
                                    aria-label={`Remove filter ${tag}`}
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                    <button
                        onClick={() => setSelectedTags([])}
                        className="mt-4 bg-red-400 text-sm text-white px-4 py-2 rounded-full transition"
                    >
                        Clear all filters
                    </button>
                </div>
            )}

            <h3 className="text-2xl font-semibold sm:mt-8 mt-4">Articles</h3>
            {filteredPosts.length === 0 ? (
                <p className="mt-4 text-center text-gray-500">
                    No articles found for the selected tags.
                </p>
            ) : (
                <ul className="mt-4">
                    {filteredPosts.map(
                        ({ id, title, date, tags, slug, summary, readingTime }, index) => (
                            <Link href={`/blog/${slug}`} key={id}>
                                <div
                                    className={`text-white bg-variant-${index % 10} blog-li p-4 mb-6 rounded text-black article-block`}
                                >
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-3xl font-bold article-link inline-block relative w-fit">
                                            {title}
                                        </h3>
                                        <p className="">{formatDate(date)}</p>
                                    </div>
                                    <p className="my-4">{summary}</p>
                                    <div className="flex sm:flex-row flex-col gap-2 sm:items-center justify-between mt-4">
                                        <div className="flex flex-wrap gap-2">
                                            {tags &&
                                                tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="uppercase text-xs font-medium text-md rounded-2xl py-2 px-4 h-fit shadow  border border-white cursor-pointer"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    )}
                </ul>
            )}
        </div>
    );
};

export default BlogClient;
