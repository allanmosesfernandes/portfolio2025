'use client';
import React from 'react';
import Introduction from './Introduction';
import Education from './Education';
import WorkExperience from './workExperience';
import Skills from './Skills';
import Projects from './Projects';
import BlogsArticles from './Blogs';

const Homepage = ({ posts }) => {
    return (
        <div className="max-w-2xl mt-16 mx-auto px-5 bg-white dark:bg-black space-y-4 font-sans">
            <Introduction />
            <WorkExperience />
            <Education />
            <Skills />
            <Projects />
            <BlogsArticles posts={posts} />
        </div>
    );
};

export default Homepage;
