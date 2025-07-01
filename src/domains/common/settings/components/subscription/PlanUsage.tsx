import Cross from '@assets/icons/crossRed.svg?react';
import Chip from '@components/atomic/Chip';
import Skeleton from '@components/atomic/Skeleton';
import Table, { ColumnProps } from '@components/atomic/Table';
import Empty from '@components/molecular/Empty';

type Limitation = {
    name: string;
    count: number;
    is_available: boolean;
};

type PlanLimitation = {
    name: string;
    count: number;
    is_unlimited: boolean;
    is_available: any;
};

type UserSubscription = {
    plan: {
        title: string;
        limitations: PlanLimitation[];
    };
    limitations: Limitation[];
};

type Data = {
    user_subscription: UserSubscription;
};

export default function PlanUsage({ data }: { data: Data }) {
    const columns: ColumnProps<any>[] = [
        {
            title: 'Features',
            uid: 'name',
            skeleton: <Skeleton className="w-24">12345678</Skeleton>,
            width: 150,
        },
        {
            title: 'Quantity',
            uid: 'total',
            skeleton: <Skeleton className="w-24">12345678</Skeleton>,
            width: 150,
            render: ({ row }) => {
                // Find the corresponding plan limit for this feature
                const planLimit = data?.user_subscription?.plan?.limitations?.find(
                    l => l.name === row.name
                );

                // Calculate the remaining count (if applicable)
                let remainingCount;
                if (planLimit?.is_unlimited) {
                    remainingCount = 'Unlimited';
                } else if (planLimit) {
                    remainingCount = (planLimit?.count || 0) - row.count;
                } else {
                    remainingCount = 0;
                }

                // Render the appropriate content
                if (planLimit?.is_unlimited) {
                    return <Chip status="unlimited" />;
                }

                if (planLimit?.is_available) {
                    return (
                        <span>
                            {remainingCount} used of {planLimit?.count}
                        </span>
                    );
                }

                return (
                    <div className="w-28 text-center flex justify-center">
                        <Cross />
                    </div>
                );
            },
        },
    ];

    const emptyContent = <Empty message="" title="No usage so far" />;

    return (
        <Table
            removeWrapper
            classNames={{
                th: 'first:rounded-tl-3xl last:rounded-tr-3xl',
                base: 'border rounded-3xl ',
            }}
            columns={columns}
            emptyContent={emptyContent}
            items={data?.user_subscription?.limitations}
            uid="_id"
        />
    );
}
