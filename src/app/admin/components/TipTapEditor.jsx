'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { useRef, useState, useEffect } from 'react';
import {
    FaBold,
    FaItalic,
    FaStrikethrough,
    FaCode,
    FaHeading,
    FaListUl,
    FaListOl,
    FaQuoteLeft,
    FaUndo,
    FaRedo,
    FaImage,
    FaLink,
    FaSpinner,
    FaPalette,
    FaTimes,
} from 'react-icons/fa';

const PRESET_COLORS = [
    { name: 'Default', value: null },
    { name: 'Pantone', value: '#646cff' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Gray', value: '#9ca3af' },
    { name: 'White', value: '#ffffff' },
];

const ColorPicker = ({ editor, onClose }) => {
    const [customColor, setCustomColor] = useState('#646cff');

    const applyColor = (color) => {
        if (color === null) {
            editor.chain().focus().unsetColor().run();
        } else {
            editor.chain().focus().setColor(color).run();
        }
        onClose();
    };

    return (
        <div className="absolute left-0 top-full z-50 mt-1 rounded-lg border border-gray-600 bg-gray-800 p-3 shadow-xl">
            <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-300">Text Color</span>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-white"
                >
                    <FaTimes size={12} />
                </button>
            </div>
            <div className="mb-3 grid grid-cols-6 gap-1">
                {PRESET_COLORS.map((color) => (
                    <button
                        key={color.name}
                        type="button"
                        onClick={() => applyColor(color.value)}
                        className={`h-6 w-6 rounded border border-gray-600 transition-transform hover:scale-110 ${
                            color.value === null ? 'bg-gradient-to-br from-gray-600 to-gray-400' : ''
                        }`}
                        style={color.value ? { backgroundColor: color.value } : {}}
                        title={color.name}
                    />
                ))}
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent"
                    title="Custom color"
                />
                <input
                    type="text"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-20 rounded border border-gray-600 bg-gray-700 px-2 py-1 text-xs"
                    placeholder="#000000"
                />
                <button
                    type="button"
                    onClick={() => applyColor(customColor)}
                    className="rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700"
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

const MenuBar = ({ editor, token }) => {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);

    if (!editor) {
        return null;
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!token) {
            alert('Please enter admin token to upload images');
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', 'blog/content');

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
            editor.chain().focus().setImage({ src: data.url }).run();
        } catch (err) {
            alert(`Upload failed: ${err.message}`);
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const addImageFromUrl = () => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const addLink = () => {
        const url = window.prompt('Enter link URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url, target: '_blank' }).run();
        }
    };

    const currentColor = editor.getAttributes('textStyle').color;

    return (
        <div className="flex flex-wrap gap-1 border-b border-gray-700 bg-gray-800 p-2">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('heading', { level: 1 }) ? 'bg-gray-700' : ''
                }`}
                title="Heading 1"
            >
                <FaHeading className="text-white" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('heading', { level: 2 }) ? 'bg-gray-700' : ''
                }`}
                title="Heading 2"
            >
                <FaHeading className="text-sm text-white" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('bold') ? 'bg-gray-700' : ''
                }`}
                title="Bold"
            >
                <FaBold className="text-white" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('italic') ? 'bg-gray-700' : ''
                }`}
                title="Italic"
            >
                <FaItalic className="text-white" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('strike') ? 'bg-gray-700' : ''
                }`}
                title="Strikethrough"
            >
                <FaStrikethrough className="text-white" />
            </button>

            {/* Color Picker */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className={`rounded p-2 hover:bg-gray-700 ${showColorPicker ? 'bg-gray-700' : ''}`}
                    title="Text Color"
                >
                    <FaPalette style={{ color: currentColor || '#ffffff' }} />
                </button>
                {showColorPicker && (
                    <ColorPicker editor={editor} onClose={() => setShowColorPicker(false)} />
                )}
            </div>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('code') ? 'bg-gray-700' : ''
                }`}
                title="Inline Code"
            >
                <FaCode className="text-white" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('bulletList') ? 'bg-gray-700' : ''
                }`}
                title="Bullet List"
            >
                <FaListUl className="text-white" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('orderedList') ? 'bg-gray-700' : ''
                }`}
                title="Numbered List"
            >
                <FaListOl className="text-white" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('blockquote') ? 'bg-gray-700' : ''
                }`}
                title="Quote"
            >
                <FaQuoteLeft className="text-white" />
            </button>

            <div className="relative">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded p-2 hover:bg-gray-700"
                    title="Upload Image"
                    disabled={uploading}
                >
                    {uploading ? (
                        <FaSpinner className="animate-spin text-white" />
                    ) : (
                        <FaImage className="text-white" />
                    )}
                </button>
            </div>

            <button
                type="button"
                onClick={addImageFromUrl}
                className="rounded p-2 text-xs hover:bg-gray-700"
                title="Add Image from URL"
            >
                <span className="text-gray-400">URL</span>
            </button>

            <button
                type="button"
                onClick={addLink}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('link') ? 'bg-gray-700' : ''
                }`}
                title="Add Link"
            >
                <FaLink className="text-white" />
            </button>
            <div className="flex-grow"></div>
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                className="rounded p-2 hover:bg-gray-700"
                title="Undo"
            >
                <FaUndo className="text-white" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                className="rounded p-2 hover:bg-gray-700"
                title="Redo"
            >
                <FaRedo className="text-white" />
            </button>
        </div>
    );
};

export default function TipTapEditor({ content, onChange, token }) {
    // Track the content to prevent update loops
    const lastContent = useRef(content || '');

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                // Disable the default marks that conflict with our custom ones
            }),
            TextStyle.configure(),
            Color.configure({
                types: ['textStyle'],
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg my-4',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 underline hover:text-blue-600',
                },
            }),
            Placeholder.configure({
                placeholder: 'Start writing your blog post...',
            }),
        ],
        content: content || '',
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none p-4 focus:outline-none min-h-[500px]',
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            lastContent.current = html;
            onChange(html);
        },
    });

    // Update editor content when prop changes externally (e.g., when loading a post for editing or clearing form)
    useEffect(() => {
        if (editor && content !== lastContent.current) {
            editor.commands.setContent(content || '');
            lastContent.current = content || '';
        }
    }, [editor, content]);

    return (
        <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
            <MenuBar editor={editor} token={token} />
            <EditorContent editor={editor} />
        </div>
    );
}
