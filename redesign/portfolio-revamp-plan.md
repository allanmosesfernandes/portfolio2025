# allanfernandes.dev — Portfolio Revamp Plan
> Implementation guide for Claude CLI. Work through each phase in order. Each section is self-contained with full context, design decisions, and exact instructions.

---

## Project Overview

**Stack:** Next.js (App Router), TypeScript, Tailwind CSS  
**Fonts:** Bebas Neue (display) · DM Sans (body) · Space Mono (mono/labels)  
**Design files produced:** `homepage.html`, `blog-listing.html`, `blog-post.html`, `brand-reference.html`, `cursor-pop-demo.html`, `tailwind.config.js`, `globals.css`

### Color tokens (memorise these)
```
--yellow:  #F5C800   → tw: yellow / brand
--pink:    #F272C8   → tw: pink
--indigo:  #5865F2   → tw: indigo
--ink:     #0D0D0D   → tw: ink (near-black bg)
--ink-soft:#1A1A1A   → tw: ink-soft (card bg)
--ink-mid: #2A2A2A   → tw: ink-mid (borders)
--paper:   #FAFAFA   → tw: paper (white text)
--muted:   #999999   → tw: muted-light
--green:   #2ECC71   → tw: green (status dot only)
```

### Shadow system
```
shadow-hard     → 4px 4px 0px #0D0D0D       (default button shadow)
shadow-hard-md  → 6px 6px 0px #0D0D0D       (button hover state)
shadow-hard-yellow → 4px 4px 0px #F5C800
shadow-hard-pink   → 4px 4px 0px #F272C8
shadow-hard-indigo → 4px 4px 0px #5865F2
```

### Easing tokens
```
ease-spring  → cubic-bezier(0.34, 1.56, 0.64, 1)   (bouncy, used on hovers)
ease-expo    → cubic-bezier(0.16, 1, 0.3, 1)        (fast-out, used on reveals)
```

---

## Phase 0 — Foundation

### 0.1 Install fonts

Add to `app/layout.tsx`:

```tsx
import { Bebas_Neue, DM_Sans, Space_Mono } from 'next/font/google'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
})
```

Wrap `<body>` with:
```tsx
<body className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable}`}>
```

---

### 0.2 Replace `tailwind.config.ts`

Replace your entire Tailwind config with the provided `tailwind.config.js`. It adds:
- All colour tokens (`yellow`, `pink`, `indigo`, `ink.*`, `paper.*`, `muted`, `green`)
- All shadow tokens (`shadow-hard`, `shadow-hard-md`, `shadow-hard-yellow`, `shadow-hard-pink`, `shadow-hard-indigo`, `shadow-glow-yellow`, `shadow-float`, etc.)
- Font family tokens (`font-display`, `font-sans`, `font-mono`)
- Font size tokens (`text-display-2xl` through `text-display-md`, `text-label-*`)
- Easing tokens (`ease-spring`, `ease-expo`, `ease-snappy`)
- Animation keyframes (`fade-up`, `scale-in`, `slide-in-left`, `pulse-dot`, `marquee`)
- Border radius tokens (`rounded-badge`, `rounded-btn`, `rounded-card`, `rounded-pill`)

---

### 0.3 Replace `app/globals.css`

Replace your entire globals.css with the provided `globals.css`. This sets:
- `::selection` to yellow background
- Custom scrollbar (dark themed)
- Pre-built component classes: `.btn-primary`, `.btn-ghost`, `.btn-pink`, `.btn-indigo`, `.btn-pill`, `.badge-yellow`, `.badge-pink`, `.badge-indigo`, `.badge-outline`, `.tag`, `.card`, `.card-featured`, `.section-label`, `.input`, `.hover-lift`
- Utility classes: `.marquee-track`, `.marquee-content`, `.noise`, `.gradient-fade-*`

---

### 0.4 Create the custom cursor system

Create `components/Cursor.tsx`. This is a client component (`'use client'`).

**Behaviour:**
- A `14px` yellow circle that follows the mouse instantly
- A `36px` ring that follows with a `0.12` lerp lag
- 5 cursor trail dots that fade out behind the cursor
- 5 hover states triggered by `data-cursor` attributes on interactive elements:
  - `data-cursor="btn"` → cursor inflates to `48px`, mix-blend-mode multiply
  - `data-cursor="link"` → cursor shrinks to `8px`, turns pink
  - `data-cursor="card"` → cursor becomes `64px` rounded square
  - `data-cursor="text"` → cursor becomes a `3px × 28px` caret
  - `data-cursor="magnetic"` → same as btn but element moves toward cursor (max `0.3×` offset)
- A click shrink: cursor scales to `0.7` on `mousedown`, restores on `mouseup`
- `cursor: none` on `body` when this component mounts

Reference the `cursor-pop-demo.html` file for the exact JS implementation. Port it to React using `useEffect` + `useRef`. Store cursor position in `useRef` (not state) to avoid re-renders. Use `requestAnimationFrame` for the ring animation loop.

Add `<Cursor />` to `app/layout.tsx` inside `<body>`.

---

### 0.5 Create scroll reveal hook

Create `hooks/useScrollReveal.ts`:

```ts
// Attaches IntersectionObserver to elements with class `.reveal`
// Adds class `.visible` when they enter viewport
// threshold: 0.1, rootMargin: '0px 0px -60px 0px'
// Uses transition-delay via `.reveal-d1` through `.reveal-d4` (0.08s steps)
```

Call in a `<ScrollReveal />` client component that runs once on mount.

---

## Phase 1 — Navigation

**File:** `components/Nav.tsx`

### Design spec
- `position: sticky`, `top: 0`, `z-index: 100`
- Height: `68px`
- Background: `bg-ink/90 backdrop-blur-md`
- Bottom border: `border-b border-ink-mid`
- Horizontal padding: `px-12`

### Left — Logo
- Text: `AF.` in `font-display text-2xl tracking-wider`
- `AF` in `text-paper`, `.` in `text-yellow`
- Links to `/`

### Centre — Links
- Items: Home · Experience · Projects · Blog
- Font: `font-sans text-sm font-medium`
- Default colour: `text-muted-light`
- Hover: `text-paper`
- Active (current route via `usePathname()`): `text-yellow`
- Gap between items: `gap-8`

### Right
- **Status dot:** `8px` circle, `bg-green`, `shadow: 0 0 8px #2ECC71`, `animate-pulse-dot`
- **Resume button:** `font-sans font-bold text-sm`, `bg-yellow text-ink`, `px-4 py-2 rounded-btn`, `shadow-hard`, hover: `shadow-hard-md` + `translate(-1px, -1px)`, transition via `ease-spring`
- Add `data-cursor="btn"` to resume button

