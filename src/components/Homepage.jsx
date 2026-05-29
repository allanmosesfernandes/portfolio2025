import Link from 'next/link';
import Image from 'next/image';
import { workJSON, formatDate } from '@/app/utils';

/* ── Selected work (compact rows) ──────────────────────────── */
const selectedWork = [
    {
        title: 'Royal London — Broker Portal',
        meta: 'Case management for equity-release advisors, end to end.',
        tags: 'React · TS · Playwright',
        href: 'https://www.youtube.com/watch?v=YpkjyMbBHTg',
    },
    {
        title: 'Royal London — Equity Release',
        meta: 'Rebuilt to the Royal London brand for advisers and users.',
        tags: 'Twig · PHP · SCSS',
        href: 'https://equityrelease.royallondon.com/',
    },
    {
        title: 'Daily Stoic Reminders',
        meta: 'A web app that sends a stoic prompt to reflect on, daily.',
        tags: 'React · Firebase',
        href: 'https://dailystoicreminders.uk/',
    },
];

/* ── Tools of the trade ────────────────────────────────────── */
const stack = [
    { k: 'Languages', v: ['TypeScript', 'JavaScript', 'PHP', 'SQL'] },
    { k: 'Frontend', v: ['React', 'Next.js', 'Gatsby', 'Redux', 'Tailwind', 'Sass'] },
    { k: 'Backend & Data', v: ['Node.js', 'PostgreSQL', 'MongoDB', 'MySQL', 'Firebase'] },
    {
        k: 'Infra & Testing',
        v: ['AWS', 'Docker', 'Vercel', 'Vitest', 'Playwright', 'Jest', 'Sentry'],
    },
];

/* ── Experience (one line each), sourced from real work data ── */
const experienceNotes = {
    PrinterPix: 'Storefront & check out customisation',
    'Royal London Equity Release': 'Equity release systems',
    "Nottingham Trent Students' Union": 'Student union projects',
    'THIS IS! Digital Media Group': 'Interactive web apps',
};
const experienceUrls = {
    PrinterPix: 'https://printerpix.co.uk/',
    'Royal London Equity Release': 'https://www.royallondon.com/',
    "Nottingham Trent Students' Union": 'https://www.trentstudents.org/',
    'THIS IS! Digital Media Group': 'https://www.thisisdmg.com/en/',
};

const experience = workJSON.slice(0, 4).map((job) => ({
    yr: `${job.startDate} — ${job.endDate === 'Present' ? 'Now' : job.endDate}`,
    role: job.role,
    note: experienceNotes[job.company] || '',
    where: job.company.replace(' Equity Release', '').replace('! Digital Media Group', ''),
    href: experienceUrls[job.company] || job.companyUrl,
}));

/* ── Recommendations (trimmed one-liners) ──────────────────── */
// These recommendations live on Allan's LinkedIn profile.
const LINKEDIN_RECOMMENDATIONS =
    'https://www.linkedin.com/in/allanmosesfernandes/details/recommendations/';
const recommendations = [
    {
        quote: 'No task is too big. Consistently delivers quality work, and a genuinely supportive teammate.',
        who: 'Lewis King',
        role: 'Head of Software Engineering',
        href: LINKEDIN_RECOMMENDATIONS,
    },
    {
        quote: 'Takes on every challenge with enthusiasm and adaptability. Truly impressive to work alongside.',
        who: 'Dan Hopkinson',
        role: 'Senior Software Engineer',
        href: LINKEDIN_RECOMMENDATIONS,
    },
    {
        quote: 'One of the finest hires I ever made. Highest-quality work, and he gets it done quickly.',
        who: 'John Wilkie',
        role: 'Innovation Director',
        href: LINKEDIN_RECOMMENDATIONS,
    },
];

