import { UserRole } from '@customTypes/general';
import { useAppSelector } from '@hooks/store';

const useRootPath = () => {
    const { user } = useAppSelector(state => state.auth);
    switch (user?.role) {
        case UserRole.USER:
            return '/dashboard';
        case UserRole.ADMIN:
            return '/admin/dashboard';
        default:
            return '/login';
    }
};

export default useRootPath;
