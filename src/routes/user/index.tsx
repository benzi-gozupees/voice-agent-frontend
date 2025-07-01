import { lazy, Suspense } from 'react';

import { CircularProgress } from '@nextui-org/react';
import { Outlet } from 'react-router-dom';

import AuthGuard from '@src/guard/AuthGuard';
import BaseLayout from '@src/layouts/UserLayout';

import paths from '../paths';
import Assistant from '@domains/user/assistant/pages/Assistant';

// const Notifications = lazy(() => import('@domains/common/notifications/pages/Notifications'));
const Expenses = lazy(() => import('@src/domains/user/expenses/pages/Expenses'));
// const Settings = lazy(() => import('@src/domains/common/settings/pages/Settings'));
const DashboardPage = lazy(() => import('@domains/user/dashboard/pages/Dashboard'));

const userRoutes = [
    {
        path: '',
        element: (
            <AuthGuard userRole="TENANT">
                <BaseLayout>
                    <Suspense
                        fallback={
                            <div className="h-full flex justify-center items-center">
                                <CircularProgress
                                    classNames={{
                                        svg: 'w-16 h-16',
                                        indicator: 'stroke-primary',
                                        track: 'stroke-default-50',
                                    }}
                                    strokeWidth={2}
                                />
                            </div>
                        }
                    >
                        <Outlet />
                    </Suspense>
                </BaseLayout>
            </AuthGuard>
        ),
        children: [
            {
                element: <DashboardPage />,
                path: paths.userPaths.index,
            },
            { element: <Expenses />, path: paths.userPaths.expenses },
            { element: <Assistant />, path: paths.userPaths.assistant },
            // { element: <Notifications />, path: paths.userPaths.notifications },
            // {
            //     element: <Settings />,
            //     path: paths.userPaths.settings.profile,
            // },
            // { element: <Settings />, path: paths.userPaths.settings.changePassword },
            // { element: <Settings />, path: paths.userPaths.settings.myPlans },
            // { element: <Settings />, path: paths.userPaths.settings.software },
            // { element: <Settings />, path: paths.userPaths.settings.support },
            // { element: <Settings />, path: paths.userPaths.settings.passwords },
            // { element: <Settings />, path: paths.userPaths.settings.alerts },
            // { element: <Settings />, path: paths.userPaths.settings.referal },
        ],
    },
];

export default userRoutes;

export const allUserRoutes = userRoutes[0].children.map(it => it.path);
