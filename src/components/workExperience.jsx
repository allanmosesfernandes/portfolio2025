"use client"
import Image from "next/image"
import Link from "next/link"
import { workJSON } from "@/app/utils"
import chevron from "/src/app/assets/chevron.svg"
import { useState } from "react"

const WorkExperience = () => {
    const [openBlockIds, setOpenBlockIds] = useState([]);
    const toggleDescription = (id) => {
        setOpenBlockIds((prevIds) =>
            prevIds.includes(id)
                ? prevIds.filter((prevId) => prevId !== id)
                : [...prevIds, id]
        );
    };
    return (
        <div>
            <h3 className="text-black dark:text-white font-bold text-2xl mt-6">Work Experience</h3>
            {workJSON.map((workPlace) => {
                const isOpen = openBlockIds.includes(workPlace.id);
                return (
                    <div
                        className="mt-4 mb-6 flex-col gap-4 cursor-pointer group"
                        key={workPlace.id}
                        onClick={() => toggleDescription(workPlace.id)}
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
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default WorkExperience