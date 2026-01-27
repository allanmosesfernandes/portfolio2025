'use client';
import { useRef, useState, useEffect } from 'react';

export default function HorizontalScroll({ 
    children, 
    title, 
    showArrows = true,
    className = '' 
}) {
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
            behavior: 'smooth' 
        });
    };

    return (
        <section className={`horizontal-scroll py-20 ${className}`}>
            <div className="flex justify-between items-center mb-6">
                {title && (
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white">
                        {title}
                    </h2>
                )}
                
                {showArrows && (
                    <div className="flex gap-2">
                        <button 
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 bg-transparent text-black dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-500 hover:border-indigo-500 transition-all duration-200"
                            aria-label="Scroll left"
                        >
                            ←
                        </button>
                        <button 
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 bg-transparent text-black dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-500 hover:border-indigo-500 transition-all duration-200"
                            aria-label="Scroll right"
                        >
                            →
                        </button>
                    </div>
                )}
            </div>
            
            <div 
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-4"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                {children}
            </div>
            
            <p className="text-xs text-gray-500 text-center mt-4 opacity-60 md:hidden">
                ↔ Swipe to scroll
            </p>
        </section>
    );
}
