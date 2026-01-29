import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { validateAuth } from '@/lib/auth';

// GET /api/posts - List all posts (optionally filter by status)
export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const includeAll = searchParams.get('all') === 'true';

        let query = {};
        if (status) {
            query.status = status;
        } else if (!includeAll) {
            query.status = 'published';
        }

        const posts = await Post.find(query)
            .sort({ publishedAt: -1, createdAt: -1 })
            .select('title slug summary image readingTime tags status publishedAt createdAt updatedAt')
            .lean();

        const formattedPosts = posts.map((post) => ({
            ...post,
            id: post._id.toString(),
            _id: undefined,
            date: post.publishedAt?.toISOString() || post.createdAt?.toISOString(),
        }));

        return NextResponse.json(formattedPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

// POST /api/posts - Create a new post
export async function POST(request) {
    const auth = validateAuth(request);
    if (!auth.valid) {
        return auth.response;
    }

    try {
        await connectDB();

        const body = await request.json();
        const { title, slug, summary, content, image, readingTime, status, tags } = body;

        if (!title || !slug || !summary || !content) {
            return NextResponse.json(
                { error: 'Missing required fields: title, slug, summary, content' },
                { status: 400 }
            );
        }

        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
            return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
        }

        const postData = {
            title,
            slug,
            summary,
            content,
            image: image || '',
            readingTime: readingTime || 5,
            status: status || 'draft',
            tags: tags || [],
            publishedAt: status === 'published' ? new Date() : null,
        };

        const post = await Post.create(postData);

        return NextResponse.json(
            {
                message: 'Post created successfully',
                post: {
                    ...post.toObject(),
                    id: post._id.toString(),
                    _id: undefined,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating post:', error);

        if (error.code === 11000) {
            return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
        }

        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
