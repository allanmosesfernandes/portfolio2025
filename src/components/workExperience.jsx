import Image from "next/image"

const WorkExperience = () => {
    const workJSON = [
        {
            company: "Responsible Life",
            logo: "/rlife.svg",
            companyUrl: "https://responsiblelife.co.uk",
            id: 'xxx01',
            role: "Web developer",
            startDate: "18/09/2023",
            endDate: "Present",
            description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum"
        },
        {
            company: "Nottingham Trent Students' Union",
            logo: "/ntsu-logo.png",
            companyUrl: "https://responsiblelife.co.uk",
            id: 'xxx02',
            role: "Web developer",
            startDate: "18/09/2022",
            endDate: "18/09/2023",
            description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum"
        },
        {
            company: "THIS IS! Digital Media Group",
            logo: "/this-is-dmg.svg",
            companyUrl: "https://responsiblelife.co.uk",
            id: 'xxx03',
            role: "Frontend Developer",
            startDate: "18/09/2023",
            endDate: "Present",
            description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum"
        },

    ]
    return (
        <div>
            {
                workJSON.map((workPlace) => {
                    return (
                        <div className="mt-4 mb-6 flex gap-4" key={workPlace.id}>
                            <Image src={workPlace.logo} alt={workPlace.company} width={100} height={100} title={workPlace.company} className="inline object-cover"/>
                            <div>
                                <h4 className="text-black dark:text-white font-bold text-md">{workPlace.company}</h4>
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