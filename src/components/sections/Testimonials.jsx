const recommendationsData = [
    {
        id: 'rec-1',
        name: 'Lewis King',
        title: 'Head of Software Engineering',
        content: `I've been fortunate to have Allan working in the Responsible development team for the past 18 months and I can't recommend him highly enough. He is incredibly hardworking, consistently delivers quality work and always demonstrates a "no task is too big" attitude. Outside of his technical skills, Allan is a genuinely friendly and supportive team member.`,
        initials: 'LK',
        color: 'border-yellow',
    },
    {
        id: 'rec-2',
        name: 'Dan Hopkinson',
        title: 'Senior Software Engineer',
        content: `I have had the pleasure of working closely with Allan for one and a half years and he has been an invaluable member of our team. One of Allan's greatest strengths is his dedication to continuous learning. His ability to take on challenges with enthusiasm and adaptability has been truly impressive. Allan is a talented and hardworking developer who will be a fantastic addition to any organisation.`,
        initials: 'DH',
        color: 'border-pink',
    },
    {
        id: 'rec-3',
        name: 'John Wilkie',
        title: 'Innovation Director',
        content:
            "Allan is one of the finest hires I ever made. He is not only a first rate developer, he also has the most positive attitude and outlook of any developer I've ever worked with. His work is always of the highest quality and he gets it done quickly. Nothing is ever too much for Allan. I would recommend him to any business.",
        initials: 'JW',
        color: 'border-indigo',
    },
];

const Testimonials = () => {
    return (
        <section className="px-6 md:px-12 lg:px-16 py-section max-w-[1200px] mx-auto">
            <div className="section-label">
                <span className="num">04</span> Kind Words
            </div>

            <h2 className="font-display text-display-lg text-paper mb-10">
                My co-workers seem to <span className="text-yellow">like me.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {recommendationsData.map((rec) => (
                    <div
                        key={rec.id}
                        className={`card border-t-[3px] ${rec.color} ${rec.id === 'rec-3' ? 'md:col-span-2 md:max-w-[640px]' : ''}`}
                    >
                        {/* Decorative quote */}
                        <span className="absolute top-4 right-6 font-display text-[5rem] text-ink-faint/30 leading-none select-none pointer-events-none">
                            &ldquo;
                        </span>

                        <p className="text-sm text-muted-light leading-relaxed mb-6 relative z-10">
                            {rec.content}
                        </p>

                        <div className="flex items-center gap-3 relative z-10">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-label-sm font-bold ${
                                rec.color === 'border-yellow' ? 'bg-yellow/15 text-yellow' :
                                rec.color === 'border-pink' ? 'bg-pink/15 text-pink' :
                                'bg-indigo/15 text-indigo'
                            }`}>
                                {rec.initials}
                            </div>
                            <div>
                                <p className="font-sans font-bold text-sm text-paper">{rec.name}</p>
                                <p className="font-mono text-label-xs text-muted">{rec.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
