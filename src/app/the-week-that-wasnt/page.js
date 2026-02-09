import React from 'react';
import Link from 'next/link';
import { getSortedMusingsData } from '../lib/musings';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "The Week That Wasn't - Allan Fernandes",
    description: 'Weekly musings and reflections by Allan Fernandes.',
};

function getWeekDateRange(year, weekNumber) {
    const startOfYear = new Date(year, 0, 1);
    const dow = startOfYear.getDay();
    const firstDayOffset = (weekNumber - 1) * 7 - dow;
    const start = new Date(year, 0, 1 + firstDayOffset);
    const end = new Date(year, 0, 1 + firstDayOffset + 6);
    return { start, end };
}

function formatDateRange(start, end) {
    const opts = { month: 'short', day: 'numeric' };
    const startStr = start.toLocaleDateString('en-US', opts);
    if (start.getMonth() === end.getMonth()) {
        return `${startStr} – ${end.getDate()}`;
    }
    const endStr = end.toLocaleDateString('en-US', opts);
    return `${startStr} – ${endStr}`;
}

export default async function WeeklyMusingsPage() {
    const musings = await getSortedMusingsData();

    // Group musings by year
    const musingsByYear = musings.reduce((acc, musing) => {
        if (!acc[musing.year]) {
            acc[musing.year] = [];
        }
        acc[musing.year].push(musing);
        return acc;
    }, {});

    const years = Object.keys(musingsByYear).sort((a, b) => b - a);

    return (
        <div className="min-h-screen bg-gray-950 px-6 py-8 text-white sm:px-8 sm:py-12">
            <div className="mx-auto max-w-3xl">
                <Link href="/" className="mb-6 inline-flex items-center text-gray-400 hover:text-white sm:mb-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="mr-2"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z"
                            fill="currentColor"
                        />
                    </svg>
                    Back home
                </Link>

                <h1 className="mb-4 text-4xl font-bold">The Week That Wasn&apos;t</h1>
                <p className="mb-12 text-gray-400">Weekly musings and reflections.</p>

                {musings.length === 0 ? (
                    <p className="text-gray-500">No musings yet. Check back soon!</p>
                ) : (
                    years.map((year) => (
                        <div key={year} className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-300">{year}</h2>
                            <div className="space-y-4">
                                {musingsByYear[year].map((musing) => {
                                    const { start, end } = getWeekDateRange(musing.year, musing.weekNumber);
                                    const dateRange = formatDateRange(start, end);
                                    return (
                                        <Link
                                            key={musing.id}
                                            href={`/the-week-that-wasnt/${musing.year}/${musing.weekNumber}`}
                                            className="group block rounded-lg border border-gray-800 bg-gray-900 p-5 transition-colors hover:border-gray-600 hover:bg-gray-800/80"
                                        >
                                            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500 group-hover:text-gray-400">
                                                {dateRange}
                                            </p>
                                            <h3 className="text-lg font-semibold group-hover:text-white">
                                                {musing.title || `Week ${musing.weekNumber}`}
                                            </h3>
                                            <p className="mt-3 text-right text-xs text-gray-600 group-hover:text-gray-500">
                                                Week {musing.weekNumber}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
