'use client';
import { useRef, useState, useEffect } from 'react';

export default function HorizontalScroll({ children, title, showArrows = true, className = '' }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    };

    useEffect(() => {
        checkScroll();
        const el = scrollRef.current;
        el?.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        return () => {
            el?.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const scroll = (direction) => {
        const el = scrollRef.current;
        if (!el) return;
        const scrollAmount = el.clientWidth * 0.8;
        el.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <section className={`horizontal-scroll py-12 ${className}`}>
            <div className="mb-6 flex items-center justify-between">
                {title && (
                    <h2 className="text-3xl font-bold text-black dark:text-white md:text-4xl lg:text-5xl">
                        {title}
                    </h2>
                )}

                {showArrows && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className="h-11 w-11 rounded-full border border-gray-200 bg-transparent text-black transition-all duration-200 hover:border-indigo-500 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/10 dark:text-white"
                            aria-label="Scroll left"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className="h-11 w-11 rounded-full border border-gray-200 bg-transparent text-black transition-all duration-200 hover:border-indigo-500 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/10 dark:text-white"
                            aria-label="Scroll right"
                        >
                            →
                        </button>
                    </div>
                )}
            </div>

            <div
                ref={scrollRef}
                className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                {children}
            </div>

            <p className="mt-4 text-center text-xs text-gray-500 opacity-60 md:hidden">
                ↔ Swipe to scroll
            </p>
        </section>
    );
}
