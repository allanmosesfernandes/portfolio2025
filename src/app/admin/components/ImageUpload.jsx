'use client';

import { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaSpinner, FaTrash } from 'react-icons/fa';

export default function ImageUpload({ value, onChange, token, folder = 'blog/thumbnails' }) {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    const handleUpload = async (file) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('Image must be less than 10MB');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', folder);

            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Upload failed');
            }

            const data = await response.json();
            onChange(data.url);
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    const handleRemove = () => {
        onChange('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            {value ? (
                <div className="relative">
                    <img
                        src={value}
                        alt="Uploaded image"
                        className="h-48 w-full rounded-lg border border-gray-700 object-cover"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
                        title="Remove image"
                    >
                        <FaTrash size={14} />
                    </button>
                </div>
            ) : (
                <div
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
                        dragActive
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                    />
                    {uploading ? (
                        <>
                            <FaSpinner className="mb-2 h-8 w-8 animate-spin text-blue-500" />
                            <p className="text-sm text-gray-400">Uploading...</p>
                        </>
                    ) : (
                        <>
                            <FaCloudUploadAlt className="mb-2 h-8 w-8 text-gray-500" />
                            <p className="text-sm text-gray-400">
                                Drag & drop or click to upload
                            </p>
                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </>
                    )}
                </div>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
