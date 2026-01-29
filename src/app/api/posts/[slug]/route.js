import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { validateAuth } from '@/lib/auth';

// GET /api/posts/[slug] - Get a single post by slug
export async function GET(request, { params }) {
    try {
        await connectDB();

        const { slug } = await params;
        const { searchParams } = new URL(request.url);
        const includeDrafts = searchParams.get('drafts') === 'true';

        const query = { slug };
        if (!includeDrafts) {
            query.status = 'published';
        }

        const post = await Post.findOne(query).lean();

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({
            ...post,
            id: post._id.toString(),
            _id: undefined,
            date: post.publishedAt?.toISOString() || post.createdAt?.toISOString(),
            contentHtml: post.content,
        });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}

// PUT /api/posts/[slug] - Update a post
export async function PUT(request, { params }) {
    const auth = validateAuth(request);
    if (!auth.valid) {
        return auth.response;
    }

    try {
        await connectDB();

        const { slug } = await params;
        const body = await request.json();
        const { title, summary, content, image, readingTime, status, tags, newSlug } = body;

        const post = await Post.findOne({ slug });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        if (newSlug && newSlug !== slug) {
            const existingPost = await Post.findOne({ slug: newSlug });
            if (existingPost) {
                return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
            }
            post.slug = newSlug;
        }

        if (title !== undefined) post.title = title;
        if (summary !== undefined) post.summary = summary;
        if (content !== undefined) post.content = content;
        if (image !== undefined) post.image = image;
        if (readingTime !== undefined) post.readingTime = readingTime;
        if (tags !== undefined) post.tags = tags;

        if (status !== undefined) {
            const wasPublished = post.status === 'published';
            post.status = status;

            if (status === 'published' && !wasPublished) {
                post.publishedAt = new Date();
            }
        }

        await post.save();

        return NextResponse.json({
            message: 'Post updated successfully',
            post: {
                ...post.toObject(),
                id: post._id.toString(),
                _id: undefined,
            },
        });
    } catch (error) {
        console.error('Error updating post:', error);

        if (error.code === 11000) {
            return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
        }

        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

// DELETE /api/posts/[slug] - Delete a post
export async function DELETE(request, { params }) {
    const auth = validateAuth(request);
    if (!auth.valid) {
        return auth.response;
    }

    try {
        await connectDB();

        const { slug } = await params;

        const post = await Post.findOneAndDelete({ slug });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
