import { FloatingMenu } from "@/components/floatingMenu";

export default function RootLayout({ children }) {
    return (
        <div className="max-w-2xl mt-16 mx-auto px-5 bg-white dark:bg-black space-y-4 font-sans text-black dark:text-white">
            {children}
            <FloatingMenu />
        </div>
    );
}
