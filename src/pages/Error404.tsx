import { Spacer } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import error404 from '@assets/images/error-404.svg';
import Button from '@components/atomic/Button';
import useRootPath from '@src/hooks/useRootPath';

export default function Error404() {
    const rootPath = useRootPath();
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
