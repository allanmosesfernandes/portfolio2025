import { getSortedPostsData } from '../lib/posts';

const Blog = () => {

    const allPostsData = getSortedPostsData();

    return (
        <div>
            <h2 className=" font-bold sm:text-5xl text-3xl flex items-center">Blog</h2>
            <p className="mt-8">
                Incessant yapping about frontend, tech, hacks and life's nuances manifested in it's
                textual form.
            </p>
            <ul className="mt-8">
                {allPostsData.map(({ id, title, date, tags }) => (
                    <li key={id} className="blog-li">
                        <h3>{title}</h3>
                        <p>{date}</p>
                        {tags &&
                            tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="dark:bg-white dark:text-black bg-black text-white font-medium text-md rounded-lg px-2 py-1"
                                >
                                    {tag}
                                </span>
                            ))}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Blog