# Allan Fernandes Portfolio Redesign — Implementation Guide

A step-by-step guide to transform your portfolio from its current state to a modern, Framer-inspired design with wider layouts, horizontal scrolling, and a reimagined Read/Write section.

---

## Phase 1: Global Layout & Container Changes

### 1.1 Increase Container Width

**Current state:** Your site uses a narrow container (~800px max-width).

**Target:** Edge-to-edge feel with 1400-1600px max-width or fluid layouts.

```css
/* Before */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

/* After */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
}

/* For full-bleed sections (hero, projects) */
.container--wide {
  max-width: 1600px;
  padding: 0 64px;
}

/* Fluid option */
.container--fluid {
  max-width: none;
  padding: 0 clamp(24px, 5vw, 80px);
}
```

### 1.2 Update Tailwind Config (if using Tailwind)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      maxWidth: {
        'container': '1400px',
        'container-wide': '1600px',
      },
      padding: {
        'container': 'clamp(24px, 5vw, 64px)',
      }
    }
  }
}
```

### 1.3 Responsive Breakpoints

```css
/* Mobile: full width with small padding */
@media (max-width: 768px) {
  .container, .container--wide {
    padding: 0 20px;
  }
}

/* Tablet: moderate padding */
@media (min-width: 769px) and (max-width: 1200px) {
  .container, .container--wide {
    padding: 0 40px;
  }
}

/* Desktop: generous padding */
@media (min-width: 1201px) {
  .container {
    padding: 0 48px;
  }
  .container--wide {
    padding: 0 64px;
  }
}
```

---

## Phase 2: Hero Section Redesign

### 2.1 Layout Structure

Transform from centered layout to asymmetric split layout.

```jsx
// components/Hero.jsx
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        {/* Left side: Text content */}
        <div className="hero__text">
          <div className="hero__badge">
            <span className="hero__counter">0</span>
            <span className="hero__arrow">→</span>
            <span className="hero__counter">1</span>
            <span className="hero__label">builder</span>
          </div>
          
          <h1 className="hero__title">
            Software<br />Engineer
          </h1>
          
          <p className="hero__description">
            Building cool things on the internet while caring
            deeply about accessibility and user experience.
          </p>
          
          <div className="hero__cta">
            <a href="#projects" className="btn btn--primary">View Projects</a>
            <a href="/blog" className="btn btn--secondary">Read Blog</a>
          </div>
        </div>
        
        {/* Right side: Avatar */}
        <div className="hero__avatar-wrapper">
          <img 
            src="/profile.jpg" 
            alt="Allan Fernandes" 
            className="hero__avatar"
          />
          <div className="hero__status">
            <span className="hero__status-dot"></span>
            Available for work
          </div>
        </div>
      </div>
      
      {/* Company logos */}
      <div className="hero__companies">
        <p className="hero__companies-label">Currently at Royal London • Previously</p>
        <div className="hero__companies-logos">
          {/* Logo components */}
        </div>
      </div>
    </section>
  );
}
```

### 2.2 Hero Styling

```css
.hero {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

/* Gradient background accent */
.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
  pointer-events: none;
}

.hero__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
}

.hero__text {
  max-width: 60%;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(99,102,241,0.15);
  padding: 8px 16px;
  border-radius: 24px;
  margin-bottom: 24px;
}

.hero__counter {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
}

