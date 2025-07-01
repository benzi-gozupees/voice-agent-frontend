import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { broadcastLogoutEvent } from '@layouts/components/PersistState';
import { genericError } from '@src/constants/messages';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';

import { logout } from '../api/authApi';
import { setLogout } from '../slices/auth';

export default function useLogout() {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const { redirectURL } = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            dispatch(setLogout());
            broadcastLogoutEvent();
            queryClient.removeQueries();
            if (redirectURL) window.location.href = redirectURL;
            else navigate('/login');
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || genericError;
            toast.error(message);
        },
    });

    const handleLogout = mutate;

    return { handleLogout, isPending };
}
