import { useMemo } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { useAppSelector } from '@hooks/store';
import useRootPath from '@hooks/useRootPath';
import NotFound from '@src/pages/NotFound';

import adminRoutes from './admin';
import authRoutes from './auth';
import { commonRoutes } from './common';
import userRoutes from './user';
import { all } from 'axios';

export default function Router() {
    const rootPath = useRootPath();
    const { user } = useAppSelector(state => state.auth);

    const routes = useMemo(() => {
        const allRoutes = [
            {
                path: '/',
                element: <Navigate replace to={rootPath} />,
            },
            ...commonRoutes,
            ...authRoutes,
        ];

        if (user?.role === 'TENANT') allRoutes.push(...userRoutes);
        else if (user?.role === 'ADMIN') allRoutes.push(...adminRoutes);
        allRoutes.push({ path: '*', element: <NotFound /> });
        return allRoutes;
    }, [user , rootPath]);

    return useRoutes(routes);
}