.hero__title {
  font-size: clamp(48px, 8vw, 96px);
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 24px;
  background: linear-gradient(135deg, var(--color-text) 0%, var(--color-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero__description {
  font-size: 18px;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 32px;
  max-width: 500px;
}

.hero__avatar-wrapper {
  position: relative;
}

.hero__avatar {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255,255,255,0.1);
}

.hero__status {
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-surface);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  color: #22c55e;
  border: 1px solid rgba(34,197,94,0.3);
  white-space: nowrap;
}

.hero__status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  margin-right: 8px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Mobile */
@media (max-width: 900px) {
  .hero__content {
    flex-direction: column-reverse;
    text-align: center;
  }
  
  .hero__text {
    max-width: 100%;
  }
  
  .hero__avatar {
    width: 200px;
    height: 200px;
  }
}
```

---

## Phase 3: Horizontal Scrolling Sections

### 3.1 Install Dependencies

```bash
# Option 1: Embla Carousel (lightweight, flexible)
npm install embla-carousel-react

# Option 2: Swiper (feature-rich)
npm install swiper

# For drag-to-scroll without library
# Use CSS scroll-snap (no install needed)
```

### 3.2 Reusable Horizontal Scroll Component

```jsx
// components/HorizontalScroll.jsx
import { useRef, useState, useEffect } from 'react';

export default function HorizontalScroll({ 
  children, 
  title, 
  showArrows = true,
  className = '' 
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener('scroll', checkScroll);
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({ 
      left: direction === 'left' ? -scrollAmount : scrollAmount, 
      behavior: 'smooth' 
    });
  };

  return (
    <section className={`horizontal-scroll ${className}`}>
      <div className="horizontal-scroll__header">
        {title && <h2 className="horizontal-scroll__title">{title}</h2>}
        
        {showArrows && (
          <div className="horizontal-scroll__arrows">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="horizontal-scroll__arrow"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="horizontal-scroll__arrow"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        )}
      </div>
      
      <div 
        ref={scrollRef}
        className="horizontal-scroll__track"
      >
        {children}
      </div>
      
      <p className="horizontal-scroll__hint">
        ↔ Drag to scroll
      </p>
    </section>
  );
}
```

### 3.3 Horizontal Scroll Styling

```css
.horizontal-scroll__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.horizontal-scroll__title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
}

.horizontal-scroll__arrows {
  display: flex;
  gap: 8px;
}

