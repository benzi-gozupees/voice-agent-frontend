import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import LeftArrow from '@assets/icons/left_arrow.svg?react';
import Button from '@components/atomic/Button';

type GoBackProps = {
    title: string;
    to?: string | number;
    className?: string;
    onClick?: () => void;
    fallbackPath?: string;
};

export default function GoBack({ title, to = -1, className, onClick, fallbackPath }: GoBackProps) {
    const navigate = useNavigate();
    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }
        if (typeof to === 'number') {
            if (!window.history.state) {
                navigate(fallbackPath ?? '/');
            }
            navigate(to);
        } else navigate(to);
    };
    return (
        <Button
            disableRipple
            className={twMerge('border-0 gap-0 p-0 text-foreground', className)}
            color="transparent"
            size="fit"
            startContent={<LeftArrow height={20} width={20} />}
            onClick={handleClick}
        >
            <span className="ms-2 text-xl font-semibold">{title}</span>
        </Button>
    );
}
