import { BadgeProps, Badge as NextBadge } from '@nextui-org/react';

interface CustomBadgeProps extends Omit<BadgeProps, 'children'> {
    count: number;
    overflowCount?: number;
}

export default function Badge({ count, overflowCount = 99, ...props }: CustomBadgeProps) {
    if (count === 0) return null;
    const displayCount = count > overflowCount ? `${overflowCount}+` : count;
    // eslint-disable-next-line no-nested-ternary
    const color = count < 5 ? 'success' : count < 9 ? 'warning' : 'danger';
    return (
        <div className="-translate-x-[4px] -translate-y-[2px]">
            <NextBadge
                {...props}
                className="text-[10px] text-white px-1"
                color={color}
                content={displayCount}
                placement="top-left"
                size="md"
            >
                <div className="size-1" />
            </NextBadge>
        </div>
    );
}
