import { getPostData } from '@/app/lib/posts';
import { formatDate } from '@/app/utils';
import Link from 'next/link';
import ScrollIndicator from './ScrollIndicator';
import SocialShareComponent from '../SocialShareComponent';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const postData = await getPostData(slug);

    return {
        title: `${postData.title} — Allan Fernandes`,
        description: postData.summary,
        openGraph: {
            title: `${postData.title} — Allan Fernandes`,
            description: postData.summary,
            url: `https://www.allanfernandes.dev/blog/${postData.slug}`,
            type: 'article',
            images: [
                {
                    url: `https://www.allanfernandes.dev${postData.image}`,
                    alt: postData.title,
                },
            ],
            article: {
                publishedTime: postData.date,
                tags: postData.tags,
            },
        },
        twitter: {
            card: 'summary_large_image',
            title: `${postData.title} — Allan Fernandes`,
            description: postData.summary,
            images: [`https://www.allanfernandes.dev${postData.image}`],
        },
    };
}

export default async function PostPage({ params }) {
    const { slug } = await params;
    const postData = await getPostData(slug);

    return (
        <>
            <ScrollIndicator />

            {/* Post Hero */}
            <header className="px-6 md:px-12 py-16 md:py-20 border-b border-ink-mid relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-yellow to-transparent"></div>
                <div className="max-w-[760px] mx-auto">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 font-mono text-label-sm uppercase tracking-widest text-muted hover:text-yellow hover:gap-3 transition-all mb-9"
                    >
                        <span>←</span> Back to all posts
                    </Link>

                    {/* Tags */}
                    {postData.tags && (
                        <div className="flex gap-2 mb-5 animate-fade-up">
                            {postData.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="font-mono text-label-sm font-bold uppercase tracking-wide px-2.5 py-1 rounded-badge border border-indigo/30 text-indigo bg-indigo/[0.12]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.95] tracking-[0.01em] mb-5 animate-fade-up animate-delay-100">
                        {postData.title}
                    </h1>

                    {postData.summary && (
                        <p className="text-lg text-muted-light leading-relaxed mb-8 animate-fade-up animate-delay-200">
                            {postData.summary}
                        </p>
                    )}

                    {/* Meta row */}
                    <div className="flex items-center gap-0 pt-5 border-t border-ink-mid flex-wrap animate-fade-up animate-delay-300">
                        <div className="flex flex-col gap-1 pr-8 mr-8 border-r border-ink-mid">
                            <span className="font-mono text-[0.55rem] uppercase tracking-widest text-muted">Published</span>
                            <span className="font-mono text-label-md font-bold text-paper">{formatDate(postData.date)}</span>
                        </div>
                        {postData.readingTime && (
                            <div className="flex flex-col gap-1 pr-8 mr-8 border-r border-ink-mid">
                                <span className="font-mono text-[0.55rem] uppercase tracking-widest text-muted">Reading Time</span>
                                <span className="font-mono text-label-md font-bold text-yellow">{postData.readingTime} min</span>
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-[0.55rem] uppercase tracking-widest text-muted">Author</span>
                            <span className="font-mono text-label-md font-bold text-paper">Allan Fernandes</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Post body */}
            <div className="max-w-[760px] mx-auto px-6 md:px-12 py-14">
                <article className="post-body" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

                {/* Share */}
                <div className="border-t border-ink-mid pt-8 mt-12">
                    <SocialShareComponent
                        shareURL={`https://www.allanfernandes.dev/blog/${postData.slug}`}
                        title={postData.title}
                        summary={postData.summary}
                    />
                </div>

                {/* Back link */}
                <div className="mt-12 pt-8 border-t border-ink-mid text-center">
                    <Link href="/blog" className="font-mono text-label-sm text-muted hover:text-yellow transition-colors uppercase tracking-widest">
                        ← Back to all posts
                    </Link>
                </div>
            </div>
        </>
    );
}
