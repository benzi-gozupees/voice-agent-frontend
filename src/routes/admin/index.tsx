import { lazy, Suspense } from 'react';

import { Spinner } from '@nextui-org/react';
import { Outlet } from 'react-router-dom';

import DashboardPage from '@src/domains/admin/dashboard/pages/Dashboard';
import AuthGuard from '@src/guard/AuthGuard';
import BaseLayout from '@src/layouts/AdminLayout';

import paths from '../paths';

// const Settings = lazy(() => import('@src/domains/common/settings/pages/Settings'));

const adminRoutes = [
    {
        path: '',
        element: (
            <AuthGuard userRole="ADMIN">
                <BaseLayout>
                    <Suspense
                        fallback={
                            <div className="flex justify-center items-center mt-64">
                                <Spinner size="lg" />
                            </div>
                        }
                    >
                        <Outlet />
                    </Suspense>
                </BaseLayout>
             </AuthGuard>
        ),
        children: [
            { element: <DashboardPage />, path: paths.adminPaths.index },

            // {
            //     element: <Settings />,
            //     path: paths.adminPaths.settings.profile,
            // },
            // { element: <Settings />, path: paths.adminPaths.settings.changePassword },
        ],
    },
];

export default adminRoutes;
