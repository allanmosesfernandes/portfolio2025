import React from 'react';
import { getSortedPostsData, getAllTags } from '../lib/posts';
import BlogClient from './BlogClient';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Blog — Allan Fernandes',
    description: 'Incessant yapping about code, tech, hacks and life\'s nuances — manifested in textual form.',
    image: '/og-image.png',
    url: 'https://www.allanfernandes.dev/blog',
};

const BlogPage = async () => {
    const allPostsData = await getSortedPostsData();
    const allTags = await getAllTags();

    return <BlogClient allPostsData={allPostsData} allTags={allTags} />;
};

export default BlogPage;
