import { Button, ButtonProps, Link, Tooltip } from '@nextui-org/react';

import UserIcon from '@assets/icons/assign_accountant.svg?react';
import Attachment from '@assets/icons/attachment.svg?react';
import ChatIcon from '@assets/icons/chat.svg?react';
import Completed from '@assets/icons/completed.svg?react';
import TickIcon from '@assets/icons/confirm_filled.svg?react';
import CrossIcon from '@assets/icons/cross.svg?react';
import DeleteIcon from '@assets/icons/delete.svg?react';
import EditIcon from '@assets/icons/edit.svg?react';
import RefreshIcon from '@assets/icons/refresh.svg?react';
import ViewIcon from '@assets/icons/view.svg?react';

export interface ActionButtonProps extends Omit<ButtonProps, 'type'> {
    type:
        | 'edit'
        | 'delete'
        | 'view'
        | 'completed'
        | 'cancel'
        | 'tick'
        | 'confirm'
        | 'reject'
        | 'chat'
        | 'reconcile'
        | 'process'
        | 'assign_accountant'
        | 'attachment';
    onClick?: () => void;
    href?: string;
    tooltipContent?: string;
}

export const icons: Record<string, JSX.Element> = {
    edit: <EditIcon height={30} width={30} />,
    delete: <DeleteIcon className="text-primary" height={30} width={30} />,
    view: <ViewIcon />,
    completed: <Completed fill="#5350F9" height={18} width={18} />,
    cancel: <CrossIcon fill="#5350F9" height={18} width={18} />,
    reject: <CrossIcon fill="#5350F9" height={18} width={18} />,
    confirm: <TickIcon fill="#5350F9" height={18} width={18} />,
    tick: <TickIcon fill="#5350F9" height={18} width={18} />,
    chat: <ChatIcon className="text-[#5350F9]" height={18} width={18} />,
    reconcile: <TickIcon fill="#5350F9" height={18} width={18} />,
    process: <RefreshIcon className="text-[#5350F9]" height={16} width={16} />,
    assign_accountant: <UserIcon height={18} width={18} />,
    attachment: <Attachment height={18} width={18} />,
};

function ActionButton({ type, onClick, href, tooltipContent, ...props }: ActionButtonProps) {
    const buttonProps: ButtonProps = {
        isIconOnly: true,
        className: 'bg-transparent',
        onClick,
        ...(href ? { as: Link, href } : {}),
        ...props,
    };

    return (
        <Tooltip
            classNames={{
                base: 'text-xs',
                content: tooltipContent ? 'text-sm' : 'capitalize text-sm',
            }}
            content={tooltipContent || type.replaceAll('_', ' ')}
            placement="bottom"
            radius="sm"
            shadow="sm"
        >
            <Button {...buttonProps}>{icons[type]}</Button>
        </Tooltip>
    );
}

export default ActionButton;
