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
            'Collaborated within an agile team to develop customized financial systems and products for Responsible Life and Royal London in the equity release sector, contributing to a 47% increase in processing efficiency.',
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
        companyUrl: 'https://www.thisisdmg.com/en/',
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

const skills = [
    'React',
    'Next.js',
    'Tailwind CSS',
    'Gatsby',
    'Docker',
    'Twig',
    'My SQL',
    'AWS',
    'Playwright',
    'Sass',
    'JavaScript',
    'jQuery',
    'Firebase',
    'Node.js',
];

const projects = [
    {
        image: '/projects/1.png',
        title: 'Royal London, Equity Release',
        date: 'August 2024 - September 2024',
        summary:
            'Revamped the Responsible Equity Release website to match the Royal London brand guidelines. To allow users and advisers to explore the Royal London products range.',
        tools: ['Javascript', 'Twig', 'PHP', 'Sass', 'Docker'],
        website: 'https://equityrelease.royallondon.com/',
    },
    {
        image: '/projects/landing0.png',
        title: 'Royal London, landing pages',
        date: 'September 2024',
        summary:
            'Collaborated with the design team to create high-converting landing pages for Royal London products.Crafted responsive and visually engaging pages tailored to drive lead generation as part of targeted ad campaigns.',
        tools: ['Javascript', 'Twig', 'PHP', 'Sass', 'Docker'],
        website: 'https://eradvice.royallondon.com/',
    },
    // {
    //     image: '/projects/2.png',
    //     title: 'Daily Stoic Reminders',
    //     date: 'Dec 2023 - February 2024',
    //     summary:
    //         'Conceptualized, designed and developed a web app for daily stoic reminders. The app generates daily stoic reminders to users to read a stoic quote and reflect on it.',
    //     tools: ['React', 'Firebase', 'Styled Components', 'Netlify'],
    //     website: 'https://dailystoicreminders.uk/',
    // },
    {
        image: '/projects/what-is-wrong-jaron.png',
        title: 'What is wrong with Jaron',
        date: 'August 2021 - October 2021',
        summary:
            "Developed the frontend for What's Wrong with Jaron?, an online course designed for schools to help identify and respond to concerning student behavior. The project aims to prevent sexual abuse in educational settings.",
        tools: ['Wordpress', 'Javascript', 'PHP'],
        website: 'https://www.was-ist-los-mit-jaron.de/',
    },
    {
        image: '/projects/common-thread.png',
        title: 'The Common Thread',
        date: 'August 2023 - September 2023',
        summary:
            'Website design and development for Ankan Chittali, a fashion merchandiser and trend forecaster using Wordpress as a headless CMS and developing the frontend in react.',
        tools: ['React', 'Wordpress'],
        website: 'https://ankanchittalipi.com/',
    },
];
const allProjects = [
    // {
    //     timeline: 'December 2024',
    //     title: 'Broker Portal',
    //     description: 'Bespoke broker portal that allows',
    //     image: '/projects/1.png',
    //     link: '',
    // },
    {
        timeline: 'September 2023',
        title: 'FactFind',
        description:
            'A web-application built using React that allows our financial advisers to perform fact finds with customers and produce suitability reports.',
        image: '/projects/1.png',
        link: '',
    },
    {
        timeline: 'October 2023',
        title: 'Product Search',
        description:
            'A React application used to provide financial advisors with the latest information about equity release products that are currently available on the market.',
        image: '/projects/1.png',
        link: '',
    },
    {
        timeline: 'October 2024',
        title: 'Royal London, Equity Release',
        description:
            'Revamped the Responsible Equity Release website to match the Royal London brand guidelines. To allow users and advisers to explore the Royal London products range.',
        image: '/projects/1.png',
        link: 'https://equityrelease.royallondon.com/',
    },
    {
        timeline: 'September 2024',
        title: 'Royal London, landing pages',
        description:
            'Collaborated with the design team to create high-converting landing pages for Royal London products.Crafted responsive and visually engaging pages tailored to drive lead generation as part of targeted ad campaigns.',
        image: '/projects/landing0.png',
        link: 'https://eradvice.royallondon.com/',
    },
    {
        timeline: 'February 2024',
        title: 'Equity Release Calculator',
        description:
            'Creating custom equity release calculators linked with our custom CRM software and data validation APIs to provide instant quotes to users and advisers.',
        image: '/projects/rlife.png',
        link: 'https://www.responsiblelife.co.uk/equity-release-calculator',
    },
    {
        timeline: 'February 2024',
        title: 'Daily Stoic Reminders',
        description:
            'Conceptualized, designed and developed a web app for daily stoic reminders. The app generates daily stoic reminders to users to read a stoic quote and reflect on it.',
        image: '/projects/2.png',
        link: 'https://dailystoicreminders.uk/',
    },
    {
        timeline: 'September 2023',
        title: 'The Common Thread',
        description:
            'Website design and development for Ankan Chittali, a fashion merchandiser and trend forecaster using Wordpress as a headless CMS and developing the frontend in react.',
        image: '/projects/common-thread.png',
        link: 'https://ankanchittalipi.com/',
    },
    {
        timeline: 'May 2023',
        title: 'Abstrakt Design challenge',
        description: 'Mock design implementation for the Abstrakt design challenge.',
        image: '/projects/badger.png',
        link: 'https://abstrakttest.netlify.app/',
    },
    {
        timeline: 'October 2021',
        title: 'What is wrong with Jaron',
        description:
            "Developed the frontend for What's Wrong with Jaron? an online course designed for schools to help identify and respond to concerning student behavior. The project aims to prevent sexual abuse in educational settings.",
        image: '/projects/what-is-wrong-jaron.png',
        link: 'https://www.was-ist-los-mit-jaron.de/',
    },
    {
        timeline: 'January 2023',
        title: 'Portfolio v2',
        description:
            'Upgrading my personal website to a new version with a fresh design and improved performance. The website was built using Gatsby JS specifically for SEO.',
        image: '/blog-images/nerd.png',
        link: 'https://allanportfoliov2.netlify.app/',
    },
    {
        timeline: 'July 2024',
        title: 'Apex learning academy',
        description:
            'Website design and development for Apex Learning Academy, a tutoring service provider. The website is built using React and styled components.',
        image: '/projects/apex.png',
        link: 'https://equityrelease.royallondon.com/',
    },
    {
        timeline: 'August 2021',
        title: 'The Starter Labs',
        description:
            'Concept landing page for the starter labs, a startup incubator. The website is built using vanilla JS and CSS.',
        image: '/tsl.png',
        link: 'https://thestarterlabs.netlify.app/',
    },
    {
        timeline: 'March 2021',
        title: 'Portfolio v1',
        description: "Portfolio website for v1 of my personal website. The website was using a fun library called Fullpage.js. and was built using plain vanilla JS",
        image: '/blog-images/nerd.png',
        link: 'https://quizzical-tereshkova-4ea12e.netlify.app/',
    },
    {
        timeline: 'September 2020',
        title: 'Unifynd Hackathon',
        description: 'Landing and registration page for the Unifynd hackathon',
        image: '/Unifynd-Logo-Yellow.png',
        link: 'https://hackathon.unifynd.com/',
    },
];

const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

export { allProjects, educationJSON, formatDate, projects, skills, workJSON };
