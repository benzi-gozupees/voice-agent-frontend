import { useEffect, useMemo, useState } from 'react';

import { Spacer, useDisclosure } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import CalendarIcon from '@assets/icons/calendar.svg?react';
import Cross from '@assets/icons/cross.svg?react';
import Tick from '@assets/icons/tick-circle.svg?react';
import ActionButton from '@components/atomic/ActionButton';
import Pagination from '@components/atomic/Pagination';
import { ScrollArea } from '@components/atomic/ScrollArea';
import SearchInput from '@components/atomic/SearchInput';
import Select, { SelectItem } from '@components/atomic/Select';
import Skeleton from '@components/atomic/Skeleton';
import Table, { ColumnProps } from '@components/atomic/Table';
import CustomTabs from '@components/atomic/Tabs';
import DeleteConfirmModal from '@components/modals/DeleteConfirmModal';
import Empty from '@components/molecular/Empty';
import { getProfile } from '@domains/common/settings/api/profile';
import useGetTableData from '@domains/user/hooks/useGetTableData';
import useFormatCurrency from '@hooks/useFormatCurrency';
import { formatDate } from '@utils/formatDate';

import { allExpenses, deleteExpense, expenseCategory } from '../api';
import { Expense } from '../types';

import EditExpenseModal from './EditExpenseModal';
import ExpenseItem from './mobile/ExpenseItem';
import SkeletonItem from './mobile/SkeletonItem';
import ViewExpenseModal from './ViewExpenseModal';

