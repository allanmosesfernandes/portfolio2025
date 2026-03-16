'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Nav = () => {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Don't show the nav on admin pages
    if (pathname.startsWith('/admin')) return null;

    const links = [
        { href: '/', label: 'Home' },
        { href: '/#experience', label: 'Experience' },
        { href: '/#projects', label: 'Projects' },
        { href: '/blog', label: 'Blog' },
    ];

    const isActive = (href) => {
        if (href === '/') return pathname === '/';
        if (href.startsWith('/#')) return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            <nav className="sticky top-0 z-nav h-[68px] bg-ink/90 backdrop-blur-md border-b border-ink-mid px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-display text-2xl tracking-wide text-paper">
                    AF<span className="text-yellow">.</span>
                </Link>

                {/* Centre links - desktop */}
                <ul className="hidden md:flex items-center gap-7 list-none">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <span className="hidden md:flex items-center gap-2 text-sm text-muted">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot"></span>
                    </span>
                    <a
                        href="/Allan_Fernandes.pdf"
                        target="_blank"
                        className="btn-primary !py-2 !px-4 !text-xs"
                        data-cursor="btn"
                    >
                        Resume
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden text-paper text-2xl ml-2 relative z-[200]"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? '✕' : '☰'}
                    </button>
                </div>
            </nav>

            {/* Mobile drawer - rendered outside nav to avoid clipping */}
            {mobileOpen && (
                <div className="fixed inset-0 top-[68px] bg-ink z-[150] md:hidden">
                    <ul className="flex flex-col items-center gap-8 pt-16 list-none">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`font-sans text-xl font-medium ${
                                        isActive(link.href) ? 'text-yellow' : 'text-paper'
                                    }`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a
                                href="/Allan_Fernandes.pdf"
                                target="_blank"
                                className="btn-primary"
                                onClick={() => setMobileOpen(false)}
                            >
                                Resume
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Nav;
