'use client';
import { useState } from 'react';
const recommendationsData = [
    {
        id: Date.now(),
        name: 'Lewis King',
        title: 'Head of Software Engineering',
        content: `I've been fortunate to have Allan working in the Responsible development team for the past 18 months and I can't recommend him highly enough.

            He is incredibly hardworking, consistently delivers quality work and always demonstrates a "no task is too big" attitude.

            Outside of his technical skills, Allan is a genuinely friendly and supportive team member. He brings a positive energy that boosts team morale on a daily basis.

            I have no doubt he'll go far in his career & will be an asset to any team or organization fortunate enough to have him.`,
        initials: 'LK',
    },
    {
        id: Date.now(),
        name: 'Dan Hopkinson',
        title: 'Senior Software Engineer',
        content: `I have had the pleasure of working closely with Allan for one and a half years and he has been an invaluable member of our team. From day one, he demonstrated a strong work ethic, a keen eye for detail, and a genuine passion for delivering high-quality solutions.

        One of Allan’s greatest strengths is his dedication to continuous learning. Development is an iterative process, and what truly sets him apart is his eagerness to absorb feedback, refine his skills, and consistently improve. His ability to take on challenges with enthusiasm and adaptability has been truly impressive.

        Working in a small team with a demanding workload requires both technical expertise and perseverance, and Allan has excelled in both areas. He has consistently shown initiative, problem-solving skills, and a commitment to delivering great work. His collaborative nature and willingness to support his colleagues have made him an essential part of the team.

        Allan is a talented and hardworking developer who will be a fantastic addition to any organisation. I have no doubt that he will continue to thrive in his career, and I highly recommend him to any team looking for a skilled and dedicated professional.`,
        initials: 'DH',
    },
    {
        id: Date.now(),
        name: 'John Wilkie',
        title: 'Innovation Director',
        content:
            "Allan is one of the finest hires I ever made. He is not only a first rate developer, he also has the most positive attitude and outlook of any developer I've ever worked with. His work is always of the highest quality and he gets it done quickly. Nothing is ever too much for Allan. I would recommend him to any business.",
        initials: 'JW',
    },
];

const Recommendations = () => {
    const [showAll, setShowAll] = useState(false);
    const recommendationsToShow = showAll ? recommendationsData : recommendationsData.slice(0, 1);

    return (
        <div className="mt-20">
            <div className="mb-8 flex items-center gap-4">
                <h3 className="text-2xl font-bold text-pantone">Recommendations</h3>
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

            <div className="space-y-8">
                {recommendationsToShow.map((rec) => (
                    <article key={rec.id} className="rounded-lg bg-slate-800 p-8 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 text-lg font-bold text-white">
                                {rec.initials}
                            </div>
                            <div>
                                <p className="font-bold text-white">{rec.name}</p>
                                <p className="text-sm text-gray-400">{rec.title}</p>
                            </div>
                        </div>
                        <div className="relative mt-6">
                            <span className="absolute -left-7 -top-3 font-serif text-7xl text-gray-100 opacity-20">
                                “
                            </span>
                            <p className="relative whitespace-pre-line text-gray-300">
                                {rec.content}
                            </p>{' '}
                        </div>
                    </article>
                ))}
            </div>

            {recommendationsData.length > 1 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-md relative mx-auto mb-10 mt-8 flex h-fit justify-center rounded-full bg-black px-4 py-2 font-medium text-white transition-all dark:bg-white dark:text-black"
                >
                    Show {showAll ? 'less' : 'more'}
                </button>
            )}
        </div>
    );
};

export default Recommendations;
