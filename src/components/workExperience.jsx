import Image from "next/image"
import Link from "next/link"
import { workJSON } from "@/app/utils"
import chevron from "/src/app/assets/chevron.svg"

const WorkExperience = () => {

    return (
        <div>
            {
                workJSON.map((workPlace) => {
                    return (
                        <div className="mt-4 mb-6 flex gap-4 cursor-pointer" key={workPlace.id}>
                            <Image src={workPlace.logo} alt={workPlace.company} width={80} height={80} title={workPlace.company} className="inline object-contain w-100"/>
                            <div>
                                <Link href={workPlace.companyUrl} target="_blank">
                                    <div className="flex items-center gap-1">
                                        <h4 className="text-black dark:text-white font-bold text-md">{workPlace.company}</h4>
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
                                                className="lucide lucide-chevron-right size-4 transform transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 stroke-black dark:stroke-white"
                                            >
                                                <path d="m9 18 6-6-6-6"></path>
                                            </svg>
                                    </div>
                                </Link>
                                <p className="text-black dark:text-white text-sm">{workPlace.role}</p>
                            </div>
                            <p className="ml-auto text-black dark:text-white text-md">{workPlace.startDate} - {workPlace.endDate}</p>
                            <p className="text-black dark:text-white text-md hidden">{workPlace.description}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default WorkExperience