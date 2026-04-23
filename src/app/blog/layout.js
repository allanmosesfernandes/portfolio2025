import Footer from '@/components/Footer';

export default function BlogLayout({ children }) {
    return (
        <>
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
}
