'use client';
import { FloatingMenu } from '@/components/floatingMenu';
import wavingHand from '@/app/assets/waving-hand.png';
import headshot from "@/app/assets/profile.png";
import headshot2 from "@/app/assets/profile-2.jpg";
import Image from 'next/image';
import WorkExperience from '@/components/workExperience';
import Link from 'next/link';
import Education from '@/components/Education';
import Arrow from '@/app/assets/arrow.svg';
import { ReactTyped } from 'react-typed';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';

export default function Home() {
    return (
        <div className="max-w-2xl mt-16 mx-auto px-5 bg-white dark:bg-black space-y-4 font-sans">
            <div className="introduction flex">
                <div>
                    <h2 className="text-black dark:text-white font-bold sm:text-5xl text-3xl flex items-center">
                        Hi, I'm Allan
                        <span className="flex gap-2">
                            <Image
                                src={wavingHand}
                                alt="Waving hand emoji"
                                width={40}
                                height={40}
                                title="Waving hand"
                                className="ml-4 inline"
                            />
                        </span>
                    </h2>
                    <Image
                        src={Arrow}
                        alt="arrow"
                        width={50}
                        height={50}
                        title="Avatar"
                        className="my-2 inline"
                    />
                    <p className="text-black dark:text-white md:text-xl">
                        a <ReactTyped strings={['frontend developer', 'CSS fanboy', 'espresso fanatic ☕', 'perpetual learner']} typeSpeed={40} loop backSpeed={50} backDelay={100} startDelay={100}/>, <br />I like b̶r̶e̶a̶k̶i̶n̶g̶&nbsp; building cool things that live on the internet 🌐
                    </p>
                </div>
                <Image
                    src={headshot}
                    alt="Allan Fernandes avatar"
                    width={150}
                    height={150}
                    title="Avatar"
                    className="ml-4 inline object-contain"
                />
            </div>
            <h3 className="text-black dark:text-white font-bold text-2xl">About</h3>
            <p className="text-pretty text-black dark:text-white md:text-lg">
                I've been building websites for nearly four years often using vanilla javascript,
                React, (S)CSS and other web technologies. With a master’s degree in Computer
                Science, I am now a web developer at Responsible Life, where I work as part of a
                dynamic team focused on crafting innovative web applications to transform the equity
                release space.
            </p>
            <p className="text-pretty text-black dark:text-white md:text-lg">
                I also play{' '}
                <Link
                    href="https://www.instagram.com/p/B4nEUCgpYrl/"
                    target="_blank"
                    aria-label="Allan fernandes tekkers"
                    title="Tekkers"
                    className=" hover-links"
                >
                    football
                </Link>
                , listen to afrobeats and go on runs to to get my ass of the computer.
            </p>
            <WorkExperience />
            <Education />
            <Skills />
            <Projects />
            <FloatingMenu />
        </div>
    );
}
