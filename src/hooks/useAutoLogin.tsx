import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { autoLogin } from '@domains/auth/api/authApi';

const useAutoLogin = () => {
    const [isTriggered, setIsTriggered] = useState(false);

    const { refetch, isFetching, data, error } = useQuery({
        queryKey: ['autoLogin'],
        queryFn: autoLogin,
        enabled: false,
    });

    const autologin = async () => {
        if (isTriggered) return;
        setIsTriggered(true);

        try {
            const result = await refetch();
            if (result.isSuccess && result.data?.url) {
                toast.success('Redirecting to peko...');
                window.open(result.data.url, '_blank');
            } else {
                const message = 'Something went wrong';
                toast.error(message);
            }
        } catch (err) {
            const message = 'Something went wrong';
            toast.error(message);
        } finally {
            setIsTriggered(false);
        }
    };

    return { autologin, isPending: isFetching || isTriggered };
};

export default useAutoLogin;
