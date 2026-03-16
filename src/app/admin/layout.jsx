import { Suspense } from 'react';

export const metadata = {
    title: 'Admin - Blog Management',
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default function AdminLayout({ children }) {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-paper">Loading...</div>}>
            {children}
        </Suspense>
    );
}
