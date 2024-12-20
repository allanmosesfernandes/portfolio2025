const workJSON = [
    {
        company: 'Responsible Life',
        logo: '/rlife.svg',
        companyUrl: 'https://responsiblelife.co.uk',
        id: 'xxx01',
        role: 'Web developer',
        startDate: 'Sep 2023',
        endDate: 'Present',
        description:
            'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum',
    },
    {
        company: "Nottingham Trent Students' Union",
        logo: '/ntsu-logo.png',
        companyUrl: 'https://www.trentstudents.org/',
        id: 'xxx02',
        role: 'Web developer',
        startDate: 'Sep 2022',
        endDate: 'Aug 2023',
        description:
            'Developed and deployed websites for multiple student union projects, seamlessly aligning design and functionality requirements to address the diverse needs of stakeholders and members.',
    },
    {
        company: 'THIS IS! Digital Media Group',
        logo: '/this-is-dmg.svg',
        companyUrl: '#',
        id: 'xxx03',
        role: 'Frontend Developer',
        startDate: 'May 2021',
        endDate: 'Feb 2022',
        description:
            'Designed and developed interactive web applications for DMG, a German startup, ensuring compliance with strict GDPR regulations and prioritizing accessibility to align with EU standards and requirements.',
    },
    {
        company: 'The Starter Labs',
        logo: '/tsl.png',
        companyUrl: 'https://www.thestarterlabs.com/',
        id: 'xxx04',
        role: 'Frontend Developer',
        startDate: 'Sep 2020',
        endDate: 'May 2021',
        description:
            'Established and led the in-house web department at Starter Labs, driving the setup of efficient project pipelines and ensuring seamless execution of initiatives.',
    },
    {
        company: 'Unifynd Technologies',
        logo: '/Unifynd-Logo-Yellow.png',
        companyUrl: 'https://www.unifynd.com/',
        id: 'xxx05',
        role: 'Frontend Developer',
        startDate: 'Nov 2018',
        endDate: 'Aug 2020',
        description:
            "Developed visual interfaces for the rewards program of Phoenix Market City, one of India's leading retail merchants, including admin dashboards and web components.",
    },
];

const educationJSON = [
    {
        university: 'Nottingham Trent University',
        logo: '/ntu.png',
        course: 'MSc Computer Science',
        year: '2021 - 2023',
        id: 'xxx06',
        url: 'https://www.ntu.ac.uk/course/science-and-technology/pg/msc-computer-science',
    },
    {
        university: "St. Xavier's College",
        logo: '/xaviers.png',
        course: 'BSc Information Technology',
        year: '2016 - 2019',
        id: 'xxx07',
        url: 'https://itdept.xaviers.edu/courses/undergraduate',
    },
];

const skills = ['React', 'Next.js', 'Tailwind CSS', 'Gatsby','Docker', 'Twig','My SQL','AWS','Playwright', 'Sass', 'JavaScript', 'jQuery', 'Firebase','Node.js']

const projects = [
    {
        image: '/projects/1.png',
        title: 'Royal London, Equity Release',
        date: 'August 2024 - October 2024',
        summary:
            'Revamped the Responsible Equity Release website to match the Royal London brand guidelines. To allow users and advisers to explore the Royal London products range.',
        tools: ['Javascript', 'Twig', 'PHP', 'Sass', 'Docker'],
        website: 'https://equityrelease.royallondon.com/',
    },
    {
        image: '/projects/2.png',
        title: 'Daily Stoic Reminders',
        date: 'Dec 2023 - February 2024',
        summary:
            'Conceptualized, designed and developed a web app for daily stoic reminders. The app generates daily stoic reminders to users to read a stoic quote and reflect on it.',
        tools: ['React', 'Firebase','Styled Components', 'Netlify'],
        website: 'https://dailystoicreminders.uk/',
    },
    {
        image: '/projects/rldn.png',
        title: 'Royal London, Equity Release',
        date: 'August 2024 - October 2024',
        summary:
            'Revamped the Responsible Equity Release website to match the Royal London brand guidelines. To allow users and advisers to explore the Royal London products and regularly update the website to keep up with the latest marketing campaigns.',
        tools: ['Javascript', 'Twig', 'PHP', 'Sass', 'Docker'],
        website: 'https://equityrelease.royallondon.com/',
    },
    {
        image: '/projects/daily-stoic.png',
        title: 'Daily Stoic Reminders',
        date: 'Dec 2023 - February 2024',
        summary:
            'Conceptualized, designed and developed a web app for daily stoic reminders. The app generates daily stoic reminders to users to read a stoic quote and reflect on it. Featured on product hunt and received 50+ upvotes.',
        tools: ['React', 'Styled Components', 'Netlify'],
        website: 'https://dailystoicreminders.uk/',
    },
];

const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

export { educationJSON, formatDate, projects, skills, workJSON};

