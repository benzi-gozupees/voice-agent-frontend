import {
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    Navbar as NextUINavbar,
} from '@nextui-org/navbar';
import { Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import ArrowDown from '@assets/icons/arrow_down.svg?react';
import logout from '@assets/icons/logout.svg';
import settings from '@assets/icons/settings.svg';
import userImageDummy from '@assets/icons/user.svg';
import Button from '@components/atomic/Button';
import Dropdown, { DropdownItem, DropdownMenu, DropdownTrigger } from '@components/atomic/DropDown';
import useLogout from '@domains/auth/hooks/useLogout';
import { useAppSelector } from '@hooks/store';

export default function AdminNavbar() {
    const { handleLogout } = useLogout();
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.auth);

    return (
        <NextUINavbar className="py-2 border-b" maxWidth="2xl" position="sticky">
            <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem className="hidden sm:flex gap-1">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                className="rounded-xl bg-default-100"
                                color="default"
                                endContent={<ArrowDown className="ml-3" height={15} width={15} />}
                            >
                                <div className="flex items-center gap-3">
                                    <Image
                                        className="max-w-32 line-clamp-1"
                                        height={24}
                                        src={user?.user_profile_image || userImageDummy}
                                        width={24}
                                    />
                                    <span>{user?.company_name || ''}</span>
                                </div>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Actions" color="text">
                            <DropdownItem
                                key="settings"
                                startContent={<Image height={24} src={settings} width={24} />}
                                onClick={() => navigate('/admin/settings/profile')}
                            >
                                Settings
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                className="text-danger data-[hover=true]:text-danger"
                                startContent={<ReactSVG height={24} src={logout} width={24} />}
                                onClick={() => handleLogout()}
                            >
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                {/* <ThemeSwitch /> */}
                <NavbarMenuToggle />
            </NavbarContent>
        </NextUINavbar>
    );
}