### Mobile
- Below `md`: hide centre links, show hamburger icon (simple `☰` in `font-mono`)
- Drawer slides in from right on mobile (simple `translate-x` toggle)

---

## Phase 2 — Hero Section

**File:** `components/sections/Hero.tsx`

### Design spec
- Full viewport height: `min-h-[calc(100vh-68px)]`
- Background: `bg-yellow`
- Layout: `grid grid-cols-2`
- Overflow hidden, position relative

### Geometric shapes (Stack Overflow-inspired)
Three absolutely positioned `div`s, all `rounded-2xl`, rotated `14deg`:

```
Shape 1 (pink):   320×600px, right: -80px, top: -120px,  bg-pink,   z-0
Shape 2 (indigo): 220×480px, right: 140px, top: 60px,    bg-indigo, z-0
Shape 3 (black):  120×240px, right: 380px, bottom: -60px, bg-ink,   z-0, opacity-30
```

All shapes: `pointer-events-none`, `overflow-hidden` on parent

### Left column (content)
Padding: `px-12 py-20`, flex-col, justify-between, `z-10 relative`

**Status badge:**
```tsx
<div className="inline-flex items-center gap-2 bg-ink text-paper font-mono text-label-sm tracking-widest uppercase px-3 py-1.5 rounded-badge w-fit mb-7">
  <span className="w-2 h-2 rounded-full bg-green animate-pulse-dot" />
  Open to new roles
</div>
```

**Name:**
```tsx
<h1 className="font-display text-display-2xl text-ink leading-[0.88]">
  Allan<br />
  <span className="bg-ink text-yellow px-2">Moses</span><br />
  Fernandes<span className="text-pink">.</span>
</h1>
```

**Tagline:**  
`font-sans text-base leading-7 text-ink/65 max-w-sm mt-7`  
Text: "Software Engineer building cool things on the internet while caring deeply about accessibility and user experience."  
Bold: "Software Engineer", "accessibility", "user experience" → `font-bold text-ink`

**CTAs:**
```tsx
// Primary
<a href="#projects" data-cursor="btn" className="btn-primary">
  View Projects <span>→</span>
</a>

// Ghost (on yellow background — dark border variant)
<a href="#blog" data-cursor="btn" className="btn-ghost-dark">
  Read Blog
</a>
```

