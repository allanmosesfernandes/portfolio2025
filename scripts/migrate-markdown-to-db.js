/**
 * Migration script to convert markdown blog posts to MongoDB
 *
 * Usage:
 *   1. Set MONGODB_URI in your .env file
 *   2. Run: node scripts/migrate-markdown-to-db.js
 *
 * This script:
 *   - Reads all .md files from the /posts directory
 *   - Parses frontmatter metadata
 *   - Converts markdown content to HTML
 *   - Inserts posts into MongoDB with status 'published'
 *   - Skips posts that already exist (by slug)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI environment variable is not set');
    console.error('Please create a .env file with your MongoDB connection string');
    process.exit(1);
}

const PostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        summary: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String, default: '' },
        readingTime: { type: Number, default: 5 },
        status: { type: String, enum: ['draft', 'published'], default: 'draft' },
        tags: { type: [String], default: [] },
        publishedAt: { type: Date, default: null },
    },
    { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

async function convertMarkdownToHtml(markdown) {
    const result = await remark().use(html).process(markdown);
    return result.toString();
}

async function migratePost(filePath) {
    const fileName = path.basename(filePath);
    console.log(`Processing: ${fileName}`);

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(fileContents);

    if (!frontmatter.slug) {
        console.warn(`  Skipping: No slug found in frontmatter`);
        return { status: 'skipped', reason: 'no slug' };
    }

    const existingPost = await Post.findOne({ slug: frontmatter.slug });
    if (existingPost) {
        console.log(`  Skipping: Post with slug "${frontmatter.slug}" already exists`);
        return { status: 'skipped', reason: 'already exists' };
    }

    const htmlContent = await convertMarkdownToHtml(markdownContent);

    const publishedAt = frontmatter.date ? new Date(frontmatter.date) : new Date();

    const postData = {
        title: frontmatter.title || fileName.replace('.md', ''),
        slug: frontmatter.slug,
        summary: frontmatter.summary || '',
        content: htmlContent,
        image: frontmatter.image || '',
        readingTime: parseInt(frontmatter.readingTime) || 5,
        status: 'published',
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        publishedAt,
    };

    await Post.create(postData);
    console.log(`  Migrated: "${postData.title}"`);

    return { status: 'migrated', title: postData.title };
}

async function main() {
    console.log('='.repeat(50));
    console.log('Blog Migration: Markdown to MongoDB');
    console.log('='.repeat(50));
    console.log();

    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected successfully!\n');

        const postsDir = path.join(__dirname, '..', 'posts');

        if (!fs.existsSync(postsDir)) {
            console.error(`Error: Posts directory not found at ${postsDir}`);
            process.exit(1);
        }

        const files = fs.readdirSync(postsDir).filter((file) => file.endsWith('.md'));

        console.log(`Found ${files.length} markdown files\n`);

        const results = {
            migrated: 0,
            skipped: 0,
            errors: 0,
        };

        for (const file of files) {
            try {
                const result = await migratePost(path.join(postsDir, file));
                if (result.status === 'migrated') {
                    results.migrated++;
                } else {
                    results.skipped++;
                }
            } catch (error) {
                console.error(`  Error migrating ${file}:`, error.message);
                results.errors++;
            }
        }

        console.log('\n' + '='.repeat(50));
        console.log('Migration Complete!');
        console.log('='.repeat(50));
        console.log(`Migrated: ${results.migrated}`);
        console.log(`Skipped:  ${results.skipped}`);
        console.log(`Errors:   ${results.errors}`);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

main();
