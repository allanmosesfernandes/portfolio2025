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
            <h3 className="mt-12 text-2xl font-bold text-pantone">Work Experience</h3>
            {visibleItems.map((workPlace, idx) => {
                const isLast = idx === visibleItems.length - 1;
                const isOpen = openBlockIds.includes(workPlace.id);
                return (
                    <div
                        className="group mb-6 mt-4 cursor-pointer flex-col gap-4"
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
                        <div className="flex flex-col sm:flex-row">
                            <Image
                                src={workPlace.logo}
                                alt={workPlace.company}
                                width={80}
                                height={80}
                                title={workPlace.company}
                                className="mr-4 inline h-[50px] w-[80px] object-scale-down"
                            />
                            <div>
                                <div className="flex items-center gap-1">
                                    <h4 className="text-md font-bold text-black dark:text-white">
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
                                        className={`lucide lucide-chevron-right size-4 transform stroke-black transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 dark:stroke-white sm:opacity-0 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                                    >
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                </div>
                                <p className="my-2 text-sm text-black dark:text-white sm:my-0">
                                    {workPlace.role}
                                </p>
                            </div>
                            <div className="sm:ml-auto">
                                <p className="text-md ml-auto text-black dark:text-white">
                                    {workPlace.startDate} - {workPlace.endDate}
                                </p>
                                <p className="text-md hidden text-black dark:text-white">
                                    {workPlace.description}
                                </p>
                            </div>
                        </div>
                        <div
                            className={`overflow-hidden transition-all duration-500 sm:ml-[100px] ${isOpen ? 'max-h-40' : 'max-h-0'}`}
                        >
                            <p className="text-md mt-2 text-black dark:text-white">
                                {workPlace.description}
                            </p>
                            <Link
                                href={workPlace.companyUrl}
                                target="_blank"
                                className="mt-4 gap-2 text-sm text-white dark:text-white"
                            >
                                <p
                                    key={workPlace.id}
                                    className="text-md d-flex mt-2 h-fit w-fit rounded-lg bg-black p-2 text-xs font-medium text-white shadow dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                                >
                                    <span className="flex items-center gap-2">
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
                    className="text-md group relative mx-auto mb-10 mt-6 flex h-fit justify-center overflow-hidden rounded-full bg-black px-4 py-2 font-medium text-white transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                    <span className="relative block transition-transform duration-300 ease-out group-hover:-translate-y-[120%]">
                        {showItems ? 'Show Less' : 'View all'}
                    </span>
                    <span className="absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-300 ease-out group-hover:translate-y-0">
                        {showItems ? 'Show Less' : 'View all'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default WorkExperience;