**Scroll hint:**  
`font-mono text-label-xs tracking-widest uppercase text-ink/45 flex items-center gap-2 mt-12`  
```tsx
<div className="w-8 h-px bg-ink/30" />
Scroll to explore
```

### Right column (photo)
- `relative`, `flex items-end justify-center`
- Photo card: `bg-ink rounded-t-2xl w-[360px] min-h-[480px]` with no bottom radius
- `border-2 border-ink-mid border-b-0`
- `<Image>` component filling the card
- Yellow badge bottom-left: `@allanfernandes.dev` in `font-mono text-label-xs`

### Entrance animations
Each direct child of left column: `animate-fade-up` with staggered `animation-delay` (100ms, 200ms, 300ms, 400ms). Use `style={{ animationDelay: '100ms' }}`.

---

## Phase 3 — Marquee Strip

**File:** `components/MarqueeStrip.tsx`

### Design spec
- `bg-ink border-y border-ink-mid py-3.5 overflow-hidden whitespace-nowrap`
- Pauses on hover: `[&:hover_.marquee-content]:animation-play-state-paused` or via JS

### Content
Duplicate the array twice for seamless looping:
```ts
const items = [
  { text: 'Software Engineer',          dot: 'yellow' },
  { text: '5 Years Experience',         dot: 'pink'   },
  { text: 'Royal London',               dot: 'indigo' },
  { text: 'Next.js & React',            dot: 'yellow' },
  { text: 'MSc Computer Science',       dot: 'pink'   },
  { text: 'Nottingham Trent University',dot: 'indigo' },
  { text: 'Open to New Roles',          dot: 'yellow' },
  { text: 'London, UK',                 dot: 'pink'   },
  { text: 'Accessibility First',        dot: 'indigo' },
]
```

Each item: `inline-flex items-center gap-3 font-mono text-label-sm tracking-wider uppercase text-muted-light px-8`  
Dot: `w-1.5 h-1.5 rounded-full` + `bg-yellow` / `bg-pink` / `bg-indigo`

Animation: `animate-marquee` (defined in Tailwind config as `translateX(0) → translateX(-50%)`, 28s linear infinite)

---

## Phase 4 — About Section

**File:** `components/sections/About.tsx`

### Design spec
- `border-b border-ink-mid`
- Section padding: `py-24 px-12 max-w-[1080px] mx-auto`
- Layout: `grid grid-cols-2 gap-16 items-start`

### Section label
```tsx
<div className="section-label reveal">
  <span className="text-yellow">01</span> About Me
</div>
```

### Left — Heading + prose
Heading: `font-display text-display-xl`
```
Who's
<span className="text-yellow">Allan</span><span className="text-pink">?</span>
```

Prose: `font-sans text-base leading-[1.85] text-paper/75 space-y-5`  
Links: `text-yellow border-b border-yellow/30 hover:border-yellow transition-colors`

Source text verbatim from `allanfernandes.dev/`:
1. "I've been a software engineer for around five years, often being a victim to the shiny object syndrome…"
2. "With a master's degree in Computer Science, I am currently working as a software engineer at Royal London Equity Release…"
3. "When I'm not breaking things on the internet, I'm busy playing football, running, or writing blog articles."

### Right — Stat cards
Three cards stacked vertically with `gap-4`:

**Card 1 (yellow bg):**
```
label: "Years Experience"
value: "5+"            ← font-display text-5xl text-ink
sub:   "Building production software across fintech, NGOs, and startups"
```

**Card 2 (pink bg):**
```
label: "Career Highlight"
value: "47%"
sub:   "Processing efficiency increase at Royal London"
```

**Card 3 (indigo bg):**
```
label: "Currently At"
value: "RLRE"          ← text-paper
sub:   "Royal London Equity Release — Sep 2023 → Present"
```

Each card: `rounded-card p-7 relative overflow-hidden`  
Each card has a decorative circle `::before` (120×120px, bg-black/6, rounded-full, absolute top-[-40px] right-[-40px])  
Label: `font-mono text-label-xs uppercase tracking-widest opacity-50 mb-2`  
Value: `font-display text-5xl leading-none mb-1.5`  
Sub: `text-sm leading-relaxed opacity-60`  
Add `data-cursor="card"` to each card.

---

## Phase 5 — Work Experience

**File:** `components/sections/WorkExperience.tsx`

### Design spec
- `border-b border-ink-mid`
- Section padding: `py-24 px-12 max-w-[1080px] mx-auto`

### Heading
`font-display text-display-xl`
```
Where I've
<span className="text-yellow">Shipped</span> Things
```

