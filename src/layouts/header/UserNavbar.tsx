import { useEffect, useMemo } from 'react';

import { NavbarContent, NavbarItem, Navbar as NextUINavbar } from '@nextui-org/navbar';
import { Spacer, useDisclosure } from '@nextui-org/react';
import { useLocation, useNavigate } from 'react-router-dom';

import HealthCheck from '@assets/icons/health-ok.svg?react';
import NavMenu from '@assets/icons/menu.svg?react';
import Documents from '@assets/icons/my_documents.svg?react';
import Button from '@components/atomic/Button';
// import NotificationPopover from '@domains/common/notifications/components/NotificationPopover';
import useModal from '@hooks/useModal';
import BrandLogo from '@layouts/components/BrandLogo';
import SettingsDropdown from '@layouts/components/SettingsDropdown';
import Sidebar from '@layouts/components/Sidebar';

import userNavbarItems, { NavItem } from '../nav-items/userNavItems';

export default function UserNavbar({ services }: { services: any | undefined }) {
    const navigate = useNavigate();
    const modal = useModal();

    const handleTabClick = (item: any) => {
        navigate(item);
    };

    const { isOpen, onOpenChange, onClose } = useDisclosure();
    const { pathname } = useLocation();
    useEffect(onClose, [pathname]);

    const items: NavItem[] = useMemo(() => {
        if (services?.allow_all_services) return userNavbarItems;
        return userNavbarItems.filter(item => {
            if (item.showAlways) return true;
            return true;
        });
    }, [services]);

    return (
        <>
            <NextUINavbar
                className="py-2 border-b"
                classNames={{
                    wrapper: 'ps-2 pe-2 lg:px-4 gap-0',
                }}
                maxWidth="full"
                position="sticky"
            >
                <NavbarContent
                    className="xl:hidden flex justify-start items-center gap-1"
                    justify="start"
                >
                    <Button
                        isIconOnly
                        className="min-w-8 h-8 p-0"
                        color="icon"
                        onClick={onOpenChange}
                    >
                        <NavMenu height={32} width={32} />
                    </Button>
                    <div className="pb-1 hidden xs:block">
                        <BrandLogo height={24} width={96} />
                    </div>
                </NavbarContent>

                <NavbarContent className="gap-1 xs:gap-2 md:gap-4" justify="end">
                    <NavbarItem className="hidden md:flex gap-1">
                        {/* <Button
                            className="bg-default-100 text-secondary text-sm min-w-12"
                            color="default"
                            startContent={<HealthCheck />}
                            onClick={() => modal.openModal()}
                        >
                            <span className="">AI Health Check</span>
                        </Button> */}
                    </NavbarItem>

                    <NavbarItem className="hidden md:flex gap-1">
                        <Button
                            className="bg-default-100 text-secondary text-sm min-w-12"
                            color="default"
                            startContent={<Documents height={20} width={20} />}
                            onClick={() => navigate('/documents')}
                        >
                            <span className="hidden lg:flex">My Documents</span>
                        </Button>
                    </NavbarItem>

                    <NavbarItem>
                        {/* <NotificationPopover /> */}
                    </NavbarItem>

                    <NavbarItem className="flex-shrink-0">
                        <SettingsDropdown />
                    </NavbarItem>
                </NavbarContent>

            </NextUINavbar>
            <div
                className={`fixed inset-0 top-[81px] bg-black/10 transition-all z-50 ${isOpen ? 'visible xl:invisible' : 'invisible'}`}
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyUp={onClose}
            >
                <div
                    className={`bg-white h-dvh w-[280px] p-2 transition-all ${isOpen ? 'translate-x-0 xl:-translate-x-[300px]' : '-translate-x-[300px]'}`}
                >
                    <div className="h-full overflow-y-auto scrollbar-hide">
                        <div className="flex flex-col items-start pb-20">
                            <div className="ms-6">
                                <Sidebar
                                    handleTabClick={handleTabClick}
                                    items={items}
                                    pathname={pathname}
                                />
                            </div>
                            <Spacer y={16} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
