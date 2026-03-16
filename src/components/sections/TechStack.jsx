const techStack = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Typescript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
    { name: 'Jest', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg' },
    { name: 'Playwright', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg' },
    { name: 'Sass', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
    { name: 'Gatsby', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gatsby/gatsby-original.svg' },
    { name: 'Sentry', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sentry/sentry-original.svg' },
    { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Storybook', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/storybook/storybook-original.svg' },
];

const TechStack = () => {
    return (
        <section className="py-section">
            <div className="px-6 md:px-12 lg:px-16 max-w-[1200px] mx-auto">
                <div className="section-label">
                    <span className="num">02</span> Tech Stack
                </div>
                <h2 className="font-display text-display-lg text-paper mb-4">
                    Tools of the <span className="text-yellow">Trade.</span>
                </h2>
                <p className="text-muted-light leading-relaxed max-w-[600px] mb-10">
                    Languages, frameworks, and tools I&apos;ve worked with hands-on. I won&apos;t claim mastery in all of them, but I&apos;m always diving into something new.
                </p>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {techStack.map((tech) => (
                        <div
                            key={tech.name}
                            className="flex flex-col items-center gap-3 p-4 rounded-card border border-ink-mid bg-ink-soft/50 hover:border-yellow/40 hover:bg-yellow/5 transition-all group"
                            data-cursor="card"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                width={36}
                                height={36}
                                className="w-9 h-9 opacity-70 group-hover:opacity-100 transition-opacity"
                            />
                            <span className="font-mono text-label-xs text-muted group-hover:text-paper transition-colors text-center">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
