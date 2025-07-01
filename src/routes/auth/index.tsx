import { Outlet } from 'react-router-dom';

// import LockScreen from '@src/domains/auth/components/LockScreen';
import ForgotPasswordPage from '@src/domains/auth/pages/ForgotPassword';
import LoginPage from '@src/domains/auth/pages/Login';
import RegisterPage from '@src/domains/auth/pages/Register';
import SubscriptionPage from '@src/domains/auth/pages/Subscription';
import GuestGuard from '@src/guard/GuestGuard';

import paths from '../paths';

const authRoutes = [
    {
        path: '',
        element: (
            <GuestGuard>
                <Outlet />
            </GuestGuard>
        ),
        children: [
            { element: <LoginPage />, path: paths.authPaths.jwt.login },
            { element: <RegisterPage />, path: paths.authPaths.jwt.register },
            { element: <SubscriptionPage />, path: paths.authPaths.subscription },
            { element: <ForgotPasswordPage />, path: paths.authPaths.forgotPassword },
            // { element: <LockScreen />, path: paths.authPaths.lockScreen },
        ],
    },
];

export default authRoutes;
