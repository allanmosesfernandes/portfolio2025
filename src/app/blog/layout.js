import { FloatingMenu } from '@/components/floatingMenu';

export default function RootLayout({ children }) {
    return (
        <>
            <div className="max-w-2xl mt-md-16 mt-4 mb-20 mx-auto sm:px-5 px-0 bg-white dark:bg-black space-y-4 font-sans text-black dark:text-white">
                {children}
                <FloatingMenu />
            </div>
        </>
    );
}
