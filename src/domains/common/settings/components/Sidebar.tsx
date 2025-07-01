import { Tab, Tabs } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import Alert from '@assets/icons/alert.svg?react';
import Integrations from '@assets/icons/integrations.svg?react';
import Key from '@assets/icons/key.svg?react';
import Subscription from '@assets/icons/my_plans.svg?react';
import Refer from '@assets/icons/refer.svg?react';
import Settings from '@assets/icons/settings.svg?react';
import User from '@assets/icons/user.svg?react';
import { ScrollArea } from '@components/atomic/ScrollArea';
import { useAppSelector } from '@hooks/store';

type SidebarProps = {
    activeTab: string;
    setActiveTab: (key: string) => void;
};

function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
    const navigate = useNavigate();
    const { user} = useAppSelector(state => state.auth);
    const handleTabChange = async (key: string) => {
        setActiveTab(key); // Update the active tab state
        if (key === 'myProfile') {
            navigate(user?.role === 'TENANT' ? '/settings/profile' : `/${user?.role}/settings/profile`, {
                replace: true,
            });
        } else if (key === 'myPassword') {
            navigate('/settings/my-passwords', { replace: true });
        } else if (key === 'myPlans') {
            navigate('/settings/my-plans', { replace: true });
        } else if (key === 'software') {
            navigate('/settings/softwares', { replace: true });
        } else if (key === 'support') {
            navigate('/settings/support', { replace: true });
        } else if (key === 'alerts') {
            navigate('/settings/alerts', { replace: true });
        } else if (key === 'referral') {
            navigate('/settings/referral', { replace: true });
        }
    };

    return (
        <div className="sm:w-full">
            <ScrollArea className="" orientation="horizontal">
                <Tabs
                    fullWidth
                    aria-label="Sidebar Tabs"
                    classNames={{
                        tabList: 'flex bg-transparent over',
                        cursor: 'shadow-none rounded-3xl group-data-[selected=true]:bg-[#EFF3FF]',
                        tab: 'p-6 min-h-[90px] rounded-3xl border border-light bg-[#F7F9FF] justify-center hover:text-[#262467]',
                        tabContent: 'group-data-[selected=true]:text-[#262467]',
                    }}
                    selectedKey={activeTab}
                    onSelectionChange={key => handleTabChange(key.toString())}
                >
                    <Tab
                        key="myProfile"
                        title={
                            <div className="flex flex-col items-center gap-1 px-2 group-hover:text-[#262467]">
                                <User height={20} width={20} />
                                <span className="text-base font-medium">Profile</span>
                            </div>
                        }
                    />
                    {/* {!auto_login && (
                        <Tab
                            key="changePassword"
                            title={
                                <div className="flex flex-col items-center gap-1 px-2 group-hover:text-[#262467]">
                                    <Key height={20} width={20} />
                                    <span className="text-base font-medium">Change Password</span>
                                </div>
                            }
                        />
                    )} */}
                    {user?.role === 'TENANT' && (
                        <Tab
                            key="myPlans"
                            title={
                                <div className="flex flex-col items-center gap-1 px-2 group-hover:text-[#262467]">
                                    <Subscription height={20} width={20} />
                                    <span className="text-base font-medium">My Plans</span>
                                </div>
                            }
                        />
                    )}
                    {user?.role === 'TENANT' && (
                        <Tab
                            key="myPassword"
                            title={
                                <div className="flex flex-col items-center gap-1 px-2 group-hover:text-[#262467]">
                                    <Key height={20} width={20} />
                                    <span className="text-base font-medium">My Passwords</span>
                                </div>
                            }
                        />
                    )}

                    {user?.role === 'TENANT' && (
                        <Tab
                            key="software"
                            title={
                                <div className="flex flex-col items-center gap-1 px-2 group-hover:text-[#262467]">
                                    <Integrations height={20} width={20} />
                                    <span className="text-base font-medium">Integrations</span>
                                </div>
                            }
                        />
                    )}

                    {user?.role === 'TENANT' && (
                        <Tab
                            key="alerts"
                            title={
                                <div className="flex flex-col items-center gap-1 px-2 group-hover:text-[#262467]">
                                    <Alert height={20} width={20} />
                                    <span className="text-base font-medium">Alerts</span>
                                </div>
                            }
                        />
                    )}

                    {user?.role === 'TENANT' && (
                        <Tab
                            key="support"
                            title={
                                <div className="flex flex-col items-center gap-1 px-2 group-hover:text-[#262467]">
                                    <Settings height={20} width={20} />
                                    <span className="text-base font-medium">Support</span>
                                </div>
                            }
                        />
                    )}
                    {user?.role === 'TENANT' && (
                        <Tab
                            key="referral"
                            title={
                                <div className="flex flex-col items-center gap-1 px-2 group-hover:text-[#262467]">
                                    <Refer height={20} width={20} />
                                    <span className="text-base font-medium">Referrals</span>
                                </div>
                            }
                        />
                    )}
                </Tabs>
            </ScrollArea>
        </div>
    );
}

export default Sidebar;
