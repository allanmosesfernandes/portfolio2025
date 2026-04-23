import { educationJSON } from '@/app/utils';
import Link from 'next/link';

const dotColors = ['bg-yellow', 'bg-pink', 'bg-indigo'];
const initialsMap = {
    'Certified Scrum Master': 'CSM',
    'MSc Computer Science': 'MSc',
    'BSc Information Technology': 'BSc',
};

const Education = () => {
    return (
        <section className="px-6 md:px-12 lg:px-16 py-section max-w-[1200px] mx-auto">
            <div className="section-label">
                <span className="num">06</span> Education
            </div>

            <h2 className="font-display text-display-lg text-paper mb-10">
                Credentials & <span className="text-yellow">Certs.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {educationJSON.map((edu, i) => (
                    <Link
                        key={edu.id}
                        href={edu.url}
                        target="_blank"
                        className="card group hover:border-ink-faint hover:-translate-y-0.5 transition-all"
                    >
                        {/* Period badge */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`w-2 h-2 rounded-full ${dotColors[i]}`}></span>
                            <span className="font-mono text-label-xs uppercase tracking-widest text-muted">
                                {edu.year}
                            </span>
                        </div>

                        {/* Icon initials */}
                        <div className={`w-12 h-12 rounded-card flex items-center justify-center font-display text-xl mb-4 ${
                            i === 0 ? 'bg-yellow/10 text-yellow' :
                            i === 1 ? 'bg-pink/10 text-pink' :
                            'bg-indigo/10 text-indigo'
                        }`}>
                            {initialsMap[edu.university] || edu.university.substring(0, 2)}
                        </div>

                        <h3 className="font-display text-display-md text-paper group-hover:text-yellow transition-colors mb-1">
                            {edu.university}
                        </h3>
                        <p className="text-sm text-muted">{edu.course}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Education;
