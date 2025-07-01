import { Chip as Nextchip, Tooltip } from '@nextui-org/react';

import ClockIcon from '@assets/icons/clock.svg?react';
import CrossIcon from '@assets/icons/close-circle.svg?react';
import HighIcon from '@assets/icons/high-chart.svg?react';
import InfoIcon from '@assets/icons/info-circle.svg?react';
import LowIcon from '@assets/icons/low-chart.svg?react';
import MediumIcon from '@assets/icons/md-chart.svg?react';
import RightIcon from '@assets/icons/rotate-right.svg?react';
import TickIcon from '@assets/icons/tick-circle.svg?react';

type ChipColor = 'warning' | 'success' | 'danger' | 'default' | 'primary' | 'secondary';
const statusMap = {
    active: {
        color: 'success',
        title: 'Active',
        icon: TickIcon,
    },
    processed: {
        color: 'success',
        title: 'Processed',
        icon: TickIcon,
    },
    filed: {
        color: 'success',
        title: 'Filed',
        icon: TickIcon,
    },
    inactive: {
        color: 'danger',
        title: 'Inactive',
        icon: CrossIcon,
    },
    unlimited: {
        color: 'success',
        title: 'Unlimited',
        icon: TickIcon,
    },
    expired: {
        color: 'danger',
        title: 'Expired',
        icon: CrossIcon,
    },
    in_progress: {
        color: 'warning',
        title: 'In Progress',
        icon: RightIcon,
    },
    not_applicable: {
        color: 'default',
        title: 'Not Applicable',
        icon: InfoIcon,
    },
    updated: {
        color: 'success',
        title: 'Updated',
        icon: TickIcon,
    },
    completed: {
        color: 'success',
        title: 'Completed',
        icon: TickIcon,
    },
    reconciled: {
        color: 'success',
        title: 'Reconciled',
        icon: TickIcon,
    },
    paid: {
        color: 'success',
        title: 'Paid',
        icon: TickIcon,
    },
    cancelled: {
        color: 'default',
        title: 'Cancelled',
        icon: CrossIcon,
    },
    partially_paid: {
        color: 'default',
        title: 'Partially Paid',
        icon: CrossIcon,
    },
    confirmed: {
        color: 'success',
        title: 'Confirmed',
        icon: TickIcon,
    },
    resolved: {
        color: 'success',
        title: 'Resolved',
        icon: TickIcon,
    },
    pending: {
        color: 'warning',
        title: 'Pending',
        icon: ClockIcon,
    },
    unpaid: {
        color: 'warning',
        title: 'Not Paid',
        icon: InfoIcon,
    },
    not_filed: {
        color: 'warning',
        title: 'Not Filed',
        icon: InfoIcon,
    },
    rejected: {
        color: 'danger',
        title: 'Rejected',
        icon: CrossIcon,
    },
    resubmit: {
        color: 'danger',
        title: 'Resubmit',
        icon: RightIcon,
    },
    high: {
        color: 'danger',
        title: 'High',
        icon: HighIcon,
    },
    medium: {
        color: 'warning',
        title: 'Medium',
        icon: MediumIcon,
    },
    low: {
        color: 'success',
        title: 'Low',
        icon: LowIcon,
    },
    true: {
        color: 'success',
        title: 'True',
        icon: TickIcon,
    },
    false: {
        color: 'danger',
        title: 'False',
        icon: CrossIcon,
    },
    expiring: {
        color: 'danger',
        title: 'Expiring Soon',
        icon: ClockIcon,
    },
    error: {
        color: 'danger',
        title: 'Error',
        icon: CrossIcon,
    },
    info: {
        color: 'default',
        title: 'Info',
        icon: InfoIcon,
    },
    warning: {
        color: 'warning',
        title: 'Warning',
        icon: InfoIcon,
    },
};

export type StatusKey = keyof typeof statusMap;

type CustomChipProps = {
    status: StatusKey;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    children?: React.ReactNode;
    showTooltip?: boolean;
};

export default function Chip({
    status,
    size = 'sm',
    className,
    children,
    showTooltip = false,
}: CustomChipProps) {
    const data = statusMap[status];
    if (!data)
        return (
            <Nextchip
                className={`px-2 py-1 font-semibold text-xs ${className}`}
                classNames={{
                    content: 'font-semibold ms-1',
                }}
                size={size}
                startContent={<InfoIcon className="flex-shrink-0" height={16} width={16} />}
                variant="flat"
            >
                {children}
            </Nextchip>
        );
    const { title, icon: IconComponent, color } = data;

    let statusTitle = '';
    if (typeof status === 'boolean') {
        statusTitle = status ? 'Done' : 'Not Done';
    } else {
        statusTitle = status?.toString()?.replaceAll('_', ' ') || '';
    }

    return (
        <Tooltip
            classNames={{
                base: 'text-xs',
                content: 'text-sm capitalize',
            }}
            content={statusTitle}
            isDisabled={!showTooltip}
            placement="bottom"
            radius="sm"
            shadow="sm"
        >
            <Nextchip
                className={`px-2 py-1 font-semibold text-xs text-${color === 'default' ? 'default-500' : color} ${className}`}
                classNames={{
                    content: 'font-semibold ms-1',
                }}
                color={color as ChipColor}
                size={size}
                startContent={<IconComponent className="flex-shrink-0" height={16} width={16} />}
                variant="flat"
            >
                {children || title}
            </Nextchip>
        </Tooltip>
    );
}
