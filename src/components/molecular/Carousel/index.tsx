import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import Pagination from '@components/atomic/Pagination';

type CarouselProps = {
    children: React.ReactNode;
    interval?: number;
};

function Carousel({ children, interval = 5000 }: CarouselProps) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0); // Track slide direction
    const length = React.Children.count(children);

    useEffect(() => {
        const autoSlide = setInterval(() => {
            const nextIndex = (current + 1) % length;
            setDirection(1);
            setCurrent(nextIndex);
        }, interval);

        return () => clearInterval(autoSlide);
    }, [current, length, interval]);

    if (length <= 0) {
        return null;
    }

    const handlePaginationChange = (newIndex: number) => {
        const newDirection = newIndex > current ? 1 : -1; // Determine direction
        setDirection(newDirection);
        setCurrent(newIndex - 1);
    };

    return (
        <div className="relative max-w-4xl mx-auto">
            {/* <AnimatePresence custom={direction} initial={false}> */}
            {React.Children.map(children, (child, index) =>
                index === current ? (
                    <motion.div
                        key={index}
                        layout
                        animate={{ x: 0, opacity: 1 }}
                        className="w-full h-full overflow-hidden"
                        custom={direction}
                        exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                        initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-full h-full rounded-lg">{child}</div>
                    </motion.div>
                ) : null
            )}
            {/* </AnimatePresence> */}
            <div className="ms-6 mt-4">
                <Pagination
                    color="dots"
                    dotsJump={10}
                    hidden={length <= 1}
                    page={current + 1}
                    radius="full"
                    showControls={false}
                    size="sm"
                    total={length}
                    onChange={handlePaginationChange}
                />
            </div>
        </div>
    );
}

export default Carousel;
