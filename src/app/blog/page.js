// app/blog/page.js

import React from 'react';
import { getSortedPostsData, getAllTags } from '../lib/posts';
import BlogClient from './BlogClient';

export const metadata = {
    title: 'Blog - Allan Fernandes',
    description: 'A collection of blog posts on various topics written by Allan Fernandes.',
    image: '/og-image.png',
    url: 'https://www.allanfernandes.dev/blog',
};

const BlogPage = async () => {
    const allPostsData = await getSortedPostsData();
    const allTags = await getAllTags();

    return <BlogClient allPostsData={allPostsData} allTags={allTags} />;
};

export default BlogPage;
