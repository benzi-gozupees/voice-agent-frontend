import { Link } from 'react-router-dom';
import Logo from '@assets/icons/gozupees-logo.png';
import { useAppSelector } from '@hooks/store';
import useBasePath from '@hooks/useBasePath';

export default function BrandLogo({ height, width }: { height?: number; width?: number }) {
    const basePath = useBasePath();
    const { user } = useAppSelector(state => state.auth);

    return (
        <Link
            className="flex flex-col justify-start items-center gap-1"
            to={`${basePath}/dashboard`}
        >
            <div
                className="bg-black rounded p-1"
                style={{
                    width: width ? `${width}px` : undefined,
                    height: height ? `${height}px` : undefined,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img src={Logo} height={height} width={width} alt="GoZupees Logo" />
            </div>
            {user?.role !== 'TENANT' && (
                <p className="self-end text-xs uppercase text-black">
                    {user?.role}
                </p>
            )}
        </Link>
    );
}
