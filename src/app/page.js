import Homepage from "@/components/Homepage";
import { getSortedPostsData } from "./lib/posts";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Allan Fernandes — Software Engineer',
    description:
        'Allan Fernandes is a software engineer based in Nottingham, UK. Building cool things on the internet while caring deeply about accessibility and user experience.',
    openGraph: {
        title: 'Allan Fernandes — Software Engineer',
        description:
            'Allan Fernandes is a software engineer based in Nottingham, UK. Building cool things on the internet while caring deeply about accessibility and user experience.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Allan Fernandes — Software Engineer',
            },
        ],
    },
};

export default async function Home() {
    const allPostsData = await getSortedPostsData();

    return (
        <Homepage posts={allPostsData} />
    );
}
