import React from 'react';
import { formatDate } from '@/app/utils';
import Link from 'next/link';

const reading = [
    { title: 'Atomic Habits', author: 'James Clear', type: 'Book' },
    { title: 'bytes.dev', author: 'Weekly Newsletter', type: 'Newsletter' },
    { title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', type: 'Book' },
];

const ReadWrite = ({ posts }) => {
    const limitedPosts = posts.slice(0, 3);
    
    return (
        <section className="read-write py-20">
            <div className="read-write__header mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-3 text-black dark:text-white">
                    I also read and write
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 max-w-[500px]">
                    Continuous learning and sharing knowledge are core to my growth as an engineer.
                </p>
            </div>
            
            <div className="read-write__grid grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* What I Read */}
                <div className="read-write__column read-write__column--read bg-gradient-to-b from-green-500/8 to-transparent rounded-3xl p-8 border border-green-500/15">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">📚</span>
                        <div>
                            <h3 className="text-2xl font-semibold text-black dark:text-white">What I Read</h3>
                            <p className="text-sm text-green-500">Books, newsletters, resources</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        {reading.map((item, i) => (
                            <div 
                                key={i} 
                                className="flex items-center gap-4 p-4 bg-white/3 dark:bg-white/3 rounded-xl border border-white/5"
                            >
                                <div className="w-12 h-16 bg-green-500/15 rounded-lg flex-shrink-0" />
                                <div className="flex-1">
                                    <h4 className="text-base font-medium text-black dark:text-white mb-1">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {item.author}
                                    </p>
                                </div>
                                <span className="px-3 py-1 bg-green-500/15 rounded-xl text-xs text-green-500">
                                    {item.type}
                                </span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-green-500/10 rounded-xl text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Currently reading <span className="text-green-500 font-semibold">3 books</span> this quarter
                        </p>
                    </div>
                </div>
                
                {/* What I Write */}
                <div className="read-write__column read-write__column--write bg-gradient-to-b from-orange-500/8 to-transparent rounded-3xl p-8 border border-orange-500/15">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">✍️</span>
                        <div>
                            <h3 className="text-2xl font-semibold text-black dark:text-white">What I Write</h3>
                            <p className="text-sm text-orange-500">Blog articles & tutorials</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        {limitedPosts.map((post, i) => (
                            <Link 
                                key={i}
                                href={`/blog/${post.slug}`}
                                className="block p-5 bg-white/3 dark:bg-white/3 rounded-xl border border-white/5 hover:bg-white/5 dark:hover:bg-white/5 transition-all duration-200"
                            >
                                <div className="flex gap-2 mb-2">
                                    {post.tags?.slice(0, 2).map((tag, j) => (
                                        <span 
                                            key={j}
                                            className="px-2 py-0.5 bg-orange-500/15 rounded-lg text-xs text-orange-500"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h4 className="text-base font-medium text-black dark:text-white mb-1">
                                    {post.title}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {formatDate(post.date)}
                                </p>
                            </Link>
                        ))}
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="text-orange-500 font-semibold">{posts.length}</span> articles published
                        </span>
                        <Link 
                            href="/blog"
                            className="text-sm text-orange-500 hover:underline"
                        >
                            View all →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReadWrite;
