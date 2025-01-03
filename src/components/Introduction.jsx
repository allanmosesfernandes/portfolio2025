'use client';
import wavingHand from '@/app/assets/waving-hand.png';
import headshot from '@/app/assets/nerd.png';
import headshot2 from '@/app/assets/profile-2.jpg';
import Image from 'next/image';
import Link from 'next/link';
import Arrow from '@/app/assets/arrow.svg';
import { ReactTyped } from 'react-typed';

const Introduction = () => {
    return (
        <div>
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
                        a{' '}
                        <ReactTyped
                            strings={[
                                'frontend developer',
                                'CSS fanboy',
                                'espresso fanatic ☕',
                                'perpetual learner',
                            ]}
                            typeSpeed={80}
                            loop
                            backSpeed={80}
                            backDelay={100}
                            startDelay={100}
                        />
                        , <br />I like b̶r̶e̶a̶k̶i̶n̶g̶&nbsp; building cool things that live on the internet
                        🌐
                    </p>
                </div>
                <Image
                    src={headshot}
                    alt="Allan Fernandes avatar"
                    width={150}
                    height={150}
                    title="Avatar"
                    className="ml-4 inline object-contain avatar"
                />
            </div>
            <h3 className="text-black dark:text-white font-bold text-2xl mt-6">About</h3>
            <p className="text-pretty text-black dark:text-white md:text-lg">
                I've been building websites for nearly four years often using vanilla javascript,
                React, (S)CSS and other web technologies. With a master’s degree in Computer
                Science, I am currently working a web developer at Responsible Life, where I work as
                part of a dynamic team focused on crafting innovative web applications to transform
                the equity release space.
            </p>
            <p className="text-pretty text-black dark:text-white md:text-lg whitespace-pre-wrap">
                I also play{' '}
                <a
                    href="https://www.instagram.com/p/B4nEUCgpYrl/"
                    target="_blank"
                    aria-label="Allan fernandes tekkers"
                    title="Tekkers"
                    className=" hover-links"
                >
                    football,
                </a>
                {'  '}
                <a
                    href="https://www.goodreads.com/review/list/185760981-allan-fernandes?shelf=read"
                    target="_blank"
                    aria-label="Allan fernandes good reads account"
                    title="Reading list"
                    className=" hover-links"
                >
                    read books
                </a>
                ,{'  '}
                and{'  '}
                <a
                    href="https://www.robinhoodhalfmarathon.co.uk/pages/results?srsltid=AfmBOor6Qign_-E37nNrLrYDLUXG3iKxzRz_VWD3s0W1P_RYV9gXrQ1e"
                    target="_blank"
                    aria-label="Running"
                    title="Running"
                    className=" hover-links"
                >
                    go on runs
                </a>{'  '}
                to get my ass of the computer.
            </p>
        </div>
    );
};

export default Introduction;
