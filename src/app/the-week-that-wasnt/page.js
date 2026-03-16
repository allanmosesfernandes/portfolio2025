import React from 'react';
import Link from 'next/link';
import { getSortedMusingsData } from '../lib/musings';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "The Week That Wasn't — Allan Fernandes",
    description: 'Weekly musings and reflections by Allan Fernandes.',
};

export default async function WeeklyMusingsPage() {
    const musings = await getSortedMusingsData();

    const musingsByYear = musings.reduce((acc, musing) => {
        if (!acc[musing.year]) acc[musing.year] = [];
        acc[musing.year].push(musing);
        return acc;
    }, {});

    const years = Object.keys(musingsByYear).sort((a, b) => b - a);

    return (
        <>
            <main className="min-h-screen">
                <div className="max-w-[760px] mx-auto px-6 md:px-12 py-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 font-mono text-label-sm uppercase tracking-widest text-muted hover:text-yellow hover:gap-3 transition-all mb-9"
                    >
                        <span>←</span> Back home
                    </Link>

                    <h1 className="font-display text-display-xl text-paper mb-3">
                        The Week That <span className="text-yellow">Wasn&apos;t</span>
                    </h1>
                    <p className="text-muted-light mb-12">Weekly musings and reflections.</p>

                    {musings.length === 0 ? (
                        <p className="text-muted">No musings yet. Check back soon!</p>
                    ) : (
                        years.map((year) => (
                            <div key={year} className="mb-10">
                                <h2 className="font-display text-display-md text-muted-light mb-4">{year}</h2>
                                <div className="flex flex-col">
                                    {musingsByYear[year].map((musing) => (
                                        <Link
                                            key={musing.id}
                                            href={`/the-week-that-wasnt/${musing.year}/${musing.weekNumber}`}
                                            className="flex items-center justify-between py-3.5 border-b border-ink-mid hover:bg-ink-soft px-3 -mx-3 rounded transition-colors group"
                                        >
                                            <span className="font-sans font-medium text-paper group-hover:text-yellow transition-colors">
                                                Week {musing.weekNumber}
                                            </span>
                                            <span className="font-mono text-label-xs text-muted group-hover:text-muted-light">
                                                {musing.date
                                                    ? new Date(musing.date).toLocaleDateString('en-US', {
                                                          month: 'short',
                                                          day: 'numeric',
                                                      })
                                                    : ''}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
