import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import Avatar from '@components/atomic/Avatar';
import Chip from '@components/atomic/Chip';
import Pagination from '@components/atomic/Pagination';
import Skeleton from '@components/atomic/Skeleton';
import Table, { ColumnProps } from '@components/atomic/Table';
import Empty from '@components/molecular/Empty';
import useGetTableData from '@domains/user/hooks/useGetTableData';
import { formatDate } from '@utils/formatDate';

import { getReferrals } from '../../api/referrals';

import MobileSkeleton from './MobileSkeleton';
import MobileView from './MobileView';

function ListReferrals() {
    const {
        page,
        setPage,
        limit,
        sort,
        setSort,
        setSearch,
        search,
        filters,
        onFilterChange,
        apiQuery,
    } = useGetTableData({
        defaultSort: {
            column: 'created_at',
            direction: 'descending',
        },
    });
    const { data, isLoading, error } = useQuery({
        queryKey: ['referrals', apiQuery],
        queryFn: () => getReferrals(apiQuery),
    });
    const columns: ColumnProps<any>[] = [
        {
            title: 'Referee',
            uid: 'referee',
            render: ({ cell }) => (
                <div className="flex items-center gap-2 break-all">
                    <Avatar className="size-8 flex-shrink-0" src={cell?.image} />
                    <div className="flex flex-col">
                        <span className="font-semibold line-clamp-1">{cell?.name}</span>
                        <span className="text-sm text-default-500 line-clamp-1">{cell?.email}</span>
                    </div>
                </div>
            ),
            skeleton: (
                <div className="flex items-center gap-2">
                    <Skeleton className="size-10 rounded-full flex-shrink-0" />
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 truncate">customer_name</Skeleton>
                        <Skeleton className="h-4 truncate">customer_email</Skeleton>
                    </div>
                </div>
            ),
            width: 250,
        },
        {
            title: 'Date',
            uid: 'created_at',
            key: 'created_at',
            render: ({ cell }) => formatDate(cell),
            skeleton: <Skeleton className="w-20">12345678</Skeleton>,
        },
        {
            title: 'Status',
            uid: 'status',
            key: 'status',
            render: ({ cell }) => <Chip status={cell} />,
            skeleton: <Skeleton className="w-20">12345678</Skeleton>,
        },
    ];
    const emptyContent = <Empty message="" title="No referrals found" />;
    const total = useMemo(() => Math.ceil((data?.total || 0) / limit), [data, limit]);
    const mobileRender = ({ row }: { row: any }) => <MobileView row={row} />;
    return (
        <div className="rounded-2xl md:border">
            <div className="sm:flex justify-between items-center gap-2 p-4">
                <span className="font-medium min-w-[100px]">Referrals</span>
            </div>
            <Table
                columns={columns}
                emptyContent={emptyContent}
                isLoading={isLoading}
                items={data?.referrals || []}
                mobileRender={mobileRender}
                mobileSkeleton={MobileSkeleton}
                sortDescriptor={sort}
                uid="_id"
                onSortChange={setSort}
            />
            <Pagination page={page} total={total} onChange={setPage} />
        </div>
    );
}

export default ListReferrals;
