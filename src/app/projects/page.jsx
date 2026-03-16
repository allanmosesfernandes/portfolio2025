import Projects from './Projects';
import Footer from '@/components/Footer';

export const metadata = {
    title: "Projects — Allan Fernandes",
    description: "A collection of projects showcasing Allan Fernandes' skills in software engineering and web development.",
};

export default function ProjectsPage() {
    return (
        <>
            <main className="min-h-screen">
                <Projects />
            </main>
            <Footer />
        </>
    );
}
