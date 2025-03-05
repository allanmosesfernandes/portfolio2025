'use client';
import React from 'react';
import Introduction from './Introduction';
import Education from './Education';
import WorkExperience from './workExperience';
import Skills from './Skills';
import Projects from './Projects';
import BlogsArticles from './Blogs';
import Contact from './Contact';

const Homepage = ({ posts }) => {
    return (
        <>
            <Introduction />
            <Skills />
            <Projects />
            <WorkExperience />
            <Education />
            <BlogsArticles posts={posts} />
            <Contact />
        </>
    );
};

export default Homepage;
