import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    setLogin,
    setLogout,
    setRedirectURL,
    setUser,
} from '@domains/auth/slices/auth';
import { useAppDispatch, useAppSelector } from '@hooks/store';

type PersistStateProps = {
    // loading: React.ReactNode;
    children: React.ReactNode;
};

const authChannel = new BroadcastChannel('authChannel');
const tabId = Math.random().toString(36).substring(7);

export default function PersistState({ children }: PersistStateProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); // ✅ added navigate
    const [isLoading, setIsLoading] = useState(true);

    // Retrieve user data from localStorage/sessionStorage and dispatch actions
    const getUser = () => {
        const authInfo = localStorage.getItem('auth') || sessionStorage.getItem('auth');
        if (authInfo) {
            const auth = JSON.parse(authInfo);
            const {
                role,
                token,
                refresh_token,
                user,
                redirectURL,
            } = auth;
            dispatch(
                setLogin({
                    role,
                    token,
                    refresh_token
                })
            );
            dispatch(setRedirectURL(redirectURL));
            dispatch(setUser(user));
        }
    };

    // Clear user data from storage and dispatch logout action
    const removeUser = () => {
        localStorage.removeItem('auth');
        sessionStorage.removeItem('auth');
        dispatch(setLogout());
    };

    const auth = useAppSelector(state => state.auth);
    // Synchronize user session across tabs using BroadcastChannel
    useEffect(() => {
        const handleLoginEvent = (event: MessageEvent) => {
            const { type, sessionId } = event.data;
            // Ignore events from the same tab
            if (sessionId === tabId) return;
            if (type === 'logout') window.location.reload();
            else if (type === 'login') window.location.reload();
        };

        authChannel.addEventListener('message', handleLoginEvent);

        return () => {
            authChannel.removeEventListener('message', handleLoginEvent);
        };
    }, []);

    useEffect(() => {
        getUser();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            if (auth && auth.isAuthenticated) {
                localStorage.setItem('auth', JSON.stringify(auth));
                sessionStorage.setItem('auth', JSON.stringify(auth));

                if (auth.redirectURL) {
                    navigate(auth.redirectURL, { replace: true }); // ✅ perform navigation
                }
            } else {
                removeUser();
            }
        }
    }, [isLoading, auth, navigate]); // ✅ included navigate in dependency

    if (isLoading) return null;
    return children;
}

export function broadcastLoginEvent() {
    authChannel.postMessage({ type: 'login', sessionId: tabId });
}

export function broadcastLogoutEvent() {
    authChannel.postMessage({ type: 'logout', sessionId: tabId });
}
