import { FloatingMenu } from '@/components/floatingMenu';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Fira_Sans } from 'next/font/google';
import Script from 'next/script';
import { ReactNode } from 'react';
import './globals.css';

const fira = Fira_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-fira',
});

interface RootLayoutProps {
    children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className="dark">
            <head>
                <link
                    rel="icon"
                    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🦡</text></svg>"
                ></link>
                <meta charSet="UTF-8" />
                <meta name="theme-color" content="#646cff" />
            </head>
            <body className={`${fira.variable} bg-white font-sans antialiased dark:bg-black`}>
                <div className="mx-auto mt-4 max-w-2xl bg-white px-5 dark:bg-black sm:mt-16">
                    {children}
                    <FloatingMenu />
                </div>
                <Analytics />
                <SpeedInsights />
                <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
            </body>
        </html>
    );
}
