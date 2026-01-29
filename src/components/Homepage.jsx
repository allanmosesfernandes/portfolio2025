'use client';
import React from 'react';
import Introduction from './Introduction';
import Education from './Education';
import WorkExperience from './workExperience';
import Skills from './Skills';
import Projects from './Projects';
import ReadWrite from './ReadWrite';
import Contact from './Contact';
import Recommendations from './Recommendations';

const Homepage = ({ posts }) => {
    return (
        <>
            <Introduction />
            <WorkExperience />
            <Recommendations />
            <Skills />
            <Education />
            <Projects />
            <ReadWrite posts={posts} />
            <Contact />
        </>
    );
};

export default Homepage;
