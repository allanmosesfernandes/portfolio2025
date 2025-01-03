import Homepage from "@/components/Homepage";
import { getSortedPostsData } from "./lib/posts";

export default function Home() {
        const allPostsData = getSortedPostsData();

    return (
        <Homepage posts={allPostsData} />
    );
}