### Timeline (Stack Overflow-inspired 3-column layout)

A `grid grid-cols-3` with a shared horizontal rule running behind it at `top-[52px]`:

```tsx
<div className="relative grid grid-cols-3 border border-ink-mid rounded-2xl overflow-hidden">
  {/* Horizontal rule behind date badges */}
  <div className="absolute top-[52px] left-0 right-0 h-px bg-ink-mid z-0" />
  
  {jobs.map((job, i) => (
    <TimelineItem key={i} job={job} isLast={i === jobs.length - 1} />
  ))}
</div>
```

**TimelineItem:**
- `p-8 border-r border-ink-mid last:border-r-0 relative z-10 hover:bg-ink-soft transition-colors`
- **Date badge:** `inline-flex items-center gap-2 font-mono text-label-sm bg-ink border border-ink-mid px-3 py-1.5 rounded-badge text-muted-light mb-5 w-fit`
  - Coloured dot: job 1 = yellow, job 2 = pink, job 3 = indigo
- **Company logo placeholder:** `w-10 h-10 rounded-lg border border-ink-mid bg-ink-soft mb-4 flex items-center justify-center font-display text-base text-muted` (use initials)
- **Role:** `font-display text-2xl tracking-wide text-paper mb-1.5`
- **Company:** `text-sm font-semibold text-yellow mb-3`
- **Description:** `text-sm text-muted-light leading-relaxed mb-4`
- **Stat badge (job 1 only):** `inline-flex items-center gap-1.5 bg-green/10 border border-green/30 text-green font-mono text-label-xs px-2.5 py-1 rounded-badge`
  - Text: `↑ 47% processing efficiency`
- **Arrow between items:** absolute `right-[-13px] top-[46px]` 26×26px circle, `bg-ink border-2 border-ink-mid z-20 flex items-center justify-center text-muted text-xs`. Hidden on last item.

**Data:**
```ts
const jobs = [
  {
    period: 'Sep 2023 — Present',
    dotColor: 'yellow',
    initials: 'RL',
    role: 'Software Engineer',
    company: 'Royal London Equity Release',
    desc: 'Built bespoke financial applications for the equity release sector. Developed the Broker Portal, a full case management platform for equity release advisors.',
    stat: '↑ 47% processing efficiency',
    link: 'http://equityrelease.royallondon.com',
  },
  {
    period: 'Sep 2022 — Aug 2023',
    dotColor: 'pink',
    initials: 'NT',
    role: 'Software Engineer',
    company: "Nottingham Trent Students' Union",
    desc: "Developed and deployed websites for multiple student union projects, aligning design and functionality requirements with diverse stakeholder needs.",
    link: 'https://www.trentstudents.org/',
  },
  {
    period: 'May 2021 — Feb 2022',
    dotColor: 'indigo',
    initials: 'TI',
    role: 'Software Engineer',
    company: 'THIS IS! Digital Media Group',
    desc: 'Designed interactive web applications for a German startup, ensuring compliance with GDPR regulations and EU accessibility standards.',
    link: 'https://www.thisisdmg.com/en/',
  },
]
```

### Older experience list
Below the timeline, two older roles as a compact `divide-y divide-ink-mid` list:

```
Starter Labs    | Software Engineer | Sep 2020 — May 2021
Unifynd Technologies | Software Engineer | Nov 2018 — Aug 2020
```

Each row: `grid grid-cols-[48px_1fr_auto] gap-5 items-center py-4.5`  
Logo: 42×42px rounded-lg, bg-ink-soft, border, initials  
Title bold `text-sm text-paper`, subtitle `text-xs text-muted`  
Period: `font-mono text-label-xs text-muted text-right`  
Hover: title transitions to `text-yellow`  
Add `data-cursor="link"` to each row.

---

## Phase 6 — Selected Work

**File:** `components/sections/Projects.tsx`

### Design spec
- `border-b border-ink-mid`
- Section padding: `py-24 px-12 max-w-[1080px] mx-auto`

### Heading
```
Things I've
<span className="text-pink">Built</span>
```

### Grid
`grid grid-cols-2 gap-5 mt-10`

**Featured card (Broker Portal) — spans full width:**  
`col-span-2 grid grid-cols-2`

- **Left:** gradient image placeholder `bg-gradient-to-br from-yellow to-yellow-dark min-h-[260px] flex items-center justify-center font-display text-8xl text-ink/10`
- **Right:** project body `p-7`
- Badge: `badge-yellow` with `★ Featured`

