import { useCallback, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger, Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { endOfMonth, format, formatDate, startOfMonth } from 'date-fns';

import ArrowDown from '@assets/icons/arrow_down.svg?react';
import Info from '@assets/icons/info.svg?react';
import Button from '@components/atomic/Button';
import MonthPicker from '@components/atomic/MonthPicker';
import { useAppSelector } from '@hooks/store';
import useFormatCurrency from '@hooks/useFormatCurrency';

import { getGraphData } from '../api/company';

import RevenueGraph from './RevenueGraph';

export default function Revenue() {
    const formatCurrency = useFormatCurrency();
    const { _id } = useAppSelector(state => state.company);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const dateString = formatDate(selectedDate, 'MMMM yyyy');
    const [isOpenMonthYearPicker, setIsOpenMonthYearPicker] = useState(false);
    const { data, isPending, isRefetching, isError, error } = useQuery({
        queryKey: ['revenueGraph', selectedDate, _id],
        queryFn: () =>
            getGraphData({
                from: startOfMonth(selectedDate).toISOString(),
                to: endOfMonth(selectedDate).toISOString(),
                company: _id,
            }),
    });

    const chartData = data?.invoices?.map(
        (item: { total: string; date: string }, index: number) => ({
            name: format(item.date, 'd'),
            pv: item.total,
            date: item.date,
        })
    );
    const Graph = useCallback(() => {
        if (isPending || isRefetching)
            return (
                <div className="h-[300px] flex justify-center items-center">
                    <Spinner color="default" size="sm" />
                </div>
            );

        if (isError)
            return (
                <div className="h-[300px] flex justify-center items-center">
                    <div className="bg-default-100 p-2 pe-4 rounded-full text-medium text-default-400 flex justify-center items-center gap-2">
                        <Info height={24} width={24} />
                        <p>{error?.message || 'Something went wrong, please try again later.'}</p>
                    </div>
                </div>
            );
        if (!data || data?.invoices?.length <= 0)
            return (
                <div className="h-[250px] flex justify-center items-center">
                    <div className="bg-default-100 p-2 pe-4 rounded-3xl text-medium text-default-400 flex justify-center items-center gap-2">
                        <Info height={24} width={24} />
                        <p>
                            {data?.invoices?.length <= 0
                                ? 'No revenue in this month'
                                : 'Not enough data to display'}
                        </p>
                    </div>
                </div>
            );
        return (
            <div className="h-[250px]">
                <RevenueGraph chartData={chartData} />
            </div>
        );
    }, [isPending, isRefetching, isError, error, data, chartData]);

    return (
        <div className="w-full rounded-3xl border-[#E3E3E3] border-1">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between ">
                    <div className="space-y-2">
                        <p className="font-semibold">Revenue</p>
                        <p className="text-lg font-semibold text-secondary">
                            {formatCurrency(data?.total)}
                        </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center justify-between gap-2">
                            <Popover
                                isOpen={isOpenMonthYearPicker}
                                placement="bottom"
                                showArrow={false}
                                onOpenChange={open => setIsOpenMonthYearPicker(open)}
                            >
                                <PopoverTrigger>
                                    <Button
                                        className="border-2"
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
            </div>
            <div className="rounded-3xl bg-light">
                <Graph />
            </div>
        </div>
    );
}
