import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { Link, matchRoutes, useNavigate, useSearchParams } from 'react-router-dom';

import Logo from '@assets/icons/logo.svg?react';
import Button from '@components/atomic/Button';
import Chip from '@components/atomic/Chip';
import SplashScreen from '@components/molecular/SplashScreen';
import { directLogin } from '@domains/auth/api/authApi';
import {
    setDestination,
    setLogin,
    setRedirectURL,
    setUser,
} from '@domains/auth/slices/auth';
import { broadcastLoginEvent } from '@layouts/components/PersistState';
import userRoutes from '@routes/user';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import useRootPath from '@src/hooks/useRootPath';
import { useLocation } from 'react-router-dom';

type GuestGuardProps = {
    children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
    const navigate = useNavigate();
    const rootPath = useRootPath();
    const {
        isAuthenticated,
        role,
        user: currentUser,
        destination: redirect,
    } = useAppSelector(state => state.auth);    
    const [searchParams] = useSearchParams();
    const destination = searchParams.get('destination') || rootPath;
    const loginToken = searchParams.get('token') || '';
    const redirectURL = searchParams.get('redirect_url') || '';
    const sessionId = searchParams.get('session_id') || '';
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const fullPath = location.pathname;
    const authAction = fullPath.split('/').pop();

    const dispatch = useAppDispatch();
    const { mutate, isPending, error, isSuccess } = useMutation({
        mutationFn: directLogin,
        onSuccess: data => {
            const user = {
                ...data,
                token: data.token,
                refresh_token: data.refresh_token,
            };
            const {
                token,
                refresh_token,
                id
            } = data;
            dispatch(
                setLogin({
                    role: user.role,
                    token: user.token,
                    refresh_token: user.refresh_token,
                })
            );
            dispatch(setUser(user));
            dispatch(setRedirectURL(redirectURL));
            dispatch(setDestination(destination));
            broadcastLoginEvent();
        },
    });

    useEffect(() => {
        if (loginToken) {
            if (isAuthenticated) {
                const decodedToken = jwtDecode(loginToken);
                if (currentUser?.id === (decodedToken as any).id) navigate(`/${destination}`);
                else mutate({ token: loginToken, redirectURL, sessionId });
            } else mutate({ token: loginToken, redirectURL, sessionId });
        } else if (isAuthenticated) {
            if(authAction ==="register")return
            if (!redirect) navigate(rootPath);
            else if (role === 'TENANT') {
                const isMatched = matchRoutes(userRoutes, redirect);
                if (isMatched) navigate(redirect);
                else navigate(rootPath);
            } else {
                navigate(rootPath);
            }
        }
        setIsLoading(false);
    }, [
        currentUser?.id,
        destination,
        isAuthenticated,
        loginToken,
        mutate,
        navigate,
        redirect,
        redirectURL,
        role,
        rootPath,
        sessionId,
    ]);

    if (isLoading || isPending) return <SplashScreen tag="guard" />;

    if (error) {
        const customError = error as any;
        const message =
            customError?.response?.data.message || 'Something went wrong. Please try again later.';
        return (
            <div className="absolute inset-0 z-[99999] min-h-[90vh] flex flex-col gap-4 justify-center items-center overflow-hidden bg-white">
                <div className="flex flex-col justify-center items-center gap-4 text-center">
                    <Logo width={150} />
                    <Chip status="error">{message}</Chip>
                    <Link to={redirectURL}>
                        <Button color="transparent" size="sm">
                            Go Back
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
    return children;
}
