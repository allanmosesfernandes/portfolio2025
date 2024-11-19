"use client"
import home from "/src/app/assets/home.svg";
import blog from "/src/app/assets/blog.svg"
import github from "/src/app/assets/github.svg"
import linkedin from "/src/app/assets/linkedin.svg"
import sun from "/src/app/assets/sun.svg"
import moon from "/src/app/assets/moon.svg"

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

export const FloatingMenu = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setIsDark(!isDark);
    };
    return (
        <div className="fixed-floating-menu">
            <nav
                className=" w-max p-4 gap-6 rounded-full border z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark-bg-white dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
                <Link href="/" title="Home" data-toggle="tooltip" data-placement="top">
                    <p>Home</p>
                    <Image src={home} alt={home} width={20} height={20} title="Home"/>
                </Link>
                <Link href='/blog'>
                    <p>Blog</p>
                    <Image src={blog} alt={blog} width={20} height={20}/>
                </Link>
                <Link href="https://github.com/allanmosesfernandes" target="_blank">
                    <p>Github</p>
                    <Image src={github} alt={github} width={20} height={20}/>
                </Link>
                <Link href="https://www.linkedin.com/in/allanmosesfernandes/" target="_blank">
                    <p>Linkedin</p>
                    <Image src={linkedin} alt={home} width={20} height={20}/>
                </Link>
                {/* Light mode toggle switch*/}
                <Image src={moon} alt={sun} width={20} height={20}/>
                <button onClick={toggleTheme} className="fixed-floating-menu">
                    {isDark ? '🌞 Light Mode' : '🌜 Dark Mode'}
                </button>
            </nav>
        </div>
    )
}
