import './globals.css';
import { Bebas_Neue, DM_Sans, Space_Mono, Cormorant_Garamond, EB_Garamond } from 'next/font/google';
import Nav from '@/components/Nav';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-display',
});

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700'],
    variable: '--font-sans',
});

const spaceMono = Space_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-mono',
});

const cormorantGaramond = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    variable: '--font-cormorant',
});

const ebGaramond = EB_Garamond({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal', 'italic'],
    variable: '--font-eb-garamond',
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🦡</text></svg>"
                ></link>
                <meta charSet="UTF-8" />
                <meta name="theme-color" content="#F5C800" />
            </head>
            <body
                className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable} ${cormorantGaramond.variable} ${ebGaramond.variable} bg-ink text-paper antialiased font-sans`}
            >
                <Nav />
                {children}
                <Analytics />
                <SpeedInsights />
                <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
            </body>
        </html>
    );
}
