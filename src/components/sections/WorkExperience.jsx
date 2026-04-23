import { workJSON } from '@/app/utils';

const mainJobs = workJSON.slice(0, 3);
const olderJobs = workJSON.slice(0, 3);

const dotColors = ['bg-yellow', 'bg-pink', 'bg-indigo'];
const initialsMap = {
    'PrinterPix': 'PP',
    'Royal London Equity Release': 'RL',
    "Nottingham Trent Students' Union": 'NT',
    'THIS IS! Digital Media Group': 'TI',
};

const WorkExperience = () => {
    return (
        <section id="experience" className="px-6 md:px-12 lg:px-16 py-section max-w-[1200px] mx-auto">
            <div className="section-label">
                <span className="num">03</span> Experience
            </div>

            <h2 className="font-display text-display-lg text-paper mb-10">
                Where I&apos;ve <span className="text-yellow">Worked.</span>
            </h2>

            {/* Timeline grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {mainJobs.map((job, i) => (
                    <div key={job.id} className="card relative">
                        {/* Date badge */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`w-2 h-2 rounded-full ${dotColors[i]}`}></span>
                            <span className="font-mono text-label-xs uppercase tracking-widest text-muted">
                                {job.startDate} — {job.endDate}
                            </span>
                        </div>

                        {/* Logo initials */}
                        <div className={`w-12 h-12 rounded-card flex items-center justify-center font-display text-xl mb-4 ${
                            i === 0 ? 'bg-yellow/10 text-yellow' :
                            i === 1 ? 'bg-pink/10 text-pink' :
                            'bg-indigo/10 text-indigo'
                        }`}>
                            {initialsMap[job.company] || job.company.substring(0, 2).toUpperCase()}
                        </div>

                        <h3 className="font-display text-display-md text-paper mb-1">{job.role}</h3>
                        <p className="font-sans text-sm text-muted-light mb-3">{job.company}</p>
                        <p className="text-sm text-muted leading-relaxed">{job.description}</p>

                        {i === 0 && (
                            <span className="badge-yellow mt-4 text-label-xs">
                                Current Role
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* Older roles */}
            {olderJobs.length > 0 && (
                <div className="border-t border-ink-mid pt-6">
                    <p className="font-mono text-label-xs uppercase tracking-widest text-muted mb-4">Previous Roles</p>
                    {olderJobs.map((job) => (
                        <a
                            key={job.id}
                            href={job.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between py-3 border-b border-ink-mid hover:bg-ink-soft px-2 -mx-2 rounded transition-colors group"
                            data-cursor="link"
                        >
                            <div>
                                <p className="font-sans font-medium text-paper group-hover:text-yellow transition-colors">{job.role}</p>
                                <p className="text-sm text-muted">{job.company}</p>
                            </div>
                            <span className="font-mono text-label-xs text-muted">{job.startDate} — {job.endDate}</span>
                        </a>
                    ))}
                </div>
            )}
        </section>
    );
};

export default WorkExperience;
