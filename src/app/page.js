import Homepage from "@/components/Homepage";
import { getSortedPostsData } from "./lib/posts";

export const metadata = {
    title: "Home - Allan Fernandes",
    description: "Allan Fernandes is a frontend developer based in Nottingham, UK. He is a Computer Science post graduate from NTU. He is currently working as a web developer at Responsible Life.",
    image: "/og-image.png",
};

export default function Home() {
    const allPostsData = getSortedPostsData();

    return (
        <Homepage posts={allPostsData} />
    );
}
