import { getMusingData } from '@/app/lib/musings';
import { formatDate } from '@/app/utils';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { year, weekNumber } = await params;

    return {
        title: `Week ${weekNumber}, ${year} - The Week That Wasn't`,
        description: `Weekly musing for week ${weekNumber} of ${year}`,
    };
}

export default async function WeeklyMusingPage({ params }) {
    const { year, weekNumber } = await params;
    const musing = await getMusingData(year, weekNumber);

    return (
        <div className="min-h-screen bg-gray-950 px-4 py-8 text-white sm:px-8 sm:py-12">
            <div className="mx-auto max-w-3xl">
                <Link
                    href="/the-week-that-wasnt"
                    className="mb-6 inline-flex items-center text-gray-400 hover:text-white sm:mb-8"
                >
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
                    Back to all musings
                </Link>

                <article className="blog-article">
                    <header className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
                            Week {musing.weekNumber}, {musing.year}
                        </h1>
                        <p className="text-gray-400">
                            {musing.date ? formatDate(musing.date) : ''}
                        </p>
                    </header>

                    <div
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: musing.contentHtml }}
                    />

                    <div className="mt-12 border-t border-gray-800 pt-8">
                        <Link
                            href="/the-week-that-wasnt"
                            className="text-gray-400 hover:text-white"
                        >
                            &larr; Back to all musings
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}
