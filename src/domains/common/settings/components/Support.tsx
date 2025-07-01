import { useMemo, useState } from 'react';

import { Divider, Spacer, useDisclosure } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import CalendarIcon from '@assets/icons/calendar.svg?react';
import Button from '@components/atomic/Button';
import Chip from '@components/atomic/Chip';
import Pagination from '@components/atomic/Pagination';
import SearchInput from '@components/atomic/SearchInput';
import Skeleton from '@components/atomic/Skeleton';
import Table, { ColumnProps } from '@components/atomic/Table';
import Empty from '@components/molecular/Empty';
import useGetTableData from '@domains/user/hooks/useGetTableData';
import { formatDate } from '@utils/formatDate';

import { previousTickets } from '../api/support';
import { Support } from '../types/support';

import SkeletonItem from './mobile/SkeletonItem';
import SupportItem from './mobile/SupportItem';
import RaiseTicket from './support/RaiseTicket';
import SupportHeader from './support/SupportHeader';

function Supports() {
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
    const [selectedData, setSelectedData] = useState();
    const { data, isLoading } = useQuery({
        queryKey: ['support', apiQuery],
        queryFn: () => previousTickets(apiQuery),
    });
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const columns: ColumnProps<Support>[] = [
        {
            title: 'Date Added',
            uid: 'created_at',
            sortable: true,
            render: ({ cell }: any) => (
                <div className="flex items-center gap-2">
                    <CalendarIcon height={16} width={16} />
                    <span>{formatDate(cell)}</span>
                </div>
            ),
            skeleton: <Skeleton className="w-20">12345678</Skeleton>,
        },
        {
            title: 'Title',
            uid: 'title',
            render: ({ row }: any) => (
                <div className="flex items-center gap-2">
                    {/* <img alt="logo" className="w-6 object-cover" src={row.service_type.logo} /> */}
                    <span>{row.title}</span>
                </div>
            ),
            skeleton: (
                <div className="flex gap-1">
                    <Skeleton className="w-40">123456780000</Skeleton>
                </div>
            ),
        },
        {
            title: 'Description',
            uid: 'description',
            skeleton: <Skeleton className="w-20">1234567800000</Skeleton>,
        },
        {
            title: 'Status',
            uid: 'status',
            render: ({ cell }: any) => <Chip status={cell} />,
            skeleton: <Skeleton className="w-20">1234567800000</Skeleton>,
        },
        {
            title: 'Remarks',
            uid: 'remarks',
            render: ({ row }: any) => (
                <div className="flex items-center gap-2">
                    {/* <img alt="logo" className="w-6 object-cover" src={row.service_type.logo} /> */}
                    <span>{row.remarks || '-'}</span>
                </div>
            ),
            skeleton: <Skeleton className="w-20">1234567800000</Skeleton>,
        },
    ];

    const mobileRender = ({ row }: { row: any }) => <SupportItem row={row} />;

    const emptyContent = <Empty message="" title="No tickets raised so far" />;
    const total = useMemo(() => Math.ceil((data?.total || 0) / limit), [data, limit]);

    return (
        <div>
            <SupportHeader />
            <div className="rounded-2xl md:border">
                <div className="sm:flex justify-between items-center gap-2 p-4">
                    <span className="font-medium min-w-[100px]">Support</span>
                    <div className="flex gap-2 mt-3 sm:mt-0">
                        <SearchInput
                            className="w-56"
                            placeholder="Search for tickets"
                            onChange={e => setSearch(e.target.value)}
                        />
                        <div className="py-1">
                            <Divider orientation="vertical" />
                        </div>
                        <div>
                            <Button
                                className="border border-default"
                                color="white"
                                size="md"
                                onClick={onOpen}
                            >
                                Raise ticket
                            </Button>
                        </div>
                    </div>
                </div>
                <Table
                    columns={columns}
                    emptyContent={emptyContent}
                    isLoading={isLoading}
                    items={data?.complaints}
                    mobileRender={mobileRender}
                    mobileSkeleton={SkeletonItem}
                    sortDescriptor={sort}
                    uid="_id"
                    onSortChange={setSort}
                />
                <Spacer y={3} />
                <Pagination page={page} total={total} onChange={setPage} />
                <Spacer y={3} />
                {isOpen ? (
                    <RaiseTicket
                        isOpen={isOpen}
                        selectedData={selectedData}
                        onOpenChange={onOpenChange}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default Supports;
