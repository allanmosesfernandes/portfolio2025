
import { getPostData } from "@/app/lib/posts";
import { formatDate } from "@/app/utils";
import Link from 'next/link';

export default async function PostPage({ params }) {
    const postData = await getPostData(params.slug);
    return (
        <div>
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z"
                        fill="#FF5A26"
                    />
                </svg>
            </Link>

            <article>
                <h2 className=" font-bold text-pantone sm:text-3xl text-3xl flex items-center">
                    {postData.title}
                </h2>
                <p>
                    {formatDate(postData.date)}
                </p>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </div>
    );
}