type AllExpensesProps = {
    selected: string;
    setSelected: (s: string) => void;
};
function AllExpenses({ selected, setSelected }: AllExpensesProps) {
    const [selectedExpense, setSelectedExpense] = useState<string>();
    const formatCurrency = useFormatCurrency();
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
        defaultFilters: { period: new Set(['all']), category: new Set(['all']) },
        defaultSort: {
            column: 'created_at',
            direction: 'descending',
        },
    });

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const {
        isOpen: deleteIsOpen,
        onOpen: deleteOnOpen,
        onOpenChange: deleteOnOpenChange,
        onClose: deleteOnClose,
    } = useDisclosure();

    const { data, isPending, isRefetching, isError } = useQuery({
        queryKey: ['allExpenses', apiQuery],
        queryFn: () => allExpenses(apiQuery),
    });
    const { data: expenseCategoryData } = useQuery({
        queryKey: ['getCategory'],
        queryFn: expenseCategory,
    });

    const { data: softwares, isLoading } = useQuery({
        queryKey: ['softwares'],
        queryFn: () => getProfile('customer'),
    });

    const total = useMemo(() => Math.ceil((data?.total || 0) / limit), [data, limit]);

    const periodOptions = [
        { key: 'all', value: 'all', label: 'All Times' },
        { key: 'this_week', value: 'this_week', label: 'This Week' },
        { key: 'this_month', value: 'this_month', label: 'This Month' },
        { key: 'last_month', value: 'last_month', label: 'Last Month' },
        { key: 'this_year', value: 'this_year', label: 'This Year' },
    ];

    const categoryOptions = [
        {
            key: 'all',
            label: 'All',
            value: 'all',
        },
        ...(expenseCategoryData?.expense_categories?.map((item: any) => ({
            key: item?.category?.label,
            label: item?.category?.label,
            value: item?.category?.value,
        })) || []),
    ];

    const [searchParams, setSearchParams] = useSearchParams();
    const viewExpenseModal = useDisclosure({
        onClose: () => {
            setSearchParams({ delete: 'details' });
        },
    });
    const showDetails = searchParams.get('details') === 'true';
    useEffect(() => {
        if (showDetails) {
            const id = searchParams.get('id');
            if (id) {
                setSelectedExpense(id);
                viewExpenseModal.onOpen();
            }
        }
    }, [searchParams, showDetails]);

    const columns: ColumnProps<Expense>[] = [
        {
            title: 'Expense Date',
            uid: 'created_at',
            sortable: true,
            render: ({ row }) => (
                <div className="flex items-center gap-2">
                    <CalendarIcon height={16} width={16} />
                    <span>{formatDate(row.date)}</span>
                </div>
            ),
            skeleton: <Skeleton className="w-20">12345678</Skeleton>,
            width: 200,
        },
        { title: 'Type', uid: 'type', skeleton: <Skeleton className="w-20">12345678</Skeleton> },
        {
            title: 'Category',
            uid: 'category',
            skeleton: <Skeleton className="w-20">12345678</Skeleton>,
        },
        {
            title: 'Merchant',
            uid: 'merchant',
            skeleton: <Skeleton className="w-20">12345678</Skeleton>,
        },
        {
            title: 'Payment Method',
            uid: 'payment_method',
            render: ({ cell }) => <span className="capitalize">{cell?.replace('_', ' ')}</span>,
            skeleton: <Skeleton>Bank Transfer</Skeleton>,
            width: 120,
            align: 'center',
        },
        {
            title: 'Amount',
            uid: 'amount',
            sortable: true,
            align: 'end',
            render: values => (
                <span className="flex items-end justify-end text-default-500">
                    {/* {values?.row?.currency || 'AED'} */}
                    <p className="text-default-900 ml-0.5">{formatCurrency(values?.row?.amount)}</p>
                </span>
            ),
            skeleton: <Skeleton className="w-20">AED12345678</Skeleton>,
        },
        {
            title: 'Status',
            uid: 'extra',
            render: ({ row }) => (
                <div className="flex justify-center">
                    <div
                        className={
                            !softwares?.user?.wafeq_key && !softwares?.user?.zoho_org_id
                                ? 'hidden'
                                : 'space-y-1'
                        }
                    >
                        <h1
                            className={`${!softwares?.user?.wafeq_key ? 'hidden' : ''} flex items-center gap-1`}
                        >
                            {row?.wafeq_expense_id ? <Tick /> : <Cross fill="red" width={16} />}
                            Wafeq
                        </h1>
                        <h1
                            className={`${!softwares?.user?.zoho_org_id ? 'hidden' : ''} flex items-center gap-1`}
                        >
                            {row?.zoho_expense_id ? <Tick /> : <Cross fill="red" width={16} />}
                            Zoho Books
                        </h1>
                    </div>
                </div>
            ),
            skeleton: <Skeleton className="w-28 h-6">date</Skeleton>,
            width: 150,
            align: 'center',
        },
        {
            title: 'Actions',
            uid: 'actions',
            align: 'center',
            render: ({ row }) => (
                <div className="flex justify-center">
                    <ActionButton
                        href={`/chat?c_id=${row.company._id}&c=${row.company.name}&id=${row._id}&type=expense&name=${row.type}`}
                        type="chat"
                    />
                    <ActionButton
                        type="view"
                        onClick={() => {
                            setSelectedExpense(row._id);
                            viewExpenseModal.onOpen();
                        }}
                    />
                    <ActionButton
                        isDisabled={Boolean(row?.wafeq_expense_id) || Boolean(row?.zoho_expense_id)}
                        type="edit"
                        onClick={() => {
                            setSelectedExpense(row._id);
                            onOpen();
                        }}
                    />
                    <ActionButton
                        isDisabled={Boolean(row?.wafeq_expense_id) || Boolean(row?.zoho_expense_id)}
                        type="delete"
                        onClick={() => {
                            setSelectedExpense(row._id);
                            deleteOnOpen();
                        }}
                    />
                </div>
            ),
            skeleton: <Skeleton className="w-20">12345678</Skeleton>,
            width: 150,
        },
    ];

    const mobileRender = ({ row }: { row: Expense }) => (
        <ExpenseItem
            deleteModal={deleteOnOpen}
            editModalOnOpen={onOpen}
            row={row}
            setSelectedItem={setSelectedExpense}
        />
    );

    const emptyContent = <Empty message="" title="No expenses found" />;
    const filteredColumns =
        !softwares?.user?.wafeq_key && !softwares?.user?.zoho_org_id
            ? columns.filter(column => column.title !== 'Status')
            : columns;
    return (
        <>
            <section className="scroll-mt-24" id="all">
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
                            <div className="flex justify-end items-center w-full xl:w-auto">
                                <ScrollArea orientation="horizontal">
                                    <div className="flex items-center gap-2 pb-3 sm:pb-0">
                                        <Select
                                            disallowEmptySelection
                                            color="transparent"
                                            defaultSelectedKeys={filters.period}
                                            multiple={false}
                                            title="Period"
                                            onSelectionChange={keys =>
                                                onFilterChange('period', keys)
                                            }
                                        >
                                            {periodOptions.map(option => (
                                                <SelectItem key={option.key} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <Select
                                            disallowEmptySelection
                                            color="transparent"
                                            defaultSelectedKeys={filters.category}
                                            multiple={false}
                                            title="Category"
                                            onSelectionChange={keys =>
                                                onFilterChange('category', keys as any)
                                            }
                                        >
                                            {categoryOptions.map(
                                                (option: {
                                                    key: string;
                                                    value: string;
                                                    label: string;
                                                }) => (
                                                    <SelectItem
                                                        key={option.key}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                )
                                            )}
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
                                </ScrollArea>
                            </div>
                        </div>
                    </div>
                    <Table
                        className="border md:border-0 rounded-2xl"
                        columns={filteredColumns}
                        emptyContent={emptyContent}
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
            </section>
            <Spacer y={6} />
            <Pagination page={page} total={total} onChange={setPage} />
            <Spacer y={6} />

            {isOpen ? (
                <EditExpenseModal
                    isOpen={isOpen}
                    selectedExpense={data?.expenses.find(item => item._id === selectedExpense)}
                    onOpenChange={onOpenChange}
                />
            ) : null}

            {viewExpenseModal.isOpen ? (
                <ViewExpenseModal
                    id={selectedExpense || ''}
                    isOpen={viewExpenseModal.isOpen}
                    onClose={viewExpenseModal.onClose}
                />
            ) : null}

            {deleteIsOpen ? (
                <DeleteConfirmModal
                    _id={selectedExpense || ''}
                    invalidationKey="allExpenses"
                    isOpen={deleteIsOpen}
                    mutationFn={deleteExpense}
                    onClose={deleteOnClose}
                />
            ) : null}
        </>
    );
}

export default AllExpenses;
