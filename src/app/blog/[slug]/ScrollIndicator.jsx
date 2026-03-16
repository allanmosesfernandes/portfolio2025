'use client';
import { useState, useEffect, useCallback } from 'react';

const ScrollIndicator = () => {
    const [scroll, setScroll] = useState(0);
    const onScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const maxHeight = scrollHeight - clientHeight;
        const scrolledPercent = (scrollTop / maxHeight) * 100;
        setScroll(scrolledPercent);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    return (
        <div
            className="fixed top-[68px] left-0 z-[99] h-[3px] bg-yellow transition-[width] duration-100"
            style={{ width: `${scroll}%` }}
        />
    );
};

export default ScrollIndicator;
