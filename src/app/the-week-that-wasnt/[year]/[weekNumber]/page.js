import { getMusingData } from '@/app/lib/musings';
import { formatDate } from '@/app/utils';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { year, weekNumber } = await params;
    return {
        title: `Week ${weekNumber}, ${year} — The Week That Wasn't`,
        description: `Weekly musing for week ${weekNumber} of ${year}`,
    };
}

export default async function WeeklyMusingPage({ params }) {
    const { year, weekNumber } = await params;
    const musing = await getMusingData(year, weekNumber);

    return (
        <>
            <main className="min-h-screen">
                <div className="max-w-[760px] mx-auto px-6 md:px-12 py-16">
                    <Link
                        href="/the-week-that-wasnt"
                        className="inline-flex items-center gap-2 font-mono text-label-sm uppercase tracking-widest text-muted hover:text-yellow hover:gap-3 transition-all mb-9"
                    >
                        <span>←</span> Back to all musings
                    </Link>

                    <article>
                        <header className="mb-10">
                            <h1 className="font-display text-display-xl text-paper mb-3">
                                Week {musing.weekNumber}, <span className="text-yellow">{musing.year}</span>
                            </h1>
                            {musing.date && (
                                <p className="font-mono text-label-sm text-muted">{formatDate(musing.date)}</p>
                            )}
                        </header>

                        <div
                            className="post-body"
                            dangerouslySetInnerHTML={{ __html: musing.contentHtml }}
                        />

                        <div className="mt-12 pt-8 border-t border-ink-mid">
                            <Link
                                href="/the-week-that-wasnt"
                                className="font-mono text-label-sm text-muted hover:text-yellow transition-colors uppercase tracking-widest"
                            >
                                ← Back to all musings
                            </Link>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
}
