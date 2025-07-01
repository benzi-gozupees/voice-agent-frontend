import { useCallback, useEffect, useMemo, useState } from "react";

import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import ModalProvider from "@components/modals/ModalProvider";
import { useAppSelector } from "@hooks/store";
import AdminNavbar from "@layouts/header/AdminNavbar";
import adminNavItemsAll from "@layouts/nav-items/adminNavItems";

import { accessLevel } from "./api";
import BrandLogo from "./components/BrandLogo";
import Sidebar from "./components/Sidebar";
import Footer from "./footer/Footer";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type BaseLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: BaseLayoutProps) {
  document.title = "Admin Panel | GoZupees";
  const [selectedTab, setSelectedTab] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { user } = useAppSelector((state) => state.auth);

  const { data, isPending } = useQuery({
    queryKey: ["accessLevel"],
    queryFn: accessLevel,
    enabled: !!user,
  });

  const adminNavItems = useMemo(() => {
    return adminNavItemsAll;
    if (data) {
      // if (data.is_super_admin) return adminNavItemsAll;
      // return adminNavItemsAll.filter(item => {
      //     if (item.showAlways) return true;
      //     if (data.permissions.find(p => p.route === item.id)) {
      //         return true;
      //     }
      //     return false;
      // });
    }
    return [];
  }, [data]);

  const handleTabClick = (item: any) => {
    setSelectedTab(item);
    navigate(item);
  };

  const tabStyles = useMemo(
    () => ({
      tabList: "gap-8 items-start",
      cursor: "shadow-none",
      tab: "justify-start text-lg",
      tabContent: "group-data-[selected=true]:text-secondary",
    }),
    [pathname]
  );

  const isInNavbar = useMemo(
    () =>
      adminNavItems.some((item) => item.routes.some((it) => it === pathname)),
    [adminNavItems, pathname]
  );

  useEffect(() => {
    const navItem = adminNavItems.find((item) =>
      item.routes.some((it) => it === pathname)
    );
    if (navItem) {
      setSelectedTab(navItem.index);
    }
  }, [adminNavItems, pathname]);

  const renderBody = useCallback(() => {

    if (isPending || !adminNavItems.length)
      return (
        <div className="container mx-auto max-w-[1536px] flex-grow relative px-4">
          <div className="absolute inset-0 bottom-4 flex flex-col rounded-xl bg-white">
            <div className="flex-grow">
              <div className="min-h-screen flex justify-center items-center">
                <Spinner size="lg" />
              </div>
            </div>
            <div className="px-4 border-t pb-4">
              <Footer />
            </div>
          </div>
        </div>
      );

    if (!isInNavbar) {
      // if (pathname === '/admin/chat') {
      //     return (
      //         <div className="container mx-auto max-w-[1536px] flex-grow relative px-4">
      //             <div className="absolute inset-0 bottom-4 flex flex-col rounded-xl bg-white">
      //                 <div className="flex-grow">
      //                     <div className="min-h-screen flex justify-center items-center">
      //                         <Spinner size="lg" />
      //                     </div>
      //                 </div>
      //                 <div className="px-4 border-t pb-4">
      //                     <Footer />
      //                 </div>
      //             </div>
      //         </div>
      //     );
      // }
      // return (
      //     <div className="flex-grow relative mb-4 px-10 min-h-dvh">
      //         <div className="h-full inset-0 bottom-4 flex flex-col rounded-xl bg-white">
      //             <div className="flex-grow">{children}</div>
      //             <div className="px-4 border-t pb-4">
      //                 <Footer />
      //             </div>
      //         </div>
      //     </div>
      // );
    }

    return (
      <main className="flex min-h-dvh">
        <div className="hidden xl:block min-w-[280px] mx-auto bg-bgcolor">
          <div className="fixed top-0 w-[280px] flex flex-col items-center">
            <div className=" py-8 mr-14">
              <BrandLogo height={38} width={156} />
            </div>
            <ScrollArea>
              <div>
                <Sidebar
                  handleTabClick={handleTabClick}
                  items={adminNavItems as any}
                  pathname={pathname}
                />
              </div>
            </ScrollArea>


          </div>
        </div>
        <div className="flex-grow flex flex-col sm:border-l w-screen">
          <AdminNavbar />
          <div className="flex-grow p-2 sm:p-4 overflow-hidden">{children}</div>
          <Footer />
        </div>
      </main>
    );
  }, [adminNavItems, isInNavbar, isPending, pathname, selectedTab, tabStyles]);

  return (
    <>
    {renderBody()}
      <ModalProvider />
    </>
  );
}
