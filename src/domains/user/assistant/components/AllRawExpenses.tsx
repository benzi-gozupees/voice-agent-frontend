import { useMemo, useState } from 'react';

import { Spacer, useDisclosure } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import CalendarIcon from '@assets/icons/calendar.svg?react';
import ActionButton from '@components/atomic/ActionButton';
import Chip from '@components/atomic/Chip';
import Pagination from '@components/atomic/Pagination';
import SearchInput from '@components/atomic/SearchInput';
import Select, { SelectItem } from '@components/atomic/Select';
import Skeleton from '@components/atomic/Skeleton';
import Table, { ColumnProps } from '@components/atomic/Table';
import CustomTabs from '@components/atomic/Tabs';
import DeleteConfirmModal from '@components/modals/DeleteConfirmModal';
import Empty from '@components/molecular/Empty';
import useGetTableData from '@domains/user/hooks/useGetTableData';
import { formatDate } from '@utils/formatDate';

import { allRawExpenses, deleteRawExpense } from '../api';
import { RawExpense } from '../types';

import RawExpenseItem from './mobile/RawExpenseItem';
import SkeletonItem from './mobile/SkeletonItem';

type AllRawExpensesProps = {
    selected: string;
    setSelected: (s: string) => void;
    highlighted: string[];
};

function AllRawExpenses({ selected, setSelected, highlighted }: AllRawExpensesProps) {
    const [selectedData, setSelectedData] = useState<any>();
    const deleteDocumentModal = useDisclosure();
    const { page, setPage, limit, sort, setSort, setSearch, filters, onFilterChange, apiQuery } =
        useGetTableData({
            defaultFilters: { period: new Set(['all']) },
            defaultSort: {
                column: 'created_at',
                direction: 'descending',
            },
        });

    const periodOptions = [
        { key: 'all', value: 'all', label: 'All Times' },
        { key: 'this_week', value: 'this_week', label: 'This Week' },
        { key: 'this_month', value: 'this_month', label: 'This Month' },
        { key: 'last_month', value: 'last_month', label: 'Last Month' },
        { key: 'this_year', value: 'this_year', label: 'This Year' },
    ];

    const { data, isPending, isRefetching, isError } = useQuery({
        queryKey: ['allRawExpenses', apiQuery],
        queryFn: () => allRawExpenses(apiQuery),
    });

    const handleViewFile = (url: string) => {
        if (url) window.open(url, '_blank');
        else toast.error('File not available');
    };

    const Columns: ColumnProps<any>[] = [
        {
            title: 'Date Added',
            uid: 'created_at',
            sortable: true,
            render: ({ cell }) => (
                <div className="flex items-center gap-2">
                    <CalendarIcon height={16} width={16} />
                    <span>{formatDate(cell)}</span>
                </div>
            ),
            skeleton: <Skeleton className="w-40">date</Skeleton>,
            width: 200,
        },
        {
            title: 'Document Name',
            uid: 'files',
            render: ({ cell }) => (
                <div className="flex items-center gap-2">
                    <span>{cell?.[0]?.name}</span>
                </div>
            ),
            skeleton: <Skeleton className="w-24">12345678</Skeleton>,
            width: 200,
        },
        {
            title: 'Status',
            uid: 'status',
            render: ({ cell }) => <Chip status={cell} />,
            skeleton: <Skeleton>Payment status</Skeleton>,
            width: 150,
            align: 'center',
        },
        {
            title: 'Actions',
            uid: 'actions',
            render: ({ row }) => (
                <div className="flex justify-center gap-2 items-center">
                    <ActionButton
                        type="view"
                        onClick={() => handleViewFile(row?.files?.[0]?.url)}
                    />
                    {/* <ActionButton
                        type="edit"
                        onClick={() => {
                            setSelectedData(row);
                            onOpen();
                        }}
                    /> */}
                    <ActionButton
                        isDisabled={row?.status !== 'pending'}
                        type="delete"
                        onClick={() => {
                            setSelectedData(row);
                            deleteDocumentModal.onOpen();
                        }}
                    />
                </div>
            ),
            align: 'center',
            skeleton: <Skeleton className="w-8">date</Skeleton>,
            width: 150,
        },
    ];

    const total = useMemo(() => Math.ceil((data?.total || 1) / limit), [data, limit]);
    const emptyContent = <Empty message="" title="No expenses found" />;

    const mobileRender = ({ row }: { row: RawExpense }) => (
        <RawExpenseItem
            deleteModal={deleteDocumentModal}
            row={row}
            setSelectedItem={setSelectedData}
        />
    );

    return (
        <>
            <div id="all">
                <div className="md:border rounded-2xl">
                    <div className="flex justify-between items-center flex-wrap xl:flex-nowrap gap-4 pb-4 md:p-4">
                        <div className="flex gap-4 items-center flex-grow">
                            {/* <span className="font-medium min-w-[150px]">Recent Expenses</span> */}
                            <SearchInput
                                className="hidden sm:flex"
                                placeholder="Search for expenses"
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex sm:flex-row justify-end flex-col sm:items-center items-end w-full xl:w-auto">
                            <div className="w-full">
                                <SearchInput
                                    className=" w-full sm:hidden flex mb-3"
                                    placeholder="Search for expenses"
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center  gap-2">
                                <Select
                                    disallowEmptySelection
                                    color="transparent"
                                    defaultSelectedKeys={filters.period}
                                    multiple={false}
                                    title="Period"
                                    onSelectionChange={keys => onFilterChange('period', keys)}
                                >
                                    {periodOptions.map(option => (
                                        <SelectItem key={option.key} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <CustomTabs
                                    selected={selected}
                                    tabs={[
                                        { title: 'Expenses', key: '0' },
                                        { title: 'Raw Expenses', key: '1' },
                                    ]}
                                    onTabChange={setSelected}
                                />
                            </div>
                        </div>
                    </div>
                    <Table
                        className="border md:border-0 rounded-2xl"
                        columns={Columns}
                        emptyContent={emptyContent}
                        highlightedRows={highlighted}
                        isError={isError}
                        isLoading={isPending}
                        items={data?.expenses}
                        mobileRender={mobileRender}
                        mobileSkeleton={SkeletonItem}
                        sortDescriptor={sort}
                        uid="_id"
                        onSortChange={setSort}
                    />
                </div>
            </div>
            <Spacer y={6} />
            <Pagination page={page} total={total} onChange={setPage} />
            <Spacer y={6} />

            {deleteDocumentModal.isOpen ? (
                <DeleteConfirmModal
                    _id={selectedData?._id || ''}
                    invalidationKey="allRawExpenses"
                    isOpen={deleteDocumentModal.isOpen}
                    mutationFn={deleteRawExpense}
                    onClose={deleteDocumentModal.onClose}
                />
            ) : null}
        </>
    );
}

export default AllRawExpenses;
