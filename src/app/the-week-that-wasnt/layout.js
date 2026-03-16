export const metadata = {
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default function WeeklyMusingsLayout({ children }) {
    return (
        <div className="-mx-[clamp(24px,5vw,64px)] -mt-4 sm:-mt-16">
            {children}
        </div>
    );
}
