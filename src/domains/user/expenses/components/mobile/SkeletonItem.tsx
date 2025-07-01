import { Divider, Spacer } from '@nextui-org/react';

import Skeleton from '@components/atomic/Skeleton';

export default function SkeletonItem() {
    return (
        <div className="p-5 rounded-2xl border">
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <Skeleton>Paid fully</Skeleton>
                    <Skeleton>Paid fully</Skeleton>
                </div>
            </div>
            <Spacer y={2} />
            <div className="flex items-center gap-2">
                <Skeleton className="font-medium line-clamp-1">customer name</Skeleton>
                <Skeleton className="text-sm text-default-500 line-clamp-1">
                    customer email
                </Skeleton>
            </div>
            <Spacer y={1} />
            <div className="flex items-center gap-2">
                <Skeleton className="font-medium text-default-500">Invoice Number:</Skeleton>
                <Skeleton className="font-medium text-default-800 line-clamp-1">
                    invoice_number
                </Skeleton>
            </div>
            <Divider className="my-4 bg-default-100" />
            <div className="grid grid-cols-2 gap-1">
                <Skeleton className="text-default-500">Invoice Date</Skeleton>
                <Skeleton className="text-md text-default-500 text-end">invoice_date</Skeleton>
                <Skeleton className="text-default-500">Due Date</Skeleton>
                <Skeleton className="text-md text-default-500 text-end">due_date</Skeleton>
                <Skeleton className="text-default-500">Due Amount</Skeleton>
                <Skeleton className="text-md text-default-500 text-end">amount_due</Skeleton>
                <Skeleton className="text-default-500">Due Amount</Skeleton>
                <Skeleton className="text-md text-default-500 text-end">amount_due</Skeleton>
                <Skeleton className="text-default-500">Payment Method</Skeleton>
                <Skeleton className="text-md text-default-500 text-end capitalize">
                    payment_method
                </Skeleton>
            </div>
        </div>
    );
}
