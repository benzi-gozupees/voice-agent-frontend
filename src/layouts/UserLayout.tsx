import { useCallback, useEffect, useMemo, useState } from 'react';

import { Spacer } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { ScrollArea } from '@components/atomic/ScrollArea';
import ModalProvider from '@components/modals/ModalProvider';
import { useAppSelector } from '@hooks/store';

import { getServices } from './api';
import BrandLogo from './components/BrandLogo';
import Sidebar from './components/Sidebar';
import Footer from './footer/Footer';
import UserNavbar from './header/UserNavbar';
import userNavbarItems, { NavItem } from './nav-items/userNavItems';

type BaseLayoutProps = {
    children: React.ReactNode;
};

export default function UserLayout({ children }: BaseLayoutProps) {
    const [callAgent, setCallAgent] = useState<any>(null);

    const { user } = useAppSelector(state => state.auth);

    const navigate = useNavigate();
    const location = useLocation();

    const { pathname } = location;
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location.hash]);

    const { data: services, isPending } = useQuery({
        queryKey: ['getServices'],
        queryFn: getServices,
        enabled: user?.role === 'TENANT',
    });

    const items: NavItem[] = useMemo(() => {
        if (services?.allow_all_services) return userNavbarItems;
        return userNavbarItems.filter(item => {
            if (item.showAlways) return true;
            if (services?.services.find(p => p === item.id)) {
                return true;
            }
            return false;
        });
    }, [services]);

    const renderBody = useCallback(
        () => (
            <main className="flex min-h-dvh">
                <div className="hidden xl:block w-[300px] min-w-[300px] mx-auto">
                    <div className="fixed top-0 w-[300px] flex flex-col px-2 h-full pt-8">
                        <BrandLogo height={38} width={156} />
                        <Spacer y={8} />
                        <ScrollArea>
                            <div className="flex flex-col items-center justify-center">
                                <Sidebar
                                    handleTabClick={navigate}
                                    isLoading={isPending}
                                    items={items}
                                    pathname={pathname}
                                />
                                <Spacer y={16} />
                                <Spacer y={4} />
                            </div>
                        </ScrollArea>
                    </div>
                </div>
                <div className="flex-grow min-w-0 flex flex-col sm:border-l bg-white z-10">
                    <UserNavbar services={services} />
                    <div className="flex-grow p-2 sm:p-6 overflow-hidden">{children}</div>
                    <Footer />
                </div>
            </main>
        ),
        [children, isPending, items, navigate, pathname, services]
    );

    return (
        <>
            {renderBody()}
            <ModalProvider />
        </>
    );
}
