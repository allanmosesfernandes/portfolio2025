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
                    <h2 className="flex items-center text-3xl font-bold text-black dark:text-white sm:text-5xl">
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
                    src={headshot2}
                    alt="Allan Fernandes avatar"
                    width={150}
                    height={150}
                    title="Avatar"
                    className="avatar ml-4 inline object-contain"
                />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-pantone">About</h3>
            <p className="text-pretty text-black dark:text-white md:text-lg">
                I've been building web applications for around five years now often using React,
                plain old vanilla javascript, and often being a victim to the shiny object syndrome.
                <br />
                <br /> With a master’s degree in Computer Science, I am currently working as a web
                developer at{' '}
                <a href="https://equityrelease.royallondon.com/" target="_blank">
                    Royal London Equity Release
                </a>
                , where I work as part of a dynamic team focused on building bespoke web
                applications to transform the equity release space. <br />
                <br />
                When I'm not building on the frontend I find myself writing serverless APIs and
                racking up infinite debt by leaving stuff running on AWS or wiping my tears while
                going through documentation.
                <br />
                <br />
            </p>
            <p className="whitespace-pre-wrap text-pretty text-black dark:text-white md:text-lg">
                When I'm not breaking things on the internet I'm busy playing{' '}
                <Link
                    href="tekkers"
                    aria-label="Allan fernandes tekkers"
                    title="Goalzo mate"
                    className="hover-links"
                >
                    football,
                </Link>
                {'  '}
                <a
                    href="https://www.strava.com/athletes/112155710"
                    target="_blank"
                    aria-label="Allan fernandes good reads account"
                    title="Reading list"
                    className="hover-links"
                >
                    going on runs
                </a>{' '}
                ,{' '}
                <a
                    href="https://www.goodreads.com/review/list/185760981-allan-fernandes?shelf=read"
                    target="_blank"
                    aria-label="Allan fernandes good reads account"
                    title="Reading list"
                    className="hover-links"
                >
                    reading,{' '}
                </a>
                or <Link href='/blog' aria-label='Link to blog articles' title='Blog articles' className='hover-links'>writing blog articles.</Link>.
            </p>
        </div>
    );
};

export default Introduction;
