'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TipTapEditor from './components/TipTapEditor';
import ImageUpload from './components/ImageUpload';
import PostList from './components/PostList';
import WeeklyMusingList from './components/WeeklyMusingList';
import { FaKey, FaSpinner, FaPlus, FaTimes, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

function getCurrentWeekAndYear() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    return { week: weekNumber, year: now.getFullYear() };
}

export default function AdminPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-gray-950">
                <FaSpinner className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        }>
            <AdminPageContent />
        </Suspense>
    );
}

function AdminPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const editSlug = searchParams.get('edit');
    const editYear = searchParams.get('year');
    const editWeek = searchParams.get('week');
    const tabParam = searchParams.get('tab');

    const [token, setToken] = useState('');
    const [showTokenInput, setShowTokenInput] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [activeTab, setActiveTab] = useState(tabParam || 'blog');

    // Blog form state
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [summary, setSummary] = useState('');
    const [tags, setTags] = useState('');
    const [readingTime, setReadingTime] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [originalSlug, setOriginalSlug] = useState('');

    // Weekly musing form state
    const [weekNumber, setWeekNumber] = useState('');
    const [year, setYear] = useState('');
    const [musingContent, setMusingContent] = useState('');
    const [originalWeek, setOriginalWeek] = useState(null);
    const [originalYear, setOriginalYear] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('adminToken');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        if (editSlug && token) {
            setActiveTab('blog');
            loadPost(editSlug);
        }
    }, [editSlug, token]);

    useEffect(() => {
        if (editYear && editWeek && token) {
            setActiveTab('weekly');
            loadMusing(editYear, editWeek);
        }
    }, [editYear, editWeek, token]);

    // Auto-prefill week/year for new musings
    useEffect(() => {
        if (activeTab === 'weekly' && !isEditing && !weekNumber && !year) {
            const current = getCurrentWeekAndYear();
            setWeekNumber(current.week.toString());
            setYear(current.year.toString());
        }
    }, [activeTab, isEditing, weekNumber, year]);

    const saveToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('adminToken', newToken);
        setShowTokenInput(false);
        setMessage({ type: 'success', text: 'Token saved!' });
        setTimeout(() => setMessage(null), 3000);
    };

    const loadPost = async (slug) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/posts/${slug}?drafts=true`);
            if (!response.ok) throw new Error('Post not found');

            const post = await response.json();
            setTitle(post.title);
            setSlug(post.slug);
            setOriginalSlug(post.slug);
            setSummary(post.summary);
            setTags(post.tags?.join(', ') || '');
            setReadingTime(post.readingTime?.toString() || '');
            setContent(post.content);
            setImageUrl(post.image || '');
            setIsEditing(true);
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const loadMusing = async (year, week) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/weekly/${year}/${week}?drafts=true`);
            if (!response.ok) throw new Error('Musing not found');

            const musing = await response.json();
            setWeekNumber(musing.weekNumber.toString());
            setYear(musing.year.toString());
            setOriginalWeek(musing.weekNumber);
            setOriginalYear(musing.year);
            setMusingContent(musing.content);
            setIsEditing(true);
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        // Reset blog form
        setTitle('');
        setSlug('');
        setOriginalSlug('');
        setSummary('');
        setTags('');
        setReadingTime('');
        setContent('');
        setImageUrl('');

        // Reset weekly musing form
        const current = getCurrentWeekAndYear();
        setWeekNumber(current.week.toString());
        setYear(current.year.toString());
        setOriginalWeek(null);
        setOriginalYear(null);
        setMusingContent('');

        setIsEditing(false);
        router.push(`/admin?tab=${activeTab}`);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        resetForm();
        router.push(`/admin?tab=${tab}`);
    };

    const handleBlogSubmit = async (e, status = 'draft') => {
        e.preventDefault();

        if (!token) {
            setMessage({ type: 'error', text: 'Please set admin token first' });
            return;
        }

        setLoading(true);
        setMessage(null);

        const postData = {
            title,
            slug,
            summary,
            tags: tags
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean),
            readingTime: parseInt(readingTime) || 5,
            content,
            image: imageUrl,
            status,
        };

        if (isEditing && slug !== originalSlug) {
            postData.newSlug = slug;
        }

        try {
            const url = isEditing ? `/api/posts/${originalSlug}` : '/api/posts';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to save post');
            }

            setMessage({
                type: 'success',
                text: isEditing
                    ? 'Post updated successfully!'
                    : status === 'published'
                      ? 'Post published successfully!'
                      : 'Draft saved successfully!',
            });

            resetForm();
            setRefreshKey((k) => k + 1);
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setLoading(false);
        }
    };

    const handleMusingSubmit = async (e, status = 'draft') => {
        e.preventDefault();

        if (!token) {
            setMessage({ type: 'error', text: 'Please set admin token first' });
            return;
        }

        setLoading(true);
        setMessage(null);

        const musingData = {
            weekNumber: parseInt(weekNumber),
            year: parseInt(year),
            content: musingContent,
            status,
        };

        try {
            let url, method;
            if (isEditing) {
                url = `/api/weekly/${originalYear}/${originalWeek}`;
                method = 'PUT';
                if (parseInt(weekNumber) !== originalWeek) {
                    musingData.newWeekNumber = parseInt(weekNumber);
                }
                if (parseInt(year) !== originalYear) {
                    musingData.newYear = parseInt(year);
                }
            } else {
                url = '/api/weekly';
                method = 'POST';
            }

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(musingData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to save musing');
            }

            setMessage({
                type: 'success',
                text: isEditing
                    ? 'Musing updated successfully!'
                    : status === 'published'
                      ? 'Musing published successfully!'
                      : 'Draft saved successfully!',
            });

            resetForm();
            setRefreshKey((k) => k + 1);
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setLoading(false);
        }
    };

    const handleEditPost = (slug) => {
        router.push(`/admin?tab=blog&edit=${slug}`);
    };

    const handleEditMusing = (year, weekNumber) => {
        router.push(`/admin?tab=weekly&year=${year}&week=${weekNumber}`);
    };

    const generateSlug = () => {
        const newSlug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        setSlug(newSlug);
    };

    return (
        <div className="min-h-screen bg-gray-950 px-4 py-6 pb-24 text-white sm:p-8 sm:pb-24">
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="rounded-lg bg-gray-800 p-2 hover:bg-gray-700"
                            title="Back to Home"
                        >
                            <FaArrowLeft />
                        </Link>
                        <h1 className="text-3xl font-bold sm:text-4xl">Admin</h1>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                        {token ? (
                            <div className="flex items-center gap-2 text-green-400">
                                <FaKey />
                                <span className="text-sm">Authenticated</span>
                            </div>
                        ) : null}
                        <button
                            onClick={() => setShowTokenInput(!showTokenInput)}
                            className="rounded-lg bg-gray-800 px-3 py-2 text-sm hover:bg-gray-700 sm:px-4"
                        >
                            {token ? 'Change Token' : 'Set Token'}
                        </button>
                    </div>
                </div>

                {showTokenInput && (
                    <div className="mb-6 rounded-lg border border-gray-700 bg-gray-800 p-4">
                        <label className="mb-2 block text-sm font-medium">Admin Token</label>
                        <div className="flex gap-2">
                            <input
                                type="password"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                className="flex-1 rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your admin token"
                            />
                            <button
                                onClick={() => saveToken(token)}
                                className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}

                {/* Tab Switcher */}
                <div className="mb-6 flex gap-2">
                    <button
                        onClick={() => handleTabChange('blog')}
                        className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                            activeTab === 'blog'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        Blog Posts
                    </button>
                    <button
                        onClick={() => handleTabChange('weekly')}
                        className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                            activeTab === 'weekly'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        Weekly Musings
                    </button>
                </div>

                {message && (
                    <div
                        className={`mb-6 rounded-lg p-4 ${
                            message.type === 'error'
                                ? 'border border-red-700 bg-red-900/20 text-red-400'
                                : 'border border-green-700 bg-green-900/20 text-green-400'
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* Blog Form */}
                {activeTab === 'blog' && (
                    <>
                        <div className="mb-8">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold">
                                    {isEditing ? 'Edit Post' : 'Create New Post'}
                                </h2>
                                {isEditing && (
                                    <button
                                        onClick={resetForm}
                                        className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700"
                                    >
                                        <FaPlus /> New Post
                                    </button>
                                )}
                            </div>

                            <form onSubmit={(e) => handleBlogSubmit(e, 'draft')} className="space-y-6">
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

                                <div>
                                    <label className="mb-2 block text-sm font-medium">Slug (URL)</label>
                                    <div className="flex flex-col gap-2 sm:flex-row">
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

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                            Featured Image
                                        </label>
                                        <ImageUpload
                                            value={imageUrl}
                                            onChange={setImageUrl}
                                            token={token}
                                            folder="blog/thumbnails"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">Content</label>
                                    <TipTapEditor
                                        key={isEditing ? `edit-blog-${originalSlug}` : 'new-blog'}
                                        content={content}
                                        onChange={setContent}
                                        token={token}
                                    />
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                                    <button
                                        type="button"
                                        onClick={(e) => handleBlogSubmit(e, 'published')}
                                        disabled={loading}
                                        className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {loading && <FaSpinner className="animate-spin" />}
                                        {isEditing ? 'Update & Publish' : 'Publish Post'}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center justify-center gap-2 rounded-lg bg-gray-700 px-6 py-3 font-medium hover:bg-gray-600 disabled:opacity-50"
                                    >
                                        {loading && <FaSpinner className="animate-spin" />}
                                        Save as Draft
                                    </button>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-6 py-3 font-medium hover:bg-gray-700"
                                        >
                                            <FaTimes /> Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div>
                            <h2 className="mb-4 text-2xl font-semibold">All Posts</h2>
                            <PostList token={token} onEdit={handleEditPost} refresh={refreshKey} />
                        </div>
                    </>
                )}

                {/* Weekly Musing Form */}
                {activeTab === 'weekly' && (
                    <>
                        <div className="mb-8">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold">
                                    {isEditing ? 'Edit Weekly Musing' : 'Create Weekly Musing'}
                                </h2>
                                {isEditing && (
                                    <button
                                        onClick={resetForm}
                                        className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700"
                                    >
                                        <FaPlus /> New Musing
                                    </button>
                                )}
                            </div>

                            <form onSubmit={(e) => handleMusingSubmit(e, 'draft')} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">Week Number</label>
                                        <input
                                            type="number"
                                            value={weekNumber}
                                            onChange={(e) => setWeekNumber(e.target.value)}
                                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="1-53"
                                            min="1"
                                            max="53"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">Year</label>
                                        <input
                                            type="number"
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="2026"
                                            required
                                        />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400">
                                    URL will be: /the-week-that-wasnt/{year || 'year'}/{weekNumber || 'week'}
                                </p>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">Content</label>
                                    <TipTapEditor
                                        key={isEditing ? `edit-musing-${originalYear}-${originalWeek}` : 'new-musing'}
                                        content={musingContent}
                                        onChange={setMusingContent}
                                        token={token}
                                    />
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                                    <button
                                        type="button"
                                        onClick={(e) => handleMusingSubmit(e, 'published')}
                                        disabled={loading}
                                        className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {loading && <FaSpinner className="animate-spin" />}
                                        {isEditing ? 'Update & Publish' : 'Publish Musing'}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center justify-center gap-2 rounded-lg bg-gray-700 px-6 py-3 font-medium hover:bg-gray-600 disabled:opacity-50"
                                    >
                                        {loading && <FaSpinner className="animate-spin" />}
                                        Save as Draft
                                    </button>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-6 py-3 font-medium hover:bg-gray-700"
                                        >
                                            <FaTimes /> Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div>
                            <h2 className="mb-4 text-2xl font-semibold">All Weekly Musings</h2>
                            <WeeklyMusingList
                                token={token}
                                onEdit={handleEditMusing}
                                refresh={refreshKey}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
