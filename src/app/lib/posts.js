// lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        return {
            id,
            slug: matterResult.data.slug,
            ...matterResult.data,
        };
    });
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}


export async function getPostData(slug) {
    const fileNames = fs.readdirSync(postsDirectory);
    const matchedFile = fileNames.find((fileName) => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        return matterResult.data.slug === slug;
    });

    if (!matchedFile) {
        throw new Error(`Post with slug '${slug}' not found`);
    }

    const fullPath = path.join(postsDirectory, matchedFile);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        ...matterResult.data,
    };
}

export function getAllPostSlugs() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        return matterResult.data.slug;
    });
}

/**
 * Retrieves all unique tags from the blog posts.
 * @returns {string[]} Array of unique tags.
 */
export function getAllTags() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allTags = fileNames.reduce((acc, fileName) => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        if (matterResult.data.tags && Array.isArray(matterResult.data.tags)) {
            acc.push(...matterResult.data.tags);
        }
        return acc;
    }, []);

    // Remove duplicate tags
    return Array.from(new Set(allTags));
}