import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-ink border-t border-ink-mid px-6 md:px-12 pt-12 pb-8">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                    {/* Brand */}
                    <div>
                        <p className="font-display text-2xl text-paper mb-2">
                            AF<span className="text-yellow">.</span>
                        </p>
                        <p className="text-sm text-muted leading-relaxed">
                            Software Engineer building cool things on the internet.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <p className="font-mono text-label-xs uppercase tracking-widest text-muted mb-4">Navigation</p>
                        <ul className="space-y-2">
                            {['Home', 'Blog', 'Projects'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        className="text-sm text-muted-light hover:text-paper transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <p className="font-mono text-label-xs uppercase tracking-widest text-muted mb-4">Connect</p>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://github.com/allanmosesfernandes" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-light hover:text-paper transition-colors">
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/allanmosesfernandes/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-light hover:text-paper transition-colors">
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="mailto:allanmosesfernandes@gmail.com" className="text-sm text-muted-light hover:text-paper transition-colors">
                                    Email
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="border-t border-ink-mid pt-6 flex flex-col items-center gap-3 text-center">
                    <p className="text-sm text-muted-light">
                        Created with love &amp; coffee by Allan Moses Fernandes
                    </p>
                    <p className="text-sm text-muted">
                        Travel back in time 🚀 :{' '}
                        <a href="https://v2.allanfernandes.dev" target="_blank" rel="noopener noreferrer" className="text-muted-light hover:text-yellow transition-colors">v2</a>
                        {' • '}
                        <a href="https://v1.allanfernandes.dev" target="_blank" rel="noopener noreferrer" className="text-muted-light hover:text-yellow transition-colors">v1</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
