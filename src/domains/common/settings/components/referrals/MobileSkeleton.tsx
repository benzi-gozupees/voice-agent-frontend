import { Divider } from '@nextui-org/react';

import Skeleton from '@components/atomic/Skeleton';

export default function MobileSkeleton() {
    return (
        <div className="p-5 rounded-2xl border">
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <Skeleton className="size-10 rounded-full flex-shrink-0" />
                    <Skeleton>Paid fully</Skeleton>
                </div>
            </div>
            <Divider className="my-4 bg-default-100" />
            <div className="grid grid-cols-2 gap-1">
                <Skeleton className="text-default-500">Invoice Date</Skeleton>
                <Skeleton className="text-md text-default-500 text-end">invoice_date</Skeleton>
            </div>
        </div>
    );
}