.horizontal-scroll__arrow {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.horizontal-scroll__arrow:hover:not(:disabled) {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.horizontal-scroll__arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.horizontal-scroll__track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 16px;
  
  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.horizontal-scroll__track::-webkit-scrollbar {
  display: none;
}

.horizontal-scroll__track > * {
  scroll-snap-align: start;
  flex-shrink: 0;
}

.horizontal-scroll__hint {
  font-size: 12px;
  color: var(--color-text-muted);
  text-align: center;
  margin-top: 16px;
  opacity: 0.6;
}

/* Hide hint on desktop with mouse */
@media (hover: hover) {
  .horizontal-scroll__hint {
    display: none;
  }
}
```

---

## Phase 4: Work Experience — Horizontal Cards

### 4.1 Work Experience Component

```jsx
// components/WorkExperience.jsx
import HorizontalScroll from './HorizontalScroll';

const experiences = [
  {
    company: 'Royal London Equity Release',
    role: 'Software Engineer',
    period: 'Sep 2023 - Present',
    highlight: '+47% processing efficiency',
    description: 'Collaborated within an agile team to develop customized financial systems...',
    logo: '/logos/royal-london.svg',
    url: 'https://equityrelease.royallondon.com',
    color: '#6366f1'
  },
  {
    company: 'Nottingham Trent Students\' Union',
    role: 'Software Engineer',
    period: 'Sep 2022 - Aug 2023',
    highlight: 'Full-stack development',
    description: 'Developed and deployed websites for multiple student union projects...',
    logo: '/logos/ntsu.png',
    url: 'https://www.trentstudents.org/',
    color: '#22c55e'
  },
  // Add more experiences...
];

export default function WorkExperience() {
  return (
    <HorizontalScroll title="Work Experience">
      {experiences.map((exp, index) => (
        <WorkCard key={index} {...exp} />
      ))}
    </HorizontalScroll>
  );
}

function WorkCard({ company, role, period, highlight, logo, url, color }) {
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="work-card"
      style={{ '--accent-color': color }}
    >
      <div className="work-card__logo">
        <img src={logo} alt={company} />
      </div>
      
      <h3 className="work-card__company">{company}</h3>
      <p className="work-card__role">{role} • {period}</p>
      
      <div className="work-card__highlight">
        {highlight}
      </div>
    </a>
  );
}
```

### 4.2 Work Card Styling

```css
.work-card {
  min-width: 340px;
  background: linear-gradient(135deg, 
    color-mix(in srgb, var(--accent-color) 15%, transparent), 
    transparent
  );
  border-radius: 20px;
  padding: 28px;
  border: 1px solid color-mix(in srgb, var(--accent-color) 30%, transparent);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.work-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.work-card__logo {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--accent-color) 25%, transparent);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.work-card__logo img {
  max-width: 70%;
  max-height: 70%;
  object-fit: contain;
}

.work-card__company {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

.work-card__role {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.work-card__highlight {
  display: inline-block;
  padding: 6px 14px;
  background: color-mix(in srgb, var(--accent-color) 20%, transparent);
  border-radius: 20px;
  font-size: 12px;
  color: var(--accent-color);
  font-weight: 500;
}
```

---

## Phase 5: Projects — Horizontal with Video Hover

### 5.1 Project Card with Video Hover

```jsx
// components/Projects.jsx
import { useState, useRef } from 'react';
import HorizontalScroll from './HorizontalScroll';

const projects = [
  {
    title: 'Royal London Broker Portal',
    description: 'Custom portal for equity release advisors. Case management, quotes, KFI generation.',
    image: '/projects/broker-portal.png',
    video: '/projects/broker-portal.mp4', // Optional video
    tech: ['React', 'Playwright', 'SCSS', 'AWS'],
    url: 'https://youtube.com/watch?v=...',
    featured: true,
  },
  {
    title: 'Daily Stoic Reminders',
    description: 'Web app for daily stoic reminders.',
    image: '/projects/stoic.png',
    tech: ['React', 'Firebase', 'Styled Components'],
    url: 'https://dailystoicreminders.uk/',
    featured: false,
  },
  // Add more projects...
];

export default function Projects() {
  return (
    <section className="projects">
      <HorizontalScroll title="Selected Work">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </HorizontalScroll>
    </section>
  );
}

function ProjectCard({ title, description, image, video, tech, url, featured }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-card ${featured ? 'project-card--featured' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {featured && (
        <span className="project-card__badge">★ FEATURED</span>
      )}
      
      <div className="project-card__media">
        <img 
          src={image} 
          alt={title}
          className={`project-card__image ${isHovered && video ? 'project-card__image--hidden' : ''}`}
        />
        {video && (
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            className={`project-card__video ${isHovered ? 'project-card__video--visible' : ''}`}
          />
        )}
      </div>
      
      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>
        
        <div className="project-card__tech">
          {tech.map((t, i) => (
            <span key={i} className="project-card__tech-tag">{t}</span>
          ))}
        </div>
      </div>
    </a>
  );
}
```

### 5.2 Project Card Styling

```css
.project-card {
  min-width: 320px;
  height: 380px;
  background: rgba(255,255,255,0.02);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(255,255,255,0.06);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
}

.project-card--featured {
  min-width: 480px;
  background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08));
  border-color: rgba(99,102,241,0.3);
}

.project-card__badge {
  position: absolute;
  top: 24px;
  left: 24px;
  padding: 6px 12px;
  background: rgba(99,102,241,0.3);
  border-radius: 20px;
  font-size: 11px;
  color: #a78bfa;
  z-index: 2;
}

.project-card__media {
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
  background: rgba(255,255,255,0.03);
}

.project-card__image,
.project-card__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.project-card__image--hidden {
  opacity: 0;
}

.project-card__video {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.project-card__video--visible {
  opacity: 1;
}

.project-card__content {
  margin-top: auto;
}

.project-card__title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.project-card__description {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-bottom: 16px;
  line-height: 1.5;
}

.project-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.project-card__tech-tag {
  padding: 4px 10px;
  background: rgba(255,255,255,0.08);
  border-radius: 12px;
  font-size: 11px;
  color: var(--color-text-muted);
}
```

---

## Phase 6: Read / Write Section — Magazine Layout

### 6.1 Read/Write Component

```jsx
// components/ReadWrite.jsx

const reading = [
  { title: 'Atomic Habits', author: 'James Clear', type: 'Book', cover: '/books/atomic.jpg' },
  { title: 'bytes.dev', author: 'Weekly Newsletter', type: 'Newsletter', cover: '/books/bytes.png' },
  { title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', type: 'Book', cover: '/books/pragmatic.jpg' },
];

const writing = [
  { 
    title: 'Code quality using Github Actions', 
    date: 'August 3, 2025', 
    tags: ['code', 'tools'],
    url: '/blog/enforcing-code-quality-using-github-actions'
  },
  { 
    title: 'How AI helped save a prod disaster', 
    date: 'May 18, 2025', 
    tags: ['code', 'life'],
    url: '/blog/how-ai-helped-save-a-production-disaster'
  },
  { 
    title: 'Enforcing code quality on FE repos', 
    date: 'August 2, 2025', 
    tags: ['code', 'tools'],
    url: '/blog/enforcing-code-quality-on-frontend-repos'
  },
];

export default function ReadWrite() {
  return (
    <section className="read-write">
      <div className="read-write__header">
        <h2 className="read-write__title">I also read and write</h2>
        <p className="read-write__subtitle">
          Continuous learning and sharing knowledge are core to my growth as an engineer.
        </p>
      </div>
      
      <div className="read-write__grid">
        {/* What I Read */}
        <div className="read-write__column read-write__column--read">
          <div className="read-write__column-header">
            <span className="read-write__icon">📚</span>
            <div>
              <h3>What I Read</h3>
              <p>Books, newsletters, resources</p>
            </div>
          </div>
          
          <div className="read-write__list">
            {reading.map((item, i) => (
              <div key={i} className="read-item">
                <div className="read-item__cover">
                  <img src={item.cover} alt={item.title} />
                </div>
                <div className="read-item__info">
                  <h4>{item.title}</h4>
                  <p>{item.author}</p>
                </div>
                <span className="read-item__type">{item.type}</span>
              </div>
            ))}
          </div>
          
          <div className="read-write__stat">
            Currently reading <span>3 books</span> this quarter
          </div>
        </div>
        
        {/* What I Write */}
        <div className="read-write__column read-write__column--write">
          <div className="read-write__column-header">
            <span className="read-write__icon">✍️</span>
            <div>
              <h3>What I Write</h3>
              <p>Blog articles & tutorials</p>
            </div>
          </div>
          
          <div className="read-write__list">
            {writing.map((post, i) => (
              <a key={i} href={post.url} className="write-item">
                <div className="write-item__tags">
                  {post.tags.map((tag, j) => (
                    <span key={j} className="write-item__tag">{tag}</span>
                  ))}
                </div>
                <h4>{post.title}</h4>
                <p>{post.date}</p>
              </a>
            ))}
          </div>
          
          <div className="read-write__footer">
            <span><strong>12</strong> articles published</span>
            <a href="/blog">View all →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 6.2 Read/Write Styling

```css
.read-write {
  padding: 80px 0;
}

.read-write__header {
  margin-bottom: 48px;
}

.read-write__title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  margin-bottom: 12px;
}

.read-write__subtitle {
  font-size: 16px;
  color: var(--color-text-muted);
  max-width: 500px;
}

.read-write__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

@media (max-width: 900px) {
  .read-write__grid {
    grid-template-columns: 1fr;
  }
}

/* Column Styles */
.read-write__column {
  border-radius: 24px;
  padding: 32px;
  border: 1px solid;
}

.read-write__column--read {
  background: linear-gradient(180deg, rgba(34,197,94,0.08), transparent);
  border-color: rgba(34,197,94,0.15);
}

.read-write__column--write {
  background: linear-gradient(180deg, rgba(249,115,22,0.08), transparent);
  border-color: rgba(249,115,22,0.15);
}

.read-write__column-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.read-write__icon {
  font-size: 32px;
}

.read-write__column-header h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
}

.read-write__column--read .read-write__column-header p {
  color: #22c55e;
  font-size: 13px;
}

.read-write__column--write .read-write__column-header p {
  color: #f97316;
  font-size: 13px;
}

/* Read Items */
.read-write__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.read-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255,255,255,0.03);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.05);
}

.read-item__cover {
  width: 48px;
  height: 64px;
  background: rgba(34,197,94,0.15);
  border-radius: 8px;
  overflow: hidden;
}

.read-item__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.read-item__info h4 {
  font-size: 15px;
  margin-bottom: 4px;
}

.read-item__info p {
  font-size: 12px;
  color: var(--color-text-muted);
}

.read-item__type {
  margin-left: auto;
  padding: 4px 10px;
  background: rgba(34,197,94,0.15);
  border-radius: 12px;
  font-size: 10px;
  color: #22c55e;
}

/* Write Items */
.write-item {
  display: block;
  padding: 20px;
  background: rgba(255,255,255,0.03);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.05);
  text-decoration: none;
  color: inherit;
  transition: background 0.2s ease;
}

.write-item:hover {
  background: rgba(255,255,255,0.05);
}

.write-item__tags {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.write-item__tag {
  padding: 2px 8px;
  background: rgba(249,115,22,0.15);
  border-radius: 8px;
  font-size: 10px;
  color: #f97316;
}

.write-item h4 {
  font-size: 15px;
  margin-bottom: 4px;
}

.write-item p {
  font-size: 12px;
  color: var(--color-text-muted);
}

/* Stats / Footer */
.read-write__stat {
  margin-top: 24px;
  padding: 16px;
  background: rgba(34,197,94,0.1);
  border-radius: 12px;
  text-align: center;
  font-size: 13px;
  color: var(--color-text-muted);
}

.read-write__stat span {
  color: #22c55e;
  font-weight: 600;
}

.read-write__footer {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.read-write__footer strong {
  color: #f97316;
}

.read-write__footer a {
  color: #f97316;
}
```

---

## Phase 7: Skills — Auto-Scrolling Marquee

### 7.1 Skills Marquee Component

```jsx
// components/SkillsMarquee.jsx

const skillsRow1 = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'AWS', 'Docker', 
  'Firebase', 'PostgreSQL', 'MongoDB', 'Redux', 'Tailwind', 'Jest'
];

const skillsRow2 = [
  'Playwright', 'Gatsby', 'Vercel', 'Sentry', 'Sass', 'GraphQL', 
  'Prisma', 'Tanstack Query', 'Twig', 'PHP', 'MySQL', 'Styled Components'
];

export default function SkillsMarquee() {
  return (
    <section className="skills-marquee">
      <h2 className="skills-marquee__title">Tech Stack</h2>
      
      <div className="skills-marquee__track">
        <div className="skills-marquee__row skills-marquee__row--forward">
          {[...skillsRow1, ...skillsRow1].map((skill, i) => (
            <span key={i} className="skills-marquee__tag skills-marquee__tag--primary">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="skills-marquee__track">
        <div className="skills-marquee__row skills-marquee__row--reverse">
          {[...skillsRow2, ...skillsRow2].map((skill, i) => (
            <span key={i} className="skills-marquee__tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 7.2 Marquee Styling

```css
.skills-marquee {
  padding: 80px 0;
  overflow: hidden;
}

.skills-marquee__title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  margin-bottom: 32px;
  padding: 0 var(--container-padding);
}

.skills-marquee__track {
  overflow: hidden;
  margin-bottom: 16px;
}

.skills-marquee__row {
  display: flex;
  gap: 16px;
  width: max-content;
}

.skills-marquee__row--forward {
  animation: marquee-forward 30s linear infinite;
}

.skills-marquee__row--reverse {
  animation: marquee-reverse 35s linear infinite;
}

/* Pause on hover */
.skills-marquee:hover .skills-marquee__row {
  animation-play-state: paused;
}

@keyframes marquee-forward {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

.skills-marquee__tag {
  padding: 16px 28px;
  background: rgba(255,255,255,0.03);
  border-radius: 40px;
  border: 1px solid rgba(255,255,255,0.08);
  font-size: 15px;
  color: var(--color-text-muted);
  font-weight: 500;
  white-space: nowrap;
}

.skills-marquee__tag--primary {
  background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05));
  border-color: rgba(99,102,241,0.2);
  color: #a78bfa;
}
```

---

## Phase 8: Animations & Polish

### 8.1 Scroll-Triggered Reveals

```jsx
// hooks/useInView.js
import { useEffect, useRef, useState } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect(); // Only trigger once
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

// Usage in components
function Section({ children }) {
  const [ref, isInView] = useInView();
  
  return (
    <div 
      ref={ref}
      className={`section ${isInView ? 'section--visible' : ''}`}
    >
      {children}
    </div>
  );
}
```

### 8.2 Animation CSS

```css
/* Fade up animation */
.section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section--visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered children */
.section--visible > *:nth-child(1) { transition-delay: 0ms; }
.section--visible > *:nth-child(2) { transition-delay: 100ms; }
.section--visible > *:nth-child(3) { transition-delay: 200ms; }
.section--visible > *:nth-child(4) { transition-delay: 300ms; }

/* Card hover effects */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}
```

### 8.3 Optional: Framer Motion Setup

```bash
npm install framer-motion
```

```jsx
// components/AnimatedSection.jsx
import { motion } from 'framer-motion';

export function AnimatedSection({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Phase 9: CSS Variables & Theme

### 9.1 Global CSS Variables

```css
:root {
  /* Colors - Light theme */
  --color-bg: #ffffff;
  --color-surface: #f8f9fa;
  --color-text: #1a1a2e;
  --color-text-muted: #6b7280;
  --color-primary: #6366f1;
  --color-primary-light: rgba(99, 102, 241, 0.15);
  
  /* Spacing */
  --container-padding: clamp(24px, 5vw, 64px);
  --section-spacing: clamp(60px, 10vw, 120px);
  
  /* Typography */
  --font-display: 'Space Grotesk', 'Outfit', sans-serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  
  /* Borders */
  --border-color: rgba(0, 0, 0, 0.08);
  --border-radius-sm: 8px;
  --border-radius-md: 16px;
  --border-radius-lg: 24px;
}

/* Dark theme */
[data-theme="dark"] {
  --color-bg: #0a0a0f;
  --color-surface: #12121a;
  --color-text: #e0e0e0;
  --color-text-muted: #888888;
  --border-color: rgba(255, 255, 255, 0.08);
}
```

---

## Checklist

### Phase 1: Layout
- [ ] Update container max-width to 1400-1600px
- [ ] Add fluid padding with clamp()
- [ ] Test responsive breakpoints

### Phase 2: Hero
- [ ] Implement asymmetric layout
- [ ] Add large display typography
- [ ] Include "0→1" or similar badge
- [ ] Add availability status badge
- [ ] Company logos section

### Phase 3: Horizontal Scroll
- [ ] Create reusable HorizontalScroll component
- [ ] Implement CSS scroll-snap
- [ ] Add navigation arrows
- [ ] Test touch/drag behavior

### Phase 4: Work Experience
- [ ] Convert to horizontal cards
- [ ] Add accent colors per company
- [ ] Implement hover states
- [ ] Add highlight badges

### Phase 5: Projects
- [ ] Create horizontal layout
- [ ] Add featured project styling
- [ ] Implement video-on-hover
- [ ] Add tech stack pills

### Phase 6: Read/Write
- [ ] Build two-column magazine layout
- [ ] "What I Read" section with book covers
- [ ] "What I Write" with blog links
- [ ] Add stats and CTAs

### Phase 7: Skills
- [ ] Create marquee animation
- [ ] Dual-row opposite directions
- [ ] Pause on hover
- [ ] Style primary vs secondary tags

### Phase 8: Animations
- [ ] Add scroll-triggered reveals
- [ ] Implement card hover effects
- [ ] Add staggered delays
- [ ] Optional: Framer Motion integration

### Phase 9: Polish
- [ ] Set up CSS variables
- [ ] Test dark/light themes
- [ ] Performance optimization
- [ ] Accessibility audit

---

## Resources

- **Embla Carousel**: https://www.embla-carousel.com/
- **Framer Motion**: https://www.framer.com/motion/
- **CSS Scroll Snap**: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
- **Intersection Observer**: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- **Google Fonts** (recommended): Space Grotesk, Outfit, Plus Jakarta Sans

---

*Generated for Allan Fernandes' portfolio redesign. Inspired by aalhadworks.framer.ai*