**Regular cards:**
Each: `bg-ink-soft border border-ink-mid rounded-[14px] overflow-hidden block hover:-translate-y-1 hover:border-ink-faint transition-all duration-300 ease-expo`

Gradient colours per project:
```
Broker Portal    → from-yellow to-yellow-dark
Equity Release   → from-indigo to-[#2a1a6e]
Daily Stoic      → from-pink to-indigo
Jaron App        → from-[#1a1a2e] to-ink-mid
```

Each card body (`p-7`):
- Eyebrow row: badge + `↗` arrow (`text-ink-faint hover:text-yellow hover:translate(4px,-4px)`)
- Title: `font-display text-[1.6rem] tracking-wide text-paper mb-2.5 group-hover:text-yellow transition-colors`
- Desc: `text-sm text-muted-light leading-relaxed mb-5`
- Tech tags: `flex flex-wrap gap-1.5` of `.tag` elements

Add `data-cursor="card"` to each card.

**Data:**
```ts
const projects = [
  {
    badge: 'Featured', badgeStyle: 'badge-yellow',
    title: 'Broker Portal',
    desc: 'A custom portal for equity release advisors, streamlining the entire case management journey — quotes, KFIs, applications, and secure document upload.',
    tags: ['React', 'Playwright', 'SCSS'],
    gradient: 'from-yellow to-yellow-dark',
    link: 'https://www.youtube.com/watch?v=YpkjyMbBHTg',
    featured: true,
  },
  {
    badge: 'Client', badgeStyle: 'badge-indigo',
    title: 'Equity Release',
    desc: 'Revamped the Responsible Equity Release website to match Royal London brand guidelines.',
    tags: ['Javascript', 'Twig', 'PHP', 'SCSS'],
    gradient: 'from-indigo to-[#2a1a6e]',
    link: 'https://equityrelease.royallondon.com/',
  },
  {
    badge: 'Personal', badgeStyle: 'badge-pink',
    title: 'Daily Stoic Reminders',
    desc: 'Conceptualised, designed and developed a web app for daily stoic quotes and reflection.',
    tags: ['React', 'Firebase', 'Styled Components', 'Netlify'],
    gradient: 'from-pink to-indigo',
    link: 'https://dailystoicreminders.uk/',
  },
  {
    badge: 'Client', badgeStyle: 'badge-ghost',
    title: 'What is wrong with Jaron',
    desc: "Frontend for an online course designed for schools to identify concerning student behaviour and prevent abuse in educational settings.",
    tags: ['WordPress', 'Javascript', 'PHP'],
    gradient: 'from-[#1a1a2e] to-ink-mid',
    link: 'https://www.was-ist-los-mit-jaron.de/',
  },
]
```

---

## Phase 7 — Testimonials

**File:** `components/sections/Testimonials.tsx`

### Design spec
- `border-b border-ink-mid`
- Section padding: `py-24 px-12 max-w-[1080px] mx-auto`

### Heading
```
What They
<span className="text-yellow">Said</span>
```

### Grid
`grid grid-cols-2 gap-5 mt-10`

Each card: `bg-ink-soft border border-ink-mid rounded-[14px] p-8 relative overflow-hidden`  

**Top accent border** (Stack Overflow-inspired coloured top edge):
- Lewis King → `border-t-[3px] border-t-yellow`
- Dan Hopkinson → `border-t-[3px] border-t-pink`
- John Wilkie → `border-t-[3px] border-t-indigo col-span-2 max-w-[640px]`

**Large decorative quote mark:**  
`absolute top-[-10px] right-5 font-display text-[8rem] leading-none text-ink-mid pointer-events-none select-none`  
Character: `"`

**Quote text:** `text-sm leading-[1.85] text-paper/75 mb-6 relative z-10`

**Author row:** `flex items-center gap-3.5`
- Avatar: `40×40px rounded-lg flex items-center justify-center font-display text-base font-bold`
  - Lewis → `bg-yellow text-ink` initials `LK`
  - Dan → `bg-pink text-ink` initials `DH`
  - John → `bg-indigo text-paper` initials `JW`
- Name: `font-bold text-sm text-paper`
- Role: `font-mono text-label-xs text-muted`

