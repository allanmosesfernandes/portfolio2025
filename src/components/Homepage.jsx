'use client';
import React, { useEffect } from 'react';
import Hero from './sections/Hero';

import About from './sections/About';
import WorkExperience from './sections/WorkExperience';
import ProjectsSection from './sections/Projects';
import Testimonials from './sections/Testimonials';
import TechStack from './sections/TechStack';
import Education from './sections/Education';
import BlogPreview from './sections/BlogPreview';

import Footer from './Footer';

const Homepage = ({ posts }) => {
    useEffect(() => {
        const sections = document.querySelectorAll('.fade-in-section');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Hero />
            <div className="fade-in-section"><About /></div>
            <div className="fade-in-section"><TechStack /></div>
            <div className="fade-in-section"><WorkExperience /></div>
            <div className="fade-in-section"><Testimonials /></div>
            <div className="fade-in-section"><ProjectsSection /></div>
            <div className="fade-in-section"><Education /></div>
            <div className="fade-in-section"><BlogPreview posts={posts} /></div>
            <Footer />
        </>
    );
};

export default Homepage;
