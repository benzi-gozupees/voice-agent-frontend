import { Button } from '@nextui-org/button';

import Skeleton from '@components/atomic/Skeleton';

import userNavbarItems from '../nav-items/userNavItems';

type NavbarItem = {
    id: string;
    title: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    activeIcon: React.FC<React.SVGProps<SVGSVGElement>>;
    index: string;
    routes: string[];
    showAlways?: boolean;
};

type SidebarProps = {
    items: NavbarItem[];
    pathname: string;
    handleTabClick: (item: any) => void;
    isLoading?: boolean;
};

export default function Sidebar({
    items,
    pathname,
    handleTabClick,
    isLoading = false,
}: SidebarProps) {
    if (isLoading) {
        return (
            <div className="flex flex-col items-start gap-4">
                {userNavbarItems.map(it => (
                    <div key={it.id} className="flex items-center gap-4 ms-2 p-2">
                        <div className="size-5 relative">
                            <Skeleton className="rounded-xl size-6" />
                        </div>
                        <Skeleton className="flex-grow">{it.title}</Skeleton>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start gap-4">
            {items.map(item => (
                <Button
                    key={item.index}
                    disableRipple
                    className="bg-transparent hover:bg-transparent text-[#585858] data-[hover=true]:text-primary"
                    variant="solid"
                    onClick={() => handleTabClick(item.index)}
                >
                    <div className="flex items-center gap-4 -ms-4">
                        <div className="size-5 relative">
                            <item.icon
                                className={`absolute inset-0 transition-transform-opacity ${item.index === pathname ? 'opacity-0' : 'opacity-100'}`}
                                height={20}
                                width={20}
                            />
                            <item.activeIcon
                                className={`absolute inset-0 transition-transform-opacity ${item.index !== pathname ? 'opacity-0' : 'opacity-100 text-secondary'}`}
                                height={20}
                                width={20}
                            />
                        </div>
                        <div className="flex-grow relative w-[100px]">
                            <span
                                className={`absolute left-0 top-[50%] -translate-y-[50%] transition-transform-opacity line-clamp-1 ${item.index === pathname ? 'text-secondary' : ''}`}
                            >
                                {item.title}
                            </span>
                        </div>
                    </div>
                </Button>
            ))}
        </div>
    );
}
