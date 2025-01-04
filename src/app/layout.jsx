import "./globals.css";
import { Fira_Sans } from 'next/font/google';
import { FloatingMenu } from "@/components/floatingMenu";
const fira = Fira_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-fira'
});

export const metadata = {
  title: "Home - Allan Fernandes",
  description: "Allan Fernandes is a frontend developer based in Nottingham, UK. He is a Computer Science post graduate from NTU. He is currently working as a web developer at Responsible Life.",
  image: "/og-image.png",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" className="dark">
          <head>
            <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🦡</text></svg>"></link>
            <meta charSet="UTF-8" />
            <meta property="og:image" content={metadata.image} />
          </head>
          <body className={`bg-white dark:bg-black antialiased`}>
              <div className="max-w-2xl sm:mt-16 mt-4 mx-auto px-5 bg-white dark:bg-black font-sans">
                  {children}
                  <FloatingMenu />
              </div>
          </body>
      </html>
  );
}
