'use client';

import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

export default function WeeklyMusingList({ token, onEdit, refresh }) {
    const [musings, setMusings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);

    const fetchMusings = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/weekly?all=true');
            if (!response.ok) throw new Error('Failed to fetch musings');
            const data = await response.json();
            setMusings(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMusings();
    }, [refresh]);

    const handleToggleStatus = async (year, weekNumber, currentStatus) => {
        if (!token) {
            alert('Please enter admin token first');
            return;
        }

        const key = `${year}-${weekNumber}`;
        setActionLoading(key);
        try {
            const newStatus = currentStatus === 'published' ? 'draft' : 'published';
            const response = await fetch(`/api/weekly/${year}/${weekNumber}`, {
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

            await fetchMusings();
        } catch (err) {
            alert(err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (year, weekNumber) => {
        if (!token) {
            alert('Please enter admin token first');
            return;
        }

        if (!confirm(`Are you sure you want to delete Week ${weekNumber}, ${year}?`)) {
            return;
        }

        const key = `${year}-${weekNumber}`;
        setActionLoading(key);
        try {
            const response = await fetch(`/api/weekly/${year}/${weekNumber}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete musing');
            }

            await fetchMusings();
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

    if (musings.length === 0) {
        return (
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-8 text-center text-gray-400">
                No weekly musings found. Create your first one above!
            </div>
        );
    }

    return (
        <>
            {/* Mobile card view */}
            <div className="space-y-3 sm:hidden">
                {musings.map((musing) => {
                    const key = `${musing.year}-${musing.weekNumber}`;
                    return (
                        <div
                            key={key}
                            className="rounded-lg border border-gray-700 bg-gray-900 p-4"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <div>
                                    <span className="font-medium text-white">
                                        {musing.title || `Week ${musing.weekNumber}, ${musing.year}`}
                                    </span>
                                    <p className="text-sm text-gray-400">
                                        {musing.date
                                            ? new Date(musing.date).toLocaleDateString()
                                            : 'Not published'}
                                    </p>
                                </div>
                                <span
                                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                        musing.status === 'published'
                                            ? 'bg-green-900/50 text-green-400'
                                            : 'bg-yellow-900/50 text-yellow-400'
                                    }`}
                                >
                                    {musing.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {actionLoading === key ? (
                                    <FaSpinner className="h-4 w-4 animate-spin text-gray-400" />
                                ) : (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleToggleStatus(
                                                    musing.year,
                                                    musing.weekNumber,
                                                    musing.status
                                                )
                                            }
                                            className="flex items-center gap-1 rounded bg-gray-800 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                        >
                                            {musing.status === 'published' ? (
                                                <>
                                                    <FaEyeSlash /> Unpublish
                                                </>
                                            ) : (
                                                <>
                                                    <FaEye /> Publish
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() =>
                                                onEdit(musing.year, musing.weekNumber)
                                            }
                                            className="flex items-center gap-1 rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(musing.year, musing.weekNumber)
                                            }
                                            className="flex items-center gap-1 rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desktop table view */}
            <div className="hidden overflow-hidden rounded-lg border border-gray-700 sm:block">
                <table className="w-full">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                                Week
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                                Year
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
                        {musings.map((musing) => {
                            const key = `${musing.year}-${musing.weekNumber}`;
                            return (
                                <tr key={key} className="bg-gray-900 hover:bg-gray-800">
                                    <td className="px-4 py-3">
                                        <span className="font-medium text-white">
                                            {musing.title || `Week ${musing.weekNumber}`}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-300">{musing.year}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                                musing.status === 'published'
                                                    ? 'bg-green-900/50 text-green-400'
                                                    : 'bg-yellow-900/50 text-yellow-400'
                                            }`}
                                        >
                                            {musing.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-400">
                                        {musing.date
                                            ? new Date(musing.date).toLocaleDateString()
                                            : 'Not published'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            {actionLoading === key ? (
                                                <FaSpinner className="h-4 w-4 animate-spin text-gray-400" />
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleToggleStatus(
                                                                musing.year,
                                                                musing.weekNumber,
                                                                musing.status
                                                            )
                                                        }
                                                        className="rounded p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                                                        title={
                                                            musing.status === 'published'
                                                                ? 'Unpublish'
                                                                : 'Publish'
                                                        }
                                                    >
                                                        {musing.status === 'published' ? (
                                                            <FaEyeSlash />
                                                        ) : (
                                                            <FaEye />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            onEdit(musing.year, musing.weekNumber)
                                                        }
                                                        className="rounded p-2 text-gray-400 hover:bg-gray-700 hover:text-blue-400"
                                                        title="Edit"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(musing.year, musing.weekNumber)
                                                        }
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
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
