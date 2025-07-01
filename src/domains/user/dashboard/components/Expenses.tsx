import { useCallback, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger, Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { endOfMonth, formatDate, startOfMonth } from 'date-fns';

import ArrowDown from '@assets/icons/arrow_down.svg?react';
import Info from '@assets/icons/info.svg?react';
import Button from '@components/atomic/Button';
import MonthPicker from '@components/atomic/MonthPicker';
import { getExpenseChart } from '@domains/user/expenses/api/expenseApi';
import { useAppSelector } from '@hooks/store';
import useFormatCurrency from '@hooks/useFormatCurrency';

import ExpenseGraph from './ExpenseGraph';

export default function Expenses() {
    const formatCurrency = useFormatCurrency();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dateString = formatDate(selectedDate, 'MMMM yyyy');
    const [isOpenMonthYearPicker, setIsOpenMonthYearPicker] = useState(false);
    const company = useAppSelector(state => state.company);

    const { data, isPending, isRefetching, isError, error } = useQuery({
        queryKey: ['expenseChart', selectedDate, company?._id],
        queryFn: () =>
            getExpenseChart({
                from: startOfMonth(selectedDate).toISOString(),
                to: endOfMonth(selectedDate).toISOString(),
                company: company?._id,
            }),
    });

    const Graph = useCallback(() => {
        if (isPending || isRefetching)
            return (
                <div className="h-[250px] flex justify-center items-center">
                    <Spinner color="default" size="sm" />
                </div>
            );

        if (isError)
            return (
                <div className="h-[250px] flex justify-center items-center">
                    <div className="bg-default-100 p-2 pe-4 rounded-full text-medium text-default-400 flex justify-center items-center gap-2">
                        <Info height={24} width={24} />
                        <p>{error?.message || 'Something went wrong, please try again later.'}</p>
                    </div>
                </div>
            );

        if (!data || data.expenses.length <= 0)
            return (
                <div className="h-[250px] flex justify-center items-center">
                    <div className="bg-default-100 p-2 pe-4 rounded-3xl text-medium text-default-400 flex justify-center items-center gap-2">
                        <Info height={24} width={24} />
                        <p>
                            {data.expenses.length <= 0
                                ? 'No expense in this month'
                                : 'Not enough data to display'}
                        </p>
                    </div>
                </div>
            );

        return (
            <div className="h-[250px]">
                <ExpenseGraph data={data?.expenses} />
            </div>
        );
    }, [isPending, isRefetching, isError, error, data]);

    return (
        <div className="w-full rounded-3xl border-[#E3E3E3] border-1">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <p className="font-semibold">Expenses</p>
                        <p className="font-semibold text-lg text-secondary">
                            {formatCurrency(data?.total)}
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <Popover
                            isOpen={isOpenMonthYearPicker}
                            placement="bottom"
                            showArrow={false}
                            onOpenChange={open => setIsOpenMonthYearPicker(open)}
                        >
                            <PopoverTrigger>
                                <Button
                                    color="transparent"
                                    endContent={
                                        <ArrowDown
                                            className={`transition-transform ml-1 ${isOpenMonthYearPicker ? 'rotate-180' : ''}`}
                                            height={12}
                                            width={12}
                                        />
                                    }
                                    size="md"
                                >
                                    {dateString}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                                <MonthPicker
                                    defValue={selectedDate}
                                    onChange={val => {
                                        setSelectedDate(val);
                                        // setIsOpenMonthYearPicker(false);
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>

            <div className="bg-light rounded-3xl">
                <Graph />
                {/* <div className="flex justify-between p-6 font-medium">
                    <span>{formatDate(selectedDate, 'MMMM')} Spending</span>
                    <span className="font-semibold">AED {data?.total || 0}</span>
                </div> */}
            </div>
        </div>
    );
}
