import { Link, Button as NextButton } from '@nextui-org/react';

import MoreIcon from '@assets/icons/more-hollow.svg?react';
import { icons } from '@components/atomic/ActionButton';
import Dropdown, { DropdownItem, DropdownMenu, DropdownTrigger } from '@components/atomic/DropDown';

export default function MoreDropdown({ items }: { items: any[] }) {
    return (
        <Dropdown className="w-6">
            <DropdownTrigger>
                <NextButton isIconOnly className="bg-transparent">
                    <MoreIcon className="text-[#5350F9]" height={22} width={22} />
                </NextButton>
            </DropdownTrigger>
            <DropdownMenu aria-label="Actions">
                {items.map(item => (
                    <DropdownItem
                        key={item.type}
                        as={Link}
                        className="capitalize"
                        startContent={icons[item.type]}
                        title={item.tooltipContent || item.type.replaceAll('_', ' ')}
                        {...(item.href ? { href: item.href } : {})}
                        onClick={item.onClick}
                    />
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}
