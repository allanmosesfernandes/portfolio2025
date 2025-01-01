import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import { formatDate } from '../utils';

const Blog = () => {
    const allPostsData = getSortedPostsData();

    return (
        <div>
            <h2 className=" font-bold text-pantone sm:text-5xl text-3xl flex items-center justify-center">
                Blog
            </h2>
            <p className="mt-8 justify-center text-center">
                Incessant yapping about frontend, tech, hacks and life's nuances manifested in it's
                textual form.
            </p>
            <ul className="mt-8">
                {allPostsData.map(({ id, title, date, tags, slug, summary }) => (
                    <div key={id}>
                        <li
                            key={id}
                            className="blog-li shadow-md p-4 shadow-pantone hover:shadow-indigo-500/40"
                        >
                            <div className="flex justify-between">
                                <h3 className="font-bold">{title}</h3>
                                <p className="text-pantone">{formatDate(date)}</p>
                            </div>
                            <p className="my-6">{summary}</p>
                            <div className="flex gap-2 items-center justify-between mt-4">
                                <div className="flex gap-2 items-center">
                                    <Link href={`/blog/${slug}`}>
                                        <h4 className="text-pantone font-bold text-md">
                                            Read more
                                        </h4>
                                    </Link>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#FF5A26"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-chevron-right size-4 transform transition-all duration-300 ease-out"
                                    >
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                </div>
                                <div>
                                    {tags &&
                                        tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="dark:bg-white dark:text-black bg-black text-white font-medium text-md rounded-lg px-2 py-1 mr-2"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Blog;
