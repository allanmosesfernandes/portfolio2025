// app/blog/page.js

import React from 'react';
import { getSortedPostsData, getAllTags } from '../lib/posts';
import BlogClient from './BlogClient';
/**
 * Server Component: Fetches data and renders the Client Component.
 */
const BlogPage = async () => {
    const allPostsData = getSortedPostsData();
    const allTags = getAllTags();

    return <BlogClient allPostsData={allPostsData} allTags={allTags} />;
};

export default BlogPage;
