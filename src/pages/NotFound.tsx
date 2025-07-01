import { useEffect, useState } from 'react';

import { Spacer } from '@nextui-org/react';
import { Link, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import error404 from '@assets/images/error-404.svg';
import Button from '@components/atomic/Button';
import { setDestination } from '@domains/auth/slices/auth';
import { useAppDispatch } from '@hooks/store';
import userRoutes from '@routes/user';
import useRootPath from '@src/hooks/useRootPath';

export default function NotFound() {
    const [isLoading, setIsLoading] = useState(true);
    const rootPath = useRootPath();
    const location = useLocation();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fullUrl = `${location.pathname}${location.search}`;
        const isMatched = matchRoutes(userRoutes, location.pathname);
        if (isMatched) {
            dispatch(setDestination(fullUrl));
            navigate(`/login`);
        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, rootPath]);

    if (isLoading) return null;
    return (
        <div className="flex flex-col gap-8 h-screen justify-center items-center">
            <ReactSVG height={200} src={error404} width={393} />
            <p className="text-xl text-secondary font-bold">Page not found.</p>
            <Spacer y={4} />
            <Link to={rootPath}>
                <Button color="primary" size="lg">
                    Go to Dashboard
                </Button>
            </Link>
        </div>
    );
}
