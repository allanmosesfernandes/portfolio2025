'use client';
import HorizontalScroll from './HorizontalScroll';

const recommendationsData = [
    {
        id: 'rec-1',
        name: 'Lewis King',
        title: 'Head of Software Engineering',
        content: `I've been fortunate to have Allan working in the Responsible development team for the past 18 months and I can't recommend him highly enough.

He is incredibly hardworking, consistently delivers quality work and always demonstrates a "no task is too big" attitude.

Outside of his technical skills, Allan is a genuinely friendly and supportive team member. He brings a positive energy that boosts team morale on a daily basis.

I have no doubt he'll go far in his career & will be an asset to any team or organization fortunate enough to have him.`,
        initials: 'LK',
    },
    {
        id: 'rec-2',
        name: 'Dan Hopkinson',
        title: 'Senior Software Engineer',
        content: `I have had the pleasure of working closely with Allan for one and a half years and he has been an invaluable member of our team. From day one, he demonstrated a strong work ethic, a keen eye for detail, and a genuine passion for delivering high-quality solutions.

One of Allan's greatest strengths is his dedication to continuous learning. Development is an iterative process, and what truly sets him apart is his eagerness to absorb feedback, refine his skills, and consistently improve. His ability to take on challenges with enthusiasm and adaptability has been truly impressive.

Working in a small team with a demanding workload requires both technical expertise and perseverance, and Allan has excelled in both areas. He has consistently shown initiative, problem-solving skills, and a commitment to delivering great work. His collaborative nature and willingness to support his colleagues have made him an essential part of the team.

Allan is a talented and hardworking developer who will be a fantastic addition to any organisation. I have no doubt that he will continue to thrive in his career, and I highly recommend him to any team looking for a skilled and dedicated professional.`,
        initials: 'DH',
    },
    {
        id: 'rec-3',
        name: 'John Wilkie',
        title: 'Innovation Director',
        content:
            "Allan is one of the finest hires I ever made. He is not only a first rate developer, he also has the most positive attitude and outlook of any developer I've ever worked with. His work is always of the highest quality and he gets it done quickly. Nothing is ever too much for Allan. I would recommend him to any business.",
        initials: 'JW',
    },
];

const Recommendations = () => {
    return (
        <div className="mt-8">
            <div className="mb-8 flex items-center gap-4">
                <h3 className="text-3xl font-bold text-black dark:text-white md:text-4xl lg:text-5xl">
                    My co-workers seem to like me
                </h3>
                <a
                    href="https://www.linkedin.com/in/allanmosesfernandes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1 text-sm text-gray-800 transition-colors hover:text-pantone dark:text-gray-300 dark:hover:text-pantone"
                >
                    View on LinkedIn
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                    </svg>
                </a>
            </div>

            <div
                className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                {recommendationsData.map((rec) => (
                    <article
                        key={rec.id}
                        className="min-w-[90%] snap-start rounded-2xl border border-white/10 bg-slate-800/50 p-8 shadow-lg md:min-w-[500px]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-lg font-bold text-indigo-400">
                                {rec.initials}
                            </div>
                            <div>
                                <p className="font-bold text-white">{rec.name}</p>
                                <p className="text-sm text-gray-400">{rec.title}</p>
                            </div>
                        </div>
                        <div className="relative mt-6">
                            <span className="absolute -left-6 -top-3 font-serif text-6xl text-indigo-400 opacity-20">
                                "
                            </span>
                            <p className="relative line-clamp-6 whitespace-pre-line text-sm leading-relaxed text-gray-300">
                                {rec.content}
                            </p>
                        </div>
                    </article>
                ))}
            </div>

            <p className="mt-4 text-center text-xs text-gray-500 opacity-60 md:hidden">
                ↔ Swipe to scroll
            </p>
        </div>
    );
};

export default Recommendations;
