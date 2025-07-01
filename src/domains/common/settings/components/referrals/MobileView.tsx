import { Divider, Spacer } from '@nextui-org/react';

import Avatar from '@components/atomic/Avatar';
import Chip from '@components/atomic/Chip';
import { formatDate } from '@utils/formatDate';

function MobileView({ row }: any) {
    return (
        <div className="p-5 rounded-2xl border">
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <Avatar className="size-8 flex-shrink-0" src="" />
                    <div>
                        <p>{row?.referee?.name}</p>
                        <p className="text-sm text-default-500">{row?.referee?.email}</p>
                    </div>
                    <Chip className="self-start" status={row?.status as any} />
                </div>
            </div>
            <Spacer y={1} />
            <Divider className="my-4" />
            <div className="grid grid-cols-2 gap-1">
                <span className="text-default-500">Date</span>
                <span className="text-md text-default-500 text-end">
                    {formatDate(row?.created_at)}
                </span>
            </div>
        </div>
    );
}

export default MobileView;
