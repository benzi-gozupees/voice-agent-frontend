import * as React from 'react';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { twMerge } from 'tailwind-merge';

const verticalShadow = [
    'data-[top-scroll=true]:[mask-image:linear-gradient(0deg,#000_calc(100%_-80px),transparent)]',
    'data-[bottom-scroll=true]:[mask-image:linear-gradient(180deg,#000_calc(100%_-80px),transparent)]',
    'data-[top-bottom-scroll=true]:[mask-image:linear-gradient(#000,#000,transparent_0,#000_80px,#000_calc(100%_-80px),transparent)]',
];

const horizontalShadow = [
    'data-[left-scroll=true]:[mask-image:linear-gradient(270deg,#000_calc(100%_-80px),transparent)]',
    'data-[right-scroll=true]:[mask-image:linear-gradient(90deg,#000_calc(100%_-80px),transparent)]',
    'data-[left-right-scroll=true]:[mask-image:linear-gradient(to_right,#000,#000,transparent_0,#000_80px,#000_calc(100%_-80px),transparent)]',
];

const ScrollBar = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={ref}
        className={twMerge(
            'flex touch-none select-none transition-colors cursor-default',
            orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
            orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
            className
        )}
        orientation={orientation}
        {...props}
    >
        <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-divider hover:bg-default-300" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
));

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
    orientation?: 'vertical' | 'horizontal';
    baseClassNames?: string;
}

function ScrollArea({
    className,
    children,
    orientation = 'vertical',
    baseClassNames,
    ...props
}: ScrollAreaProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleScroll = () => {
            if (scrollAreaRef.current) {
                const target = scrollAreaRef.current;
                const {
                    scrollTop,
                    scrollLeft,
                    scrollHeight,
                    scrollWidth,
                    clientHeight,
                    clientWidth,
                } = target;

                if (ref.current) {
                    if (orientation === 'horizontal') {
                        const scrollRight = scrollWidth - clientWidth - scrollLeft;
                        const hasLeftScroll = scrollLeft > 0;
                        const hasRightScroll = scrollRight > 0.1;

                        ref.current.setAttribute(
                            'data-left-scroll',
                            hasLeftScroll && !hasRightScroll ? 'true' : 'false'
                        );
                        ref.current.setAttribute(
                            'data-right-scroll',
                            hasRightScroll && !hasLeftScroll ? 'true' : 'false'
                        );
                        ref.current.setAttribute(
                            'data-left-right-scroll',
                            hasLeftScroll && hasRightScroll ? 'true' : 'false'
                        );
                    } else {
                        const scrollBottom = scrollHeight - clientHeight - scrollTop;
                        const hasTopScroll = scrollTop > 0;
                        const hasBottomScroll = scrollBottom > 0.1;

                        ref.current.setAttribute(
                            'data-top-scroll',
                            hasTopScroll && !hasBottomScroll ? 'true' : 'false'
                        );
                        ref.current.setAttribute(
                            'data-bottom-scroll',
                            hasBottomScroll && !hasTopScroll ? 'true' : 'false'
                        );
                        ref.current.setAttribute(
                            'data-top-bottom-scroll',
                            hasTopScroll && hasBottomScroll ? 'true' : 'false'
                        );
                    }
                }
            }
        };
        scrollAreaRef.current?.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll();
        return () => {
            scrollAreaRef.current?.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <ScrollAreaPrimitive.Root
            ref={ref}
            className={twMerge(
                'relative overflow-hidden',
                orientation === 'vertical' && verticalShadow,
                orientation === 'horizontal' && horizontalShadow
            )}
            type="hover"
            {...props}
        >
            <ScrollAreaPrimitive.Viewport
                ref={scrollAreaRef}
                className={twMerge(`h-full w-full rounded-[inherit]`, baseClassNames)}
            >
                {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar className={className} orientation={orientation} />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    );
}

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
