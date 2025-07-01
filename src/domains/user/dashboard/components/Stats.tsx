import { useQuery } from '@tanstack/react-query';

import BankIcon from '@assets/icons/bank.svg?react';
import ExpenseIcon from '@assets/icons/expense.svg?react';
import WalletIcon from '@assets/icons/wallet-check.svg?react';
import { ScrollArea } from '@components/atomic/ScrollArea';
import { useAppSelector } from '@hooks/store';
import useFormatCurrency from '@hooks/useFormatCurrency';

import { getStatsData } from '../api/company';

export default function Stats() {
    const formatCurrency = useFormatCurrency();
    const company = useAppSelector(state => state.company);

    const { data } = useQuery({
        queryKey: ['dashboardStats', company?._id],
        queryFn: () => getStatsData({ company: company?._id }),
        staleTime: Infinity,
    });

    return (
        <div className="rounded-3xl relative">
            <div className="absolute inset-0">
                <ScrollArea className="px-4" orientation="horizontal">
                    <div className="flex gap-4 *:flex-shrink-0 rounded-3xl pb-3">
                        <div className="flex-1 min-w-[250px] flex flex-col justify-center p-6 rounded-3xl bg-[#F0EAFF] h-40">
                            <div className="bg-white rounded-full p-2 self-start">
                                <WalletIcon fill="black" height={24} width={24} />
                            </div>
                            <span className="text-sm mt-2">Revenue</span>
                            <div className="flex justify-between">
                                <p className="text-xl font-semibold mt-2">
                                    {formatCurrency(data?.totalInvoiceAmount, false)}
                                </p>
                                <span className="hidden bg-success-100 text-success p-1 mt-2 rounded-md text-tiny self-center">
                                    +3.5%
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 min-w-[250px] flex flex-col justify-center p-6 rounded-3xl bg-[#FAEBFF] h-40">
                            <div className="bg-white rounded-full p-2 self-start">
                                <ExpenseIcon height={24} width={24} />
                            </div>
                            <span className="text-sm mt-2">Expense</span>
                            <div className="flex justify-between">
                                <p className="text-xl font-semibold mt-2">
                                    {formatCurrency(data?.totalExpenseAmount, false)}
                                </p>
                                <span className="hidden bg-success-100 text-success p-1 mt-2 rounded-md text-tiny self-center">
                                    +1.45%
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 min-w-[250px] flex flex-col justify-center p-6 rounded-3xl bg-[#F3EAFF] h-40">
                            <div className="bg-white rounded-full p-2 self-start">
                                <BankIcon fill="black" height={24} width={24} />
                            </div>
                            <span className="text-sm mt-2">Cash in Bank</span>
                            <div className="flex justify-between">
                                <p className="text-xl font-semibold mt-2">{formatCurrency(0)}</p>
                                <span className="hidden bg-success-100 text-success p-1 mt-2 rounded-md text-tiny self-center">
                                    +0%
                                </span>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
