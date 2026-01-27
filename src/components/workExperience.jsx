'use client';
import Image from 'next/image';
import { workJSON } from '@/app/utils';
import HorizontalScroll from './HorizontalScroll';

const WorkExperience = () => {
    const experiences = workJSON.map((work, index) => ({
        ...work,
        color: index === 0 ? '#6366f1' : index === 1 ? '#22c55e' : index === 2 ? '#f97316' : index === 3 ? '#ec4899' : '#8b5cf6',
        highlight: index === 0 ? '+47% efficiency' : 'Full-stack dev'
    }));

    return (
        <HorizontalScroll title="Work Experience">
            {experiences.map((exp) => (
                <WorkCard key={exp.id} {...exp} />
            ))}
        </HorizontalScroll>
    );
};

function WorkCard({ company, role, startDate, endDate, highlight, logo, companyUrl, color, description }) {
    return (
        <a 
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="work-card min-w-[340px] rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl snap-start"
            style={{ 
                background: `linear-gradient(135deg, ${color}15, transparent)`,
                borderColor: `${color}30`
            }}
        >
            <div 
                className="w-14 h-14 rounded-xl mb-5 flex items-center justify-center overflow-hidden"
                style={{ background: `${color}25` }}
            >
                <Image 
                    src={logo} 
                    alt={company}
                    width={40}
                    height={40}
                    className="object-contain"
                />
            </div>
            
            <h3 className="text-xl font-semibold mb-1 text-black dark:text-white">
                {company}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {role} • {startDate} - {endDate}
            </p>
            
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                {description}
            </p>
            
            <div 
                className="inline-block px-4 py-1.5 rounded-full text-xs font-medium"
                style={{ 
                    background: `${color}20`,
                    color: color
                }}
            >
                {highlight}
            </div>
        </a>
    );
}

export default WorkExperience;
