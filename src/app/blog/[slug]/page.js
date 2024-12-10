// export async function generateStaticParams() {
//     const slugs = getAllPostSlugs();
//     return slugs.map((slug) => ({ slug }));
// }

import { getPostData } from "@/app/lib/posts";

export default async function PostPage({ params }) {
    const postData = await getPostData(params.slug);
    return (
        <article>
            <h1>{postData.title}</h1>
            <p>{postData.date}</p>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    );
}