**Data:** (use the exact quotes from `allanfernandes.dev/` — they're already in the HTML file)

---

## Phase 8 — Tech Stack

**File:** `components/sections/TechStack.tsx`

### Design spec
- `border-b border-ink-mid`
- Heading section: `py-24 px-12 max-w-[1080px] mx-auto pb-16`
- Marquee rows: full bleed, `pb-16`

### Heading
```
Tools of
the <span className="text-pink">Trade</span>
```

### Two marquee rows

**Row 1** (left → right, 22s):
```
React · Node.js · TypeScript · Next.js · AWS · Docker · Firebase · PostgreSQL
```
Highlighted pills (yellow tint): React, Tailwind CSS  
Highlighted pills (pink tint): TypeScript, Tanstack Query  
Highlighted pills (indigo tint): Docker, Playwright  

**Row 2** (right → left, 28s — `animation-direction: reverse`):
```
Redux · Playwright · SCSS/Sass · Tailwind CSS · Jest · Gatsby · Tanstack Query · Vercel · Sentry
```

Each pill: `inline-flex items-center gap-2 bg-ink-soft border border-ink-mid rounded-btn px-4 py-2.5 font-mono text-label-sm text-muted-light whitespace-nowrap flex-shrink-0 hover:border-yellow hover:text-yellow transition-all`

Highlighted variant adds: `border-yellow/30 text-yellow bg-yellow/5` (or pink/indigo equivalents)

Row wraps in `overflow-hidden`. Inner div `inline-flex gap-2.5 animate-marquee`. Duplicate the items array once for seamless loop. `hover:[animation-play-state:paused]`

---

## Phase 9 — Education & Certifications

**File:** `components/sections/Education.tsx`

### Design spec
- `border-b border-ink-mid`
- Section padding: `py-24 px-12 max-w-[1080px] mx-auto`

### Heading
```
Credentials
& <span className="text-yellow">Certs</span>
```

### Grid
`grid grid-cols-3 gap-5 mt-10`

Each card: `bg-ink-soft border border-ink-mid rounded-card p-7 hover:border-ink-faint hover:-translate-y-0.5 transition-all duration-300 ease-expo`

**Period badge:** `inline-flex items-center gap-2 font-mono text-label-xs text-muted bg-ink border border-ink-mid px-3 py-1.5 rounded-badge w-fit mb-4`
- Coloured dot: cert 1 = yellow, cert 2 = pink, cert 3 = indigo

**Icon placeholder:** `w-13 h-13 rounded-xl bg-ink-mid border border-ink-faint mb-4 flex items-center justify-center font-display text-xl text-muted` — use initials (CSM, MSc, BSc). Replace with actual logos via `<Image>` when available.

**Title:** `font-display text-xl tracking-wide text-paper mb-1.5`  
**Institution:** `text-sm text-muted-light`

**Data:**
```ts
[
  { period: '2025 — 2027', dot: 'yellow', icon: 'CSM', title: 'Certified Scrum Master', place: 'Scrum Alliance', link: 'https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster' },
  { period: '2021 — 2023', dot: 'pink',   icon: 'MSc', title: 'MSc Computer Science',  place: 'Nottingham Trent University', link: 'https://www.ntu.ac.uk/course/science-and-technology/pg/msc-computer-science' },
  { period: '2016 — 2019', dot: 'indigo', icon: 'BSc', title: 'BSc Information Technology', place: "St. Xavier's College", link: 'https://itdept.xaviers.edu/courses/undergraduate' },
]
```

---

## Phase 10 — Blog Preview

**File:** `components/sections/BlogPreview.tsx`

### Design spec
- `border-b border-ink-mid`
- Section padding: `py-24 px-12 max-w-[1080px] mx-auto`

### Heading
```
I Also Write
<span className="text-pink">Sometimes</span>
```

### Layout
`grid grid-cols-2 gap-5 mt-10`

**Left — Featured post card:**  
Full yellow card: `bg-yellow rounded-[14px] p-9 flex flex-col justify-between min-h-[280px] hover:-translate-y-0.5 hover:shadow-[10px_10px_0_rgba(0,0,0,0.15)] transition-all duration-200 ease-spring`  
`box-shadow: 5px 5px 0 rgba(0,0,0,0.1)` default  
- Badge: `inline-flex items-center gap-2 bg-ink text-yellow font-mono text-label-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-badge w-fit mb-5`
- Title: `font-display text-[2rem] text-ink leading-tight mb-3`
- Excerpt: `text-sm text-ink/60 leading-relaxed mb-6`
- Meta: `font-mono text-label-xs text-ink/45`

Add `data-cursor="card"` to the featured card.

**Right — Blog list:**  
`divide-y divide-ink-mid`  
Each item: `grid grid-cols-[1fr_auto] items-center gap-4 py-4.5 hover:opacity-100 group`  
- Tags row: `flex gap-1.5 mb-1.5`
- Tag styles: `code` → indigo tint, `life` → pink tint, default → muted outline
- Title: `font-bold text-sm text-paper group-hover:text-yellow transition-colors`
- Date: `font-mono text-label-xs text-muted whitespace-nowrap`

**Posts to show:**  
Pull from your MDX/markdown blog data. Show 4 posts after the featured one.

---

## Phase 11 — CTA Section

**File:** `components/sections/CTA.tsx`

### Design spec
- `bg-yellow relative overflow-hidden py-20 px-12`
- Same three geometric shapes as hero (pink + indigo + semi-transparent ink)
- Shape sizes reduced to ~80% of hero sizes

### Content (left-aligned, max-w-[640px], relative z-10)
- Label: `font-mono text-label-xs uppercase tracking-widest text-ink/45 mb-4`  "Let's Connect"
- Heading: `font-display text-display-xl text-ink leading-[0.92]`
  ```
  Got a cool
  <span className="bg-ink text-yellow px-2">idea?</span>
  Let's build it.
  ```
- Sub: `text-base text-ink/60 leading-7 max-w-[420px] mb-9`  "Open to new roles, freelance projects, or just a chat about code. Don't be a stranger."
- CTAs:
  ```tsx
  <a href="mailto:allanfernandes@example.com" data-cursor="btn" className="btn-primary">
    Say Hello →
  </a>
  <a href="https://linkedin.com/in/allanmosesfernandes" data-cursor="btn" className="btn-ghost-dark">
    LinkedIn ↗
  </a>
  ```

---

## Phase 12 — Footer

**File:** `components/Footer.tsx`

### Design spec
- `bg-ink border-t border-ink-mid px-12 pt-12 pb-8`

### Top grid
`grid grid-cols-3 gap-10 max-w-[1080px] mx-auto pb-10 border-b border-ink-mid`

**Col 1 — Brand:**  
Logo `AF.` in `font-display text-3xl` (`AF` paper, `.` yellow)  
Tagline: `text-sm text-muted leading-relaxed mt-2` — "Software Engineer building accessible, performant web experiences. Based in London."

**Col 2 — Navigation:**  
Label: `font-mono text-label-xs uppercase tracking-widest text-muted mb-4`  
Links: Home · Projects · Blog · Resume  
`text-sm text-muted-light hover:text-yellow transition-colors`

**Col 3 — Connect:**  
Label same style  
Links: GitHub · LinkedIn · Strava · Email  

### Bottom row
`max-w-[1080px] mx-auto flex justify-between items-center mt-8`  
Left: `font-mono text-label-xs text-muted` — `Created with ❤️ & ☕ by Allan Moses Fernandes 🦝`  
Right: Version pills — `v2` and `v1` linking to `v2.allanfernandes.dev` and `v1.allanfernandes.dev`  
Pill style: `font-mono text-[0.55rem] tracking-wider px-2.5 py-1 rounded-badge border border-ink-mid text-muted hover:border-yellow hover:text-yellow transition-all`

---

## Phase 13 — Blog Listing Page

**File:** `app/blog/page.tsx`  
**Reference:** `blog-listing.html`

### Hero
- Yellow background ghost watermark: `BLOG` text absolutely positioned, `font-display text-[clamp(12rem,22vw,18rem)] text-ink-soft leading-none pointer-events-none select-none tracking-tight`
- Stats row: 3 stats (9 Articles · 3 Topics · ~45 min total read) in `font-display text-[2.2rem]` values + `font-mono text-label-xs` labels

### Filter bar
- Sticky below nav: `sticky top-[68px] z-50 bg-ink/90 backdrop-blur-md border-b border-ink-mid py-5 px-12`
- Filter buttons use `useState` to manage active tag
- Filter buttons: `font-mono text-label-xs uppercase tracking-wider px-3.5 py-1.5 rounded-badge border border-ink-faint text-muted-light hover:border-paper hover:text-paper active:bg-yellow active:text-ink active:border-yellow transition-all`
- On filter change: fade out non-matching cards with `opacity-25 pointer-events-none transition-opacity`

### Featured post card
Render first/latest post with the yellow card treatment from `blog-listing.html`:
- Left: full content, right: decorative code snippet (hard-coded visual, not interactive)
- The code snippet shows a relevant snippet relating to that post's topic
- `data-cursor="card"` on entire card

### Article grid
`grid grid-cols-2 gap-5`  
Latest GitHub Actions article gets `col-span-2` wide card with a right aside panel.  
Each card: `data-cursor="card"`

### Older posts numbered list
`grid grid-cols-[80px_1fr_auto]` per row, numbered `05` `06` etc. in `font-display text-[1.8rem] text-ink-faint`

---

## Phase 14 — Blog Post Page

**File:** `app/blog/[slug]/page.tsx`  
**Reference:** `blog-post.html`

### Reading progress bar
```tsx
// Fixed below nav, height 3px, bg-yellow
// Width controlled by scroll position: scrollTop / (scrollHeight - clientHeight)
// Update in useEffect with scroll listener
```

### Post hero
- Yellow gradient underline on the bottom border: `after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-yellow after:to-transparent`
- Back link: `←` with hover `gap` increase animation
- Title: `font-display text-display-xl` with last word or key term in `text-yellow`
- Meta row: 4 items separated by `border-r border-ink-mid` — Published · Reading Time (yellow) · Author · Series

### Layout
`grid grid-template-columns-[1fr_240px] gap-16 max-w-[1060px] mx-auto px-12 py-14`

### Prose styles
Define in `globals.css` or as Tailwind `prose` override:
```css
.post-body h3 { font-family: var(--font-display); font-size: 1.8rem; ... }
.post-body p  { font-size: 1rem; line-height: 1.85; color: #c8c8c8; }
.post-body a  { color: var(--yellow); border-bottom: 1px solid ... }
.post-body code { font-family: var(--font-mono); background: var(--ink-soft); color: var(--yellow); ... }
.post-body ul li::before { content: '→'; color: var(--yellow); }
```

### Code block component
`components/CodeBlock.tsx` — wraps `<pre>` with:
- Header bar: filename (Space Mono) + language badge + Copy button
- Copy button: `navigator.clipboard.writeText()`, transitions text to "Copied!" for 2s
- Syntax classes: `.ck` (indigo, keywords), `.cs` (yellow, strings), `.cc` (muted italic, comments), `.cp` (pink, properties)

### Callout component
`components/Callout.tsx` — variants: `warning` (yellow left border + yellow/6 bg), `info` (indigo left border + indigo/6 bg)

### TOC sidebar
- `sticky top-[88px]`
- Build TOC from headings by parsing MDX/markdown headers
- Highlight active section using `IntersectionObserver` on `h3[id]` elements
- Clicking a TOC link scrolls smoothly and updates active state

### Post navigation
Previous/Next links at the bottom — `grid grid-cols-2 gap-5`  
Each: dark card that hovers with `border-ink-faint` and `-translate-y-0.5`

---

## Phase 15 — Page Transitions (Optional Enhancement)

Add to `app/layout.tsx` using Next.js `<AnimatePresence>` from Framer Motion, or a simple CSS approach:

```tsx
// Simple CSS approach — add to globals.css:
@keyframes pageIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: none; }
}
main { animation: pageIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
```

---

## Implementation Order

Work through phases **strictly in this order**. Each phase should be committed separately.

```
Phase 0  → Foundation (fonts, Tailwind, globals, cursor, scroll reveal)
Phase 1  → Navigation
Phase 2  → Hero
Phase 3  → Marquee Strip
Phase 4  → About
Phase 5  → Work Experience
Phase 6  → Projects
Phase 7  → Testimonials
Phase 8  → Tech Stack
Phase 9  → Education
Phase 10 → Blog Preview
Phase 11 → CTA
Phase 12 → Footer
Phase 13 → Blog Listing Page
Phase 14 → Blog Post Page
Phase 15 → Page Transitions (if desired)
```

---

## Key Design Rules (never break these)

1. **Geometric shapes always rotate `14deg`** — the SO-inspired shapes in hero and CTA
2. **Hard shadow offset direction is always bottom-right** — `4px 4px 0px`
3. **Hover on hard-shadow buttons = `translate(-2px, -2px)` + increase shadow** — both move together
4. **Yellow is for primary actions and highlights only** — not for body text or decorative use
5. **Pink is for accents and the second visual layer** — blog tags, testimonial borders, trailing dot
6. **Indigo is for the third visual layer** — code tags, stat cards, timeline dots
7. **All section headings use `font-display` (Bebas Neue)** — no exceptions
8. **All metadata, labels, dates, tags use `font-mono` (Space Mono)** — no exceptions
9. **Body copy is always `font-sans` (DM Sans)** — never display or mono for paragraphs
10. **`data-cursor` attributes on every interactive element** — this powers the cursor pop system
11. **Scroll reveal on every section** — use the `.reveal` + `.visible` pattern, not inline animation
12. **No purple gradients, no Inter, no Roboto** — these kill the brand voice
