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
    }, []);

    return (
        <div className="scroll_box">
            <div className="scroll_bar">
                <div style={{ width: `${scroll}%` }} className="scroll_indicator"></div>
            </div>
        </div>
    );
};

export default ScrollIndicator;
