import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';

export async function getSortedPostsData() {
    await connectDB();

    const posts = await Post.find({ status: 'published' })
        .sort({ publishedAt: -1 })
        .select('title slug summary image readingTime tags publishedAt')
        .lean();

    return posts.map((post) => ({
        id: post._id.toString(),
        slug: post.slug,
        title: post.title,
        summary: post.summary,
        image: post.image,
        readingTime: post.readingTime,
        tags: post.tags,
        date: post.publishedAt?.toISOString(),
    }));
}

export async function getPostData(slug) {
    await connectDB();

    const post = await Post.findOne({ slug, status: 'published' }).lean();

    if (!post) {
        throw new Error(`Post not found: ${slug}`);
    }

    return {
        id: post._id.toString(),
        slug: post.slug,
        title: post.title,
        summary: post.summary,
        image: post.image,
        readingTime: post.readingTime,
        tags: post.tags,
        date: post.publishedAt?.toISOString(),
        contentHtml: post.content,
    };
}

export async function getAllTags() {
    await connectDB();

    const posts = await Post.find({ status: 'published' }).select('tags').lean();

    const allTags = posts.flatMap((post) => post.tags || []);

    return [...new Set(allTags)];
}
