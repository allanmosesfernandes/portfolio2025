const Contact = () => {
    return (
        <div className="mb-6">
            <div className='mb-6'>
                <p className="text-black dark:text-white font-bold flex items-center text-center d-flex justify-center mb-6 text-4xl">
                    Get in touch
                </p>
                <p className="text-black dark:text-white flex items-center text-center d-flex justify-center mb-6">
                    I'm always looking to collaborate on exciting projects, share ideas or just chat about tech.
                </p>
            </div>
            <a
                href="mailto:hello@allanfernandes.dev"
                title=""
                className="font-medium text-black dark:text-gray-700 text-3xl sm:text-5xl text-center border-y-2 border-gray-800 py-6 my-6 flex flex-wrap justify-center"
            >
                hello@allanfernandes.dev
            </a>
            <p className='text-black dark:text-white text-center text-lg mt-10 mb-20'>
                created with ❤️ <code>&&</code> ☕ by Allan Fernandes.
            </p>
        </div>
    );
};

export default Contact;
