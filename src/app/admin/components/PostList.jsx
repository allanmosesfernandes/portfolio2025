'use client';

import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

export default function PostList({ token, onEdit, refresh }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/posts?all=true');
            if (!response.ok) throw new Error('Failed to fetch posts');
            const data = await response.json();
            setPosts(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [refresh]);

    const handleToggleStatus = async (slug, currentStatus) => {
        if (!token) {
            alert('Please enter admin token first');
            return;
        }

        setActionLoading(slug);
        try {
            const newStatus = currentStatus === 'published' ? 'draft' : 'published';
            const response = await fetch(`/api/posts/${slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update status');
            }

            await fetchPosts();
        } catch (err) {
            alert(err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (slug, title) => {
        if (!token) {
            alert('Please enter admin token first');
            return;
        }

        if (!confirm(`Are you sure you want to delete "${title}"?`)) {
            return;
        }

        setActionLoading(slug);
        try {
            const response = await fetch(`/api/posts/${slug}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete post');
            }

            await fetchPosts();
        } catch (err) {
            alert(err.message);
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <FaSpinner className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg border border-red-700 bg-red-900/20 p-4 text-red-400">
                {error}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-8 text-center text-gray-400">
                No posts found. Create your first post above!
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border border-gray-700">
            <table className="w-full">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                            Post
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                            Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                            Date
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {posts.map((post) => (
                        <tr key={post.slug} className="bg-gray-900 hover:bg-gray-800">
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    {post.image && (
                                        <img
                                            src={post.image}
                                            alt=""
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                    )}
                                    <div>
                                        <p className="font-medium text-white">{post.title}</p>
                                        <p className="text-sm text-gray-400">/blog/{post.slug}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <span
                                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                        post.status === 'published'
                                            ? 'bg-green-900/50 text-green-400'
                                            : 'bg-yellow-900/50 text-yellow-400'
                                    }`}
                                >
                                    {post.status}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-400">
                                {post.date
                                    ? new Date(post.date).toLocaleDateString()
                                    : 'Not published'}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center justify-end gap-2">
                                    {actionLoading === post.slug ? (
                                        <FaSpinner className="h-4 w-4 animate-spin text-gray-400" />
                                    ) : (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleToggleStatus(post.slug, post.status)
                                                }
                                                className="rounded p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                                                title={
                                                    post.status === 'published'
                                                        ? 'Unpublish'
                                                        : 'Publish'
                                                }
                                            >
                                                {post.status === 'published' ? (
                                                    <FaEyeSlash />
                                                ) : (
                                                    <FaEye />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => onEdit(post.slug)}
                                                className="rounded p-2 text-gray-400 hover:bg-gray-700 hover:text-blue-400"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.slug, post.title)}
                                                className="rounded p-2 text-gray-400 hover:bg-gray-700 hover:text-red-400"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
