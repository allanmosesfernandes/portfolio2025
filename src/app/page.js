import Homepage from "@/components/Homepage";
import { getSortedPostsData } from "./lib/posts";

export const metadata = {
    title: 'Home - Allan Fernandes',
    description:
        'Allan Fernandes is a frontend developer based in Nottingham, UK. He is a Computer Science post graduate from NTU. He is currently working as a web developer at Responsible Life.',
    openGraph: {
        title: 'Home - Allan Fernandes',
        description:
            'Allan Fernandes is a frontend developer based in Nottingham, UK. He is a Computer Science post graduate from NTU. He is currently working as a web developer at Responsible Life.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Allan Fernandes - Frontend Developer',
            },
        ],
    },
};

export default function Home() {
    const allPostsData = getSortedPostsData();

    return (
        <Homepage posts={allPostsData} />
    );
}
