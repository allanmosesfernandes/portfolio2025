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
    // Use the promises-based API
    const fileNames = await fs.promises.readdir(postsDirectory);

    // Read all files and find the one with matching slug
    let matchedFile = null;
    let matchedData = null;

    for (const fileName of fileNames) {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = await fs.promises.readFile(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        if (matterResult.data.slug === slug) {
            matchedFile = fileName;
            matchedData = matterResult;
            break; // Exit the loop once we find the match
        }
    }

    if (!matchedFile) {
        throw new Error(`Post with slug '${slug}' not found`);
    }

    // We already have the content from the search, no need to read the file again
    const processedContent = await remark().use(html).process(matchedData.content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        ...matchedData.data,
    };
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