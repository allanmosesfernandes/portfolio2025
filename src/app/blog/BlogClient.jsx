// app/blog/BlogClient.js

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { formatDate } from '../utils';
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
        // To show posts that contain **any** of the selected tags, use 'some'
        return allPostsData.filter((post) => selectedTags.some((tag) => post.tags.includes(tag)));
        // To show posts that contain **all** of the selected tags, use 'every'
        // return allPostsData.filter((post) =>
        //     selectedTags.every((tag) => post.tags.includes(tag))
        // );
    }, [selectedTags, allPostsData]);

    return (
        <div className="container mx-auto px-4">
            <h2 className="font-bold text-pantone sm:text-5xl text-3xl flex items-center justify-center">
                Blog
            </h2>
            <p className="mt-8 justify-center text-center">
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
                                className={`flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition ${
                                    isSelected ? 'border-2 border-pantone' : ''
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
                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}

            <h3 className="text-2xl font-semibold mt-8">Articles</h3>
            {filteredPosts.length === 0 ? (
                <p className="mt-4 text-center text-gray-500">
                    No articles found for the selected tags.
                </p>
            ) : (
                <ul className="mt-4">
                    {filteredPosts.map(({ id, title, date, tags, slug, summary }) => (
                        <li
                            key={id}
                            className="blog-li shadow-md p-4 shadow-pantone hover:shadow-indigo-500/40 mb-6 rounded"
                        >
                            <div className="flex justify-between">
                                <h3 className="font-bold text-xl">{title}</h3>
                                <p className="text-pantone">{formatDate(date)}</p>
                            </div>
                            <p className="my-6">{summary}</p>
                            <div className="flex gap-2 items-center justify-between mt-4">
                                <div className="flex gap-2 items-center">
                                    <Link href={`/blog/${slug}`}>
                                        <span className="text-pantone font-bold text-md flex items-center">
                                            Read more
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#FF5A26"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-chevron-right size-4 transform transition-all duration-300 ease-out ml-1"
                                            >
                                                <path d="m9 18 6-6-6-6"></path>
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {tags &&
                                        tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="dark:bg-white dark:text-black bg-black text-white font-medium text-md rounded-lg px-2 py-1 mr-2"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BlogClient;
