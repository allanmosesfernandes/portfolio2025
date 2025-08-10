const Contact = () => {
    return (
        <div className="mb-6">
            <p className="text-black dark:text-white text-center text-lg mt-10 mb-2">
                Created with{' '}
                <span role="img" aria-label="love">
                    ❤️
                </span>{' '}
                &amp;{' '}
                <span role="img" aria-label="coffee">
                    ☕
                </span>{' '}
                by Allan Moses Fernandes{' '}
                <span role="img" aria-label="raccoon">
                    🦝
                </span>
            </p>
            <p className="text-black dark:text-white text-center text-lg mt-4 mb-[6rem]">
                Travel back in time 🚀:{' '}
                <a
                    href="https://v2.allanfernandes.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-pantone transition-colors"
                    aria-label="Visit version 2 of Allan Fernandes' portfolio (opens in a new tab)"
                >
                    v2
                </a>{' '}
                &bull;{' '}
                <a
                    href="https://v1.allanfernandes.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-pantone transition-colors"
                    aria-label="Visit version 1 of Allan Fernandes' portfolio (opens in a new tab)"
                >
                    v1
                </a>
            </p>
        </div>
    );
};

export default Contact;
