import Link from 'next/link';
import { formatDate } from '@/app/utils';

const BlogPreview = ({ posts }) => {
    if (!posts || posts.length === 0) return null;

    const featured = posts[0];
    const listPosts = posts.slice(1, 5);

    return (
        <section className="px-6 md:px-12 lg:px-16 py-section max-w-[1200px] mx-auto">
            <div className="section-label">
                <span className="num">07</span> Blog
            </div>

            <div className="flex items-end justify-between mb-10">
                <h2 className="font-display text-display-lg text-paper">
                    I Also Write <span className="text-yellow">Sometimes.</span>
                </h2>
                <Link
                    href="/blog"
                    className="font-mono text-label-sm text-muted hover:text-yellow transition-colors uppercase tracking-widest hidden md:block"
                >
                    All Articles →
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Featured post */}
                <Link
                    href={`/blog/${featured.slug}`}
                    className="card-featured group relative p-8"
                    data-cursor="card"
                >
                    <span className="badge bg-ink text-yellow mb-4">
                        ★ Latest
                    </span>
                    <h3 className="font-display text-display-md text-ink mb-3 group-hover:opacity-80 transition-opacity">
                        {featured.title}
                    </h3>
                    <p className="text-sm text-ink/60 line-clamp-2 mb-6">
                        {featured.summary || 'Click to read more...'}
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                        <span className="font-mono text-label-xs text-ink/50">{formatDate(featured.date)}</span>
                        {featured.readingTime && (
                            <span className="font-mono text-label-xs text-ink/50">{featured.readingTime} min</span>
                        )}
                    </div>
                </Link>

                {/* Post list */}
                <div className="flex flex-col gap-0">
                    {listPosts.map((post, i) => (
                        <Link
                            key={post.id || i}
                            href={`/blog/${post.slug}`}
                            className="flex flex-col py-4 border-b border-ink-mid hover:bg-ink-soft px-3 -mx-3 rounded transition-colors group"
                        >
                            <div className="flex gap-2 mb-2">
                                {post.tags?.slice(0, 2).map((tag, j) => (
                                    <span key={j} className="tag !text-[0.55rem]">{tag}</span>
                                ))}
                            </div>
                            <p className="font-sans font-bold text-paper group-hover:text-yellow transition-colors mb-1">
                                {post.title}
                            </p>
                            <span className="font-mono text-label-xs text-muted">{formatDate(post.date)}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-6 text-center md:hidden">
                <Link href="/blog" className="btn-ghost">All Articles →</Link>
            </div>
        </section>
    );
};

export default BlogPreview;
