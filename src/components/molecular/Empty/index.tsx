import { Spacer } from '@nextui-org/react';

import ErrorEmpty from '@assets/images/no_data_yet.svg?react';

type EmptyProps = {
    title: string;
    message: string;
    bottomContent?: React.ReactNode;
    width?: number;
};

export default function Empty({
    title = 'No data found',
    message = '',
    bottomContent,
    width = 235,
}: EmptyProps) {
    return (
        <div className="flex flex-col jutify-center items-center gap-2 h-full py-8 px-1">
            <ErrorEmpty width={width} />
            <p className="text-2xl font-semibold text-default-500">{title}</p>
            <p className="font-normal text-default-500">{message}</p>
            <Spacer y={2} />
            {bottomContent}
        </div>
    );
}
