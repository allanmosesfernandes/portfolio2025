import React from 'react';
import Link from 'next/link';
import { getSortedMusingsData } from '../lib/musings';

export const metadata = {
    title: "The Week That Wasn't - Allan Fernandes",
    description: 'Weekly musings and reflections by Allan Fernandes.',
};

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
        <div className="min-h-screen bg-gray-950 px-4 py-12 text-white">
            <div className="mx-auto max-w-3xl">
                <Link href="/" className="mb-8 inline-flex items-center text-gray-400 hover:text-white">
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
                            <ul className="space-y-3">
                                {musingsByYear[year].map((musing) => (
                                    <li key={musing.id}>
                                        <Link
                                            href={`/the-week-that-wasnt/${musing.year}/${musing.weekNumber}`}
                                            className="group flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 transition-colors hover:border-gray-700 hover:bg-gray-800"
                                        >
                                            <span className="font-medium">Week {musing.weekNumber}</span>
                                            <span className="text-sm text-gray-500 group-hover:text-gray-400">
                                                {musing.date
                                                    ? new Date(musing.date).toLocaleDateString('en-US', {
                                                          month: 'short',
                                                          day: 'numeric',
                                                      })
                                                    : ''}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
