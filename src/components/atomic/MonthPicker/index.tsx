import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';

function PickerItemWrapper({ children }: any) {
    return (
        <>
            {Array.from({ length: 2 }, (_, i) => (
                <div key={`dummy-start-${i}`} className="h-10 min-w-20 flex-shrink-0" />
            ))}
            {children}
            {Array.from({ length: 2 }, (_, i) => (
                <div key={`dummy-end-${i}`} className="h-10 min-w-20 flex-shrink-0" />
            ))}
        </>
    );
}

const DEBOUNCE_TIME = 150;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const lastYear = new Date().getFullYear();

type Props = {
    defValue?: Date;
    onChange: (value: Date) => void;
};

export default function MonthPicker({ defValue, onChange }: Props) {
    const month = defValue?.getMonth() ?? new Date().getMonth();
    const year = defValue?.getFullYear() ?? new Date().getFullYear();
    const [activeMonth, setActiveMonth] = useState(month);
    const [activeYear, setActiveYear] = useState(year);

    const monthRef = useRef<HTMLDivElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (monthRef.current) {
            monthRef.current.scrollTo({
                top: activeMonth * 40,
                behavior: 'instant',
            });
        }
        if (yearRef.current) {
            yearRef.current.scrollTo({
                top: (activeYear - 2000) * 40,
                behavior: 'instant',
            });
        }
    }, [activeMonth, activeYear]);

    const handleMonthClick = (index: number) => {
        if (monthRef.current) {
            const itemHeight = 40;
            monthRef.current.scrollTo({
                top: index * itemHeight,
                behavior: 'smooth',
            });
        }
    };

    const handleYearClick = (index: number) => {
        if (yearRef.current) {
            const itemHeight = 40;
            yearRef.current.scrollTo({
                top: index * itemHeight,
                behavior: 'smooth',
            });
        }
    };

    const debouncedMonthChange = useDebouncedCallback(index => {
        setActiveMonth(index);
    }, DEBOUNCE_TIME);

    const debouncedYearChange = useDebouncedCallback(index => {
        setActiveYear(index);
    }, DEBOUNCE_TIME);

    const handleMonthScroll = () => {
        if (monthRef.current) {
            const { scrollTop } = monthRef.current;
            const itemHeight = 40;
            const newIndex = Math.round(scrollTop / itemHeight);

            if (newIndex !== activeMonth && newIndex >= 0 && newIndex <= 11) {
                debouncedMonthChange(newIndex);
            }
        }
    };

    const handleYearScroll = () => {
        if (yearRef.current) {
            const { scrollTop } = yearRef.current;
            const itemHeight = 40;
            const newIndex = Math.round(scrollTop / itemHeight);

            if (newIndex !== activeYear && newIndex >= 0 && newIndex <= 49) {
                debouncedYearChange(2000 + newIndex);
            }
        }
    };

    useEffect(() => {
        if (activeMonth !== defValue?.getMonth() || activeYear !== defValue?.getFullYear()) {
            onChange?.(new Date(activeYear, activeMonth));
        }
    }, [activeMonth, activeYear]);

    return (
        <div className="w-[220px] h-[200px] relative flex justify-center">
            <div
                ref={monthRef}
                className="flex-1 flex flex-col items-end h-full z-10 overflow-y-scroll scrollbar-hide snap-y"
                onScroll={handleMonthScroll}
            >
                <PickerItemWrapper>
                    {months.map((item, index) => (
                        <button
                            key={index}
                            className="w-full h-10 flex justify-end px-2 items-center flex-shrink-0 text-sm text-secondary snap-center"
                            type="button"
                            onClick={() => handleMonthClick(index)}
                        >
                            {item}
                        </button>
                    ))}
                </PickerItemWrapper>
            </div>
            <div
                ref={yearRef}
                className="flex-1 flex flex-col items-start h-full z-10 overflow-y-scroll snap-y scrollbar-hide"
                onScroll={handleYearScroll}
            >
                <PickerItemWrapper>
                    {Array.from({ length: lastYear - 1999 }, (_, index) => (
                        <button
                            key={index}
                            className="w-full h-10 flex justify-start px-2 items-center flex-shrink-0 text-sm text-secondary snap-center"
                            type="button"
                            onClick={() => handleYearClick(index)}
                        >
                            {2000 + index}
                        </button>
                    ))}
                </PickerItemWrapper>
            </div>
            <div className="absolute left-2 right-2 h-10 top-[50%] translate-y-[-50%] bg-default-100 rounded-xl pointer-events-none" />
        </div>
    );
}
