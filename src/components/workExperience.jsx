'use client';
import Image from 'next/image';
import Link from 'next/link';
import { workJSON } from '@/app/utils';
import chevron from '/src/app/assets/chevron.svg';
import { useState } from 'react';

const WorkExperience = () => {
    const [openBlockIds, setOpenBlockIds] = useState([]);
    const [showItems, setShowItems] = useState(false);

    const toggleDescription = (id) => {
        setOpenBlockIds((prevIds) =>
            prevIds.includes(id) ? prevIds.filter((prevId) => prevId !== id) : [...prevIds, id]
        );
    };
    const handleKeyDown = (event, id) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleDescription(id);
        }
    };

    const visibleItems = showItems ? workJSON : workJSON.slice(0, 2);

    return (
        <div>
            <h3 className="font-bold text-2xl mt-12 text-pantone">Work Experience</h3>
            {visibleItems.map((workPlace, idx) => {
                const isLast = idx === visibleItems.length - 1;
                const isOpen = openBlockIds.includes(workPlace.id);
                return (
                    <div
                        className="mt-4 mb-6 flex-col gap-4 cursor-pointer group"
                        key={workPlace.id}
                        onClick={() => toggleDescription(workPlace.id)}
                        tabIndex={0}
                        onKeyDown={(event) => handleKeyDown(event, workPlace.id)}
                        role="button"
                        aria-expanded={isOpen}
                        aria-controls={`description-${workPlace.id}`}
                        style={{
                            filter: isLast && !showItems ? 'blur(0.9px)' : undefined,
                        }}
                    >
                        <div className="flex sm:flex-row flex-col">
                            <Image
                                src={workPlace.logo}
                                alt={workPlace.company}
                                width={80}
                                height={80}
                                title={workPlace.company}
                                className="w-[80px] h-[50px] inline object-scale-down mr-4"
                            />
                            <div>
                                <div className="flex items-center gap-1">
                                    <h4 className="text-black dark:text-white font-bold text-md">
                                        {workPlace.company}
                                    </h4>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`lucide lucide-chevron-right size-4 transform transition-all duration-300 ease-out sm:opacity-0 group-hover:opacity-100 group-hover:translate-x-1 stroke-black dark:stroke-white ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                                    >
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                </div>
                                <p className="text-black dark:text-white text-sm sm:my-0 my-2">
                                    {workPlace.role}
                                </p>
                            </div>
                            <div className="sm:ml-auto">
                                <p className="ml-auto text-black dark:text-white text-md">
                                    {workPlace.startDate} - {workPlace.endDate}
                                </p>
                                <p className="text-black dark:text-white text-md hidden">
                                    {workPlace.description}
                                </p>
                            </div>
                        </div>
                        <div
                            className={`transition-all sm:ml-[100px] duration-500 overflow-hidden ${isOpen ? 'max-h-40' : 'max-h-0'}`}
                        >
                            <p className="text-black dark:text-white text-md mt-2">
                                {workPlace.description}
                            </p>
                            <Link
                                href={workPlace.companyUrl}
                                target="_blank"
                                className="mt-4 text-white dark:text-white gap-2 text-sm"
                            >
                                <p
                                    key={workPlace.id}
                                    className="text-xs dark:text-white bg-black text-white font-medium text-md w-fit rounded-lg p-2 h-fit shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 d-flex mt-2"
                                >
                                    <span className="flex gap-2 items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-globe size-3"
                                        >
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                                            <path d="M2 12h20"></path>
                                        </svg>
                                        Website
                                    </span>
                                </p>
                            </Link>
                        </div>
                    </div>
                );
            })}
            <div>
                <button
                    role="button"
                    href="/projects"
                    onClick={() => setShowItems(!showItems)}
                    className="rounded-full relative transition-all transition-discrete flex justify-center dark:bg-white dark:text-black bg-black text-white font-medium text-md  py-2 px-4 h-fit d-flex mx-auto mt-6 mb-10"
                >
                    Show {showItems ? 'less' : 'more'}
                </button>
            </div>
        </div>
    );
};

export default WorkExperience;
