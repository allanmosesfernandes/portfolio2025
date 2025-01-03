// app/blog/page.js

import React from 'react';
import { getSortedPostsData, getAllTags } from '../lib/posts';
import BlogClient from './BlogClient';

const BlogPage = async () => {
    const allPostsData = getSortedPostsData();
    const allTags = getAllTags();

    return <BlogClient allPostsData={allPostsData} allTags={allTags} />;
};

export default BlogPage;
