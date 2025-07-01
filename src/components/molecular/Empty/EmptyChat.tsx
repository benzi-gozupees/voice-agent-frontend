import { Spacer } from '@nextui-org/react';

import ChatEmpty from '@assets/images/chat-empty.svg?react';

type EmptyChatProps = {
    title: string;
    message?: string;
    topContent?: React.ReactNode;
};

export default function Empty({
    title = 'No data found',
    message = '',
    topContent,
}: EmptyChatProps) {
    return (
        <div className="flex flex-col justify-center items-center gap-2 h-full py-10">
            <div className="text-center w-96">
                <p className="text-3xl font-semibold">{title}</p>
                <p className="font-medium text-default-500">{message}</p>
                <Spacer y={2} />
                {topContent}
            </div>
            <div className="flex items-center justify-center">
                <ChatEmpty height={300} width={300} />
            </div>
        </div>
    );
}
