'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
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
} from 'react-icons/fa';

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    const addImage = () => {
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

    return (
        <div className="flex flex-wrap gap-1 border-b border-gray-700 bg-gray-800 p-2">
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('heading', { level: 1 }) ? 'bg-gray-700' : ''
                }`}
                title="Heading 1"
            >
                <FaHeading className="text-white" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('heading', { level: 2 }) ? 'bg-gray-700' : ''
                }`}
                title="Heading 2"
            >
                <FaHeading className="text-sm text-white" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('bold') ? 'bg-gray-700' : ''
                }`}
                title="Bold"
            >
                <FaBold className="text-white" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('italic') ? 'bg-gray-700' : ''
                }`}
                title="Italic"
            >
                <FaItalic className="text-white" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('strike') ? 'bg-gray-700' : ''
                }`}
                title="Strikethrough"
            >
                <FaStrikethrough className="text-white" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('code') ? 'bg-gray-700' : ''
                }`}
                title="Inline Code"
            >
                <FaCode className="text-white" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('bulletList') ? 'bg-gray-700' : ''
                }`}
                title="Bullet List"
            >
                <FaListUl className="text-white" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('orderedList') ? 'bg-gray-700' : ''
                }`}
                title="Numbered List"
            >
                <FaListOl className="text-white" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`rounded p-2 hover:bg-gray-700 ${
                    editor.isActive('blockquote') ? 'bg-gray-700' : ''
                }`}
                title="Quote"
            >
                <FaQuoteLeft className="text-white" />
            </button>
            <button onClick={addImage} className="rounded p-2 hover:bg-gray-700" title="Add Image">
                <FaImage className="text-white" />
            </button>
            <button
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
                onClick={() => editor.chain().focus().undo().run()}
                className="rounded p-2 hover:bg-gray-700"
                title="Undo"
            >
                <FaUndo className="text-white" />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="rounded p-2 hover:bg-gray-700"
                title="Redo"
            >
                <FaRedo className="text-white" />
            </button>
        </div>
    );
};

export default function TipTapEditor({ content, onChange }) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
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
            onChange(html);
        },
    });

    return (
        <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
