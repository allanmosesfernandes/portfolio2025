import { getPostData } from '@/app/lib/posts';
import { formatDate } from '@/app/utils';
import Link from 'next/link';
import ScrollIndicator from './ScrollIndicator';
import SocialShareComponent from '../SocialShareComponent';

// This function runs on the server and generates metadata for each page
export async function generateMetadata({ params }) {
    const postData = await getPostData(params.slug);

    return {
        title: `Blog - ${postData.title}`,
        description: postData.summary,
        openGraph: {
            title: `Blog - ${postData.title}`,
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
            title: `Blog - ${postData.title}`,
            description: postData.summary,
            images: [`https://www.allanfernandes.dev${postData.image}`],
        },
    };
}

export default async function PostPage({ params }) {
    const postData = await getPostData(params.slug);
    return (
        <>
            <ScrollIndicator />
            <div className="whitespace-pre-line blog-article">
                <Link href="/blog" className="absolute top-0 left-0 mt-4 ml-4">
                    {' '}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z"
                            fill="#646cff"
                        />
                    </svg>
                </Link>

                <article>
                    <h2 className=" font-bold text-pantone sm:text-3xl text-3xl flex items-center justify-center">
                        {postData.title}
                    </h2>
                    <div className="flex justify-between items-center border-y-2 border-gray-800 py-2 my-4">
                        <p className="flex">{formatDate(postData.date)}</p>
                        <div className="flex gap-4 items-center">
                            <p className="text-gray-500">{postData.readingTime} min read</p>
                            <SocialShareComponent
                                shareURL={`https://www.allanfernandes.dev/blog/${postData.slug}`}
                                title={postData.title}
                                summary={postData.summary}
                            />
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                    <Link href="/blog" className="underline flex justify-center">
                        ← Back to all posts
                    </Link>
                </article>
            </div>
        </>
    );
}
