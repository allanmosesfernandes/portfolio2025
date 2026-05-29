'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const MinimalNav = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const [mounted, setMounted] = useState(false);

    // portals need the DOM — only render the overlay after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    // section anchors live on the homepage — link cross-page when elsewhere
    const onHome = pathname === '/';
    const workHref = onHome ? '#work' : '/#work';
    const expHref = onHome ? '#exp' : '/#exp';

    const closeMenu = () => {
        setClosing(true);
        // single quick fade for both panel + scrim, then unmount
        setTimeout(() => {
            setOpen(false);
            setClosing(false);
        }, 190);
    };

    const openMenu = () => {
        setClosing(false);
        setOpen(true);
    };

    const toggle = () => (open ? closeMenu() : openMenu());

    // lock body scroll while the menu is open — compensate for the
    // scrollbar width so the page doesn't jump sideways on open/close
    useEffect(() => {
        if (!open) return;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const { overflow, paddingRight } = document.body.style;
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        return () => {
            document.body.style.overflow = overflow;
            document.body.style.paddingRight = paddingRight;
        };
    }, [open]);

    // hidden on admin pages
    if (pathname.startsWith('/admin')) return null;

    return (
        <nav className="afminnav">
            <div className="afminnav-inner">
                <Link href="/" className="logo" onClick={closeMenu}>
                    AF<span>.</span>
                </Link>

                <div className="navlinks">
                    <a className="hidem" href={workHref}>
                        Work
                    </a>
                    <a className="hidem" href={expHref}>
                        Experience
                    </a>
                    <Link className="hidem" href="/blog">
                        Blog
                    </Link>
                    <a
                        className="resume hidem"
                        href="/Allan_Fernandes_CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Résumé
                    </a>

                    <button
                        type="button"
                        className="navtoggle"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        onClick={toggle}
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Overlay is portaled to <body> so it escapes any page
                stacking contexts (the .rise transforms create them). */}
            {mounted &&
                open &&
                createPortal(
                    <div className="afmin-overlay">
                        <div
                            className={`navscrim${closing ? ' closing' : ''}`}
                            onClick={closeMenu}
                            aria-hidden="true"
                        />
                        <div
                            className={`navmenu${closing ? ' closing' : ''}`}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Menu"
                        >
                            <button
                                type="button"
                                className="navmenu-close"
                                aria-label="Close menu"
                                onClick={closeMenu}
                            >
                                ✕
                            </button>
                            <a href={workHref} onClick={closeMenu}>
                                Work
                            </a>
                            <a href={expHref} onClick={closeMenu}>
                                Experience
                            </a>
                            <Link href="/blog" onClick={closeMenu}>
                                Blog
                            </Link>
                            <a
                                href="/Allan_Fernandes_CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeMenu}
                            >
                                Résumé
                            </a>
                        </div>
                    </div>,
                    document.body
                )}
        </nav>
    );
};

export default MinimalNav;
