import { FloatingMenu } from '@/components/floatingMenu';

export default function RootLayout({ children }) {
    return (
        <>
            <div className="mt-md-10 mx-auto mb-20 mt-4 max-w-2xl space-y-4 bg-white px-0 font-sans text-black dark:bg-black dark:text-white sm:px-5">
                {children}
                <FloatingMenu />
            </div>
        </>
    );
}
