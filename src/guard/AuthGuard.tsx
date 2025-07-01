import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@src/hooks/store';
import useRootPath from '@src/hooks/useRootPath';
import paths from '@src/routes/paths';

type AuthGuardProps = {
    children: React.ReactNode;
    userRole: string;
};

export default function AuthGuard({ children, userRole }: AuthGuardProps) {
    // const { user, isAuthenticated } = useAppSelector(state => state.auth);
    // const navigate = useNavigate();
    // const rootPath = useRootPath();
    // useEffect(() => {
    //     if (!user || !isAuthenticated) {
    //         const href = paths.authPaths.jwt.login;
    //         navigate(`/${href}`, { replace: true });
    //     } else if (user && userRole && user.role !== userRole) {
    //         navigate(rootPath, { replace: true });
    //     } else if (user && userRole === 'TENANT') {
    //         const href = paths.userPaths.settings.profile;
    //         navigate(`/${href}`, { replace: true });
    //     }
    // }, [isAuthenticated, navigate, rootPath, user, userRole]);

    // if (!user || user.role !== userRole || !isAuthenticated) return null;
    return children;
}
