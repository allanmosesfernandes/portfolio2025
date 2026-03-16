const items = [
    { text: 'Software Engineer', color: 'bg-yellow' },
    { text: '5+ Years Experience', color: 'bg-pink' },
    { text: 'React & Next.js', color: 'bg-indigo' },
    { text: 'Accessibility First', color: 'bg-yellow' },
    { text: 'TypeScript', color: 'bg-pink' },
    { text: 'Node.js', color: 'bg-indigo' },
    { text: 'Certified Scrum Master', color: 'bg-yellow' },
    { text: 'AWS & Cloud', color: 'bg-pink' },
];

const MarqueeStrip = () => {
    const doubled = [...items, ...items];

    return (
        <div className="bg-ink border-y border-ink-mid py-3.5 overflow-hidden whitespace-nowrap marquee-container">
            <div className="flex animate-marquee" style={{ animationDuration: '28s' }}>
                {doubled.map((item, i) => (
                    <span key={i} className="flex items-center gap-3 mx-6 font-mono text-label-sm tracking-wider uppercase text-muted-light shrink-0">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.color}`}></span>
                        {item.text}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MarqueeStrip;
