'use client';
import wavingHand from '@/app/assets/waving-hand.png';
import headshot from '@/app/assets/nerd-3.png';
import headshot2 from '@/app/assets/profile-2.jpg';
import Image from 'next/image';
import Link from 'next/link';
import Arrow from '@/app/assets/arrow.svg';
import { ReactTyped } from 'react-typed';
import Globe from '@/app/assets/globe.png';

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
                    <p className="text-black dark:text-white md:text-lg">
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
                        <span>
                            <Image
                                src={Globe}
                                alt="Globe Emoji"
                                width={25}
                                height={25}
                                title="Waving hand"
                                className="mx-2 inline"
                            />
                        </span>
                        while also genuinely caring about accessibility and user experience.
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
            <h3 className="text-pantone font-bold text-2xl mt-6">About</h3>
            <p className="text-pretty text-black dark:text-white md:text-lg">
                I've been building websites for around five years now often using React, plain old
                javascript, and often being a victim to the shiny object syndrome.<br /> With a master’s degree in Computer
                Science, I am currently working as a web developer at Responsible Life, where I work
                as part of a dynamic team focused on building bespoke web applications to transform
                the equity release space. <br /><br />When I'm not building on the frontend I find myself writing serverless APIs and racking up infinite debt by leaving stuff running on AWS or wiping my tears while going through the documentation.
                <br />
                <br />
            </p>
            <p className="text-pretty text-black dark:text-white md:text-lg whitespace-pre-wrap">
                When I'm not breaking things on the internet I'm busy playing{' '}
                <Link
                    href="tekkers"
                    aria-label="Allan fernandes tekkers"
                    title="Goalzo mate"
                    className=" hover-links"
                >
                    football,
                </Link>
                {'  '}
                going on runs to get my ass off the computer, and {' '}
                <a
                    href="https://www.goodreads.com/review/list/185760981-allan-fernandes?shelf=read"
                    target="_blank"
                    aria-label="Allan fernandes good reads account"
                    title="Reading list"
                    className=" hover-links"
                >
                    reading books
                </a>
            </p>
        </div>
    );
};

export default Introduction;
