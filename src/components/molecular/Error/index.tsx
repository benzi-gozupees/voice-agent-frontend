import { Spacer } from '@nextui-org/react';

import Error404 from '@assets/images/error-404.svg?react';

type ErrorProps = {
    width?: number;
};

export default function Error({ width = 393 }: ErrorProps) {
    return (
        <div className="flex flex-col jutify-center items-center gap-2 py-16 px-1">
            <Error404 width={width} />
            <Spacer y={2} />
            <p className="text-3xl font-semibold text-center">
                Sorry, This page is under maintenance .
            </p>
        </div>
    );
}
