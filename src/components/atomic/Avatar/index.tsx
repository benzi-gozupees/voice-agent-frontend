import { Avatar as NextAvatar, AvatarProps as NextAvatarProps } from '@nextui-org/react';

import CompanyDefault from '@assets/icons/company-default.svg?react';
import UserIcon from '@assets/icons/user-filled.svg?react';

type AvatarProps = NextAvatarProps & {
    type?: 'user' | 'company';
};

export default function Avatar({ type = 'user', ...props }: AvatarProps) {
    return (
        <NextAvatar
            classNames={{
                base: 'border border-divider text-primary bg-primary-100',
            }}
            fallback={
                type === 'user' ? (
                    <UserIcon height={24} width={24} />
                ) : (
                    <CompanyDefault height={24} width={24} />
                )
            }
            {...props}
        />
    );
}