const Homepage = ({ posts = [] }) => {
    return (
        <div className="afmin">
            <div className="wrap">
                {/* ── HERO ────────────────────────────────────── */}
                <header className="hero">
                    <div>
                        <div className="eyebrow rise d2">London, UK · Software Engineer</div>
                        <h1 className="rise d2">
                            Building cool
                            <br />
                            things on the
                            <br />
                            <em>internet.</em>
                        </h1>
                        <p className="lede rise d3 max-w-[100%]">
                            Hi, my name is <span className="golden">Allan Fernandes.</span>
                            <br /> I'm a <span className="golden">software engineer</span> who
                            builds (and occasionally designs) accessible, human-centred things for
                            the web. <br />
                            <br />
                            Currently working at{' '}
                            <a
                                href="https://www.printerpix.co.uk/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="golden"
                            >
                                Printerpix
                            </a>
                            , where millions of people turn their favourite photos into something
                            they can actually hold. <br />
                            <br />
                            When I'm not online you'll find me playing football,{' '}
                            <a
                                href="https://strava.com/athletes/112155710"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="golden"
                            >
                                running
                            </a>
                            , or writing about what I break and fix.
                            {/* Five years writing software that cares about accessibility and the people on
                            the other side of the screen. Currently at{' '}
                            <a href="https://www.printerpix.co.uk/" target="_blank" rel="noopener noreferrer">
                                Printerpix
                            </a> */}
                            .
                        </p>
                        <div className="cta rise d3">
                            <a href="#work">
                                View selected work <span className="arr">→</span>
                            </a>
                            <Link className="ghost" href="/blog">
                                Read the blog <span className="arr">→</span>
                            </Link>
                        </div>
                    </div>

                    <div className="figframe rise d4">
                        <div className="figorb">
                            <Image
                                src="/vitruvian-noir.png"
                                alt="Vitruvian-style illustration of Allan Fernandes"
                                width={600}
                                height={600}
                                priority
                            />
                        </div>
                        <span className="figcorner tl" />
                        <span className="figcorner tr" />
                        <span className="figcorner bl" />
                        <span className="figcorner br" />
                    </div>
                </header>

                {/* ── STATS ───────────────────────────────────── */}
                <div className="stats rise d5">
                    <div className="stat">
                        <b>50+</b>
                        <span>Unfinished side projects</span>
                    </div>
                    <div className="stat">
                        <b>∞</b>
                        <span>Espressos</span>
                    </div>
                    <Link
                        className="stat stat-link"
                        href="/blog/how-ai-helped-save-a-production-disaster"
                    >
                        <b>1+</b>
                        <span>Prod disaster, survived</span>
                    </Link>
                </div>

                {/* ── SELECTED WORK ───────────────────────────── */}
                <section id="work" className="work">
                    <div className="shead">
                        <span className="snum">01</span>
                        <h2>
                            Selected <em>work</em>.
                        </h2>
                    </div>

                    {selectedWork.map((item, i) => (
                        <a
                            key={item.title}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="idx">{String(i + 1).padStart(3, '0')}</span>
                            <span>
                                <div className="title">{item.title}</div>
                                <div className="meta">{item.meta}</div>
                            </span>
                            <span className="tags">
                                {item.tags} &nbsp;<span className="arr">→</span>
                            </span>
                        </a>
                    ))}
                </section>

                {/* ── STACK ───────────────────────────────────── */}
                <section id="stack" className="stack">
                    <div className="shead">
                        <span className="snum">02</span>
                        <h2>
                            Tools of the <em>trade</em>.
                        </h2>
                    </div>
                    {stack.map((group) => (
                        <div className="line" key={group.k}>
                            <div className="k">{group.k}</div>
                            <div className="v">
                                {group.v.map((tool) => (
                                    <span key={tool}>{tool}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                {/* ── EXPERIENCE ──────────────────────────────── */}
                <section id="exp" className="exp">
                    <div className="shead">
                        <span className="snum">03</span>
                        <h2>
                            Where I&apos;ve <em>worked</em>.
                        </h2>
                    </div>
                    {experience.map((job) => (
                        <div className="row" key={`${job.where}-${job.yr}`}>
                            <div className="yr">{job.yr}</div>
                            <div className="role">
                                <b>{job.role}</b> {job.note && <span>· {job.note}</span>}
                            </div>
                            <div className="where">
                                {job.href ? (
                                    <a href={job.href} target="_blank" rel="noopener noreferrer">
                                        {job.where}
                                    </a>
                                ) : (
                                    job.where
                                )}
                            </div>
                        </div>
                    ))}
                </section>

                {/* ── RECOMMENDATIONS ─────────────────────────── */}
                <section id="recs">
                    <div className="shead">
                        <span className="snum">04</span>
                        <h2>
                            My <em>co-workers</em> seem to <em>like</em> me.
                        </h2>
                        <a
                            className="shead-link"
                            href={LINKEDIN_RECOMMENDATIONS}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on LinkedIn <span className="arr">↗</span>
                        </a>
                    </div>
                    <div className="recs">
                        {recommendations.map((rec) => (
                            <a
                                className="rec"
                                key={rec.who}
                                href={rec.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="mark">&ldquo;</span>
                                <p>{rec.quote}</p>
                                <div className="who">
                                    <b>{rec.who}</b>
                                    {rec.role}
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* ── WRITING ─────────────────────────────────── */}
                {posts.length > 0 && (
                    <section id="writing" className="work writing">
                        <div className="shead">
                            <span className="snum">05</span>
                            <h2>
                                I also <em>write</em> sometimes.
                            </h2>
                            <Link className="shead-link" href="/blog">
                                View all <span className="arr">→</span>
                            </Link>
                        </div>

                        {posts.slice(0, 4).map((post, i) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`}>
                                <span className="idx">{String(i + 1).padStart(3, '0')}</span>
                                <span>
                                    <div className="title">{post.title}</div>
                                    {post.summary && <div className="meta">{post.summary}</div>}
                                </span>
                                <span className="tags">
                                    {formatDate(post.date)}
                                    {post.readingTime ? ` · ${post.readingTime} min` : ''} &nbsp;
                                    <span className="arr">→</span>
                                </span>
                            </Link>
                        ))}

                        {/* mobile-only: View all moves below the list */}
                        <Link className="viewall-mobile" href="/blog">
                            View all articles <span className="arr">→</span>
                        </Link>
                    </section>
                )}
            </div>

            {/* ── FOOTER ──────────────────────────────────────── */}
            <footer>
                <div className="wrap">
                    <div className="fgrid">
                        <div className="fbrand">
                            <div className="logo">
                                AF<span>.</span>
                            </div>
                            <p>Software engineer building cool things on the internet.</p>
                        </div>
                        <div>
                            <h4>Latest writing</h4>
                            {posts.slice(0, 2).map((post) => (
                                <Link key={post.slug} href={`/blog/${post.slug}`}>
                                    {post.title} →
                                </Link>
                            ))}
                            <Link href="/blog">All articles →</Link>
                        </div>
                        <div>
                            <h4>Elsewhere</h4>
                            <a
                                href="https://github.com/allanmosesfernandes"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                            <a
                                href="https://www.linkedin.com/in/allanmosesfernandes/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                            <a href="mailto:allanmosesfernandes@gmail.com">Email</a>
                        </div>
                    </div>
                    <div className="fnote">
                        <span>Created with love &amp; coffee.</span>
                        <span>
                            Travel back in time:{' '}
                            <a
                                href="https://v2.allanfernandes.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                v2
                            </a>
                            {' · '}
                            <a
                                href="https://v1.allanfernandes.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                v1
                            </a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;
