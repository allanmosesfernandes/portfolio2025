'use client';
import home from '/src/app/assets/home.svg';
import blog from '/src/app/assets/blog.svg';
import github from '/src/app/assets/github.svg';
import linkedin from '/src/app/assets/linkedin.svg';
import sun from '/src/app/assets/sun.svg';
import moon from '/src/app/assets/moon.svg';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const FloatingMenu = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.querySelector('html')?.classList.remove('dark');
        } else {
            document.querySelector('html')?.classList.add('dark');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(isDark === true ? false : true);
    };

    return (
        <div className="fixed-floating-menu">
            <nav
                className={`bg-[#343434] dark:bg-gray-950 w-max p-4 gap-6 rounded-full border z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]`}
            >
                <Link href="/" title="Home" data-toggle="tooltip" data-placement="top">
                    <p>Home</p>
                    <Image src={home} alt={home} width={20} height={20} title="Home" />
                </Link>
                <Link href="/blog" title='Blog'>
                    <p>Blog</p>
                    <Image src={blog} alt={blog} width={20} height={20} />
                </Link>
                <Link href="https://github.com/allanmosesfernandes" target="_blank">
                    <p>Github</p>
                    <Image src={github} alt={github} width={20} height={20} />
                </Link>
                <Link href="https://www.linkedin.com/in/allanmosesfernandes/" target="_blank">
                    <p>Linkedin</p>
                    <Image src={linkedin} alt={home} width={20} height={20} />
                </Link>
                <button onClick={toggleTheme} className="text-white flex">
                    <p>{isDark ? "Dark mode" : "Light Mode"}</p>
                    {isDark ? (
                        <Image src={moon} alt="moon" width={20} height={20} />
                    ) : (
                        <Image src={sun} alt="Sun5" width={20} height={20} />
                    )}
                </button>
            </nav>
        </div>
    );
};
