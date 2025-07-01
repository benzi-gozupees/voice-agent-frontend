import { UserRole } from '@customTypes/general';
import { useAppSelector } from '@hooks/store';

const useBasePath = () => {
    const { user } = useAppSelector(state => state.auth);
    switch (user?.role) {
        case UserRole.USER:
            return '';
        case UserRole.USER:
            return '/tenant';
        case UserRole.ADMIN:
            return '/admin';
        default:
            return '';
    }
};

export default useBasePath;
