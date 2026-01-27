'use client';

import { useState } from 'react';
import TipTapEditor from './components/TipTapEditor';

export default function AdminPage() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [summary, setSummary] = useState('');
    const [tags, setTags] = useState('');
    const [readingTime, setReadingTime] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title,
            slug,
            summary,
            tags: tags.split(',').map((tag) => tag.trim()),
            readingTime,
            content,
            image: imageUrl,
            date: new Date().toISOString(),
        };

        console.log('Post data:', postData);

        // TODO: Save to database
        alert('Post preview logged to console. Database integration coming next!');
    };

    const generateSlug = () => {
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        setSlug(slug);
    };

    return (
        <div className="min-h-screen bg-gray-950 p-8 text-white">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-8 text-4xl font-bold">Create New Blog Post</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter post title"
                            required
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">Slug (URL)</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="my-blog-post"
                                required
                            />
                            <button
                                type="button"
                                onClick={generateSlug}
                                className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
                            >
                                Generate from Title
                            </button>
                        </div>
                        <p className="mt-1 text-sm text-gray-400">
                            URL will be: /blog/{slug || 'your-slug'}
                        </p>
                    </div>

                    {/* Summary */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">Summary</label>
                        <textarea
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Brief description of the post"
                            rows="3"
                            required
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="AI, Technology, Tutorial"
                        />
                    </div>

                    {/* Reading Time & Image */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Reading Time (minutes)
                            </label>
                            <input
                                type="number"
                                value={readingTime}
                                onChange={(e) => setReadingTime(e.target.value)}
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="5"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Featured Image URL
                            </label>
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="/blog-images/my-image.png"
                            />
                        </div>
                    </div>

                    {/* Content Editor */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">Content</label>
                        <TipTapEditor content={content} onChange={setContent} />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="rounded-lg bg-green-600 px-6 py-3 font-medium hover:bg-green-700"
                        >
                            Publish Post
                        </button>
                        <button
                            type="button"
                            className="rounded-lg bg-gray-700 px-6 py-3 font-medium hover:bg-gray-600"
                        >
                            Save as Draft
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                console.log('Content HTML:', content);
                                alert('Content logged to console');
                            }}
                            className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700"
                        >
                            Preview HTML
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
