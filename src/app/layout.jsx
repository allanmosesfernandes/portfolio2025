import "./globals.css";
import { Fira_Sans } from 'next/font/google';
import { FloatingMenu } from "@/components/floatingMenu";
const fira = Fira_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-fira'
});

export const metadata = {
  title: "Allan Fernandes",
  description: "Allan Fernandes is a frontend developer based in Nottingham, UK. He is a Computer Science post graduate from NTU. He is currently working as a web developer at Responsible Life.",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" className="dark">
          <body className={`bg-white dark:bg-black antialiased`}>
              <div className="max-w-2xl mt-16 mx-auto sm:px-5 bg-white dark:bg-black font-sans">
                  {children}
                  <FloatingMenu />
              </div>
          </body>
      </html>
  );
}
