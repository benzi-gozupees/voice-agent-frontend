import { useEffect, useState } from 'react';

import { Spacer } from '@nextui-org/react';

import Skeleton from '@components/atomic/Skeleton';
import { useAppSelector } from '@hooks/store';

import AddExpenseForm from '../components/AddExpenseForm';
import AllExpenses from '../components/AllExpenses';
import ExpenseUpload from '../components/ExpenseUpload';

export default function Expenses() {
    document.title = 'Expenses | GoZupees';
    const [selected, setSelected] = useState('0');
    const [highlighted, setHighlighted] = useState<string[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setHighlighted([]);
        }, 3000);
    }, [highlighted]);

    const onUploadSuccess = (id: string[]) => {
        setSelected('1');
        setHighlighted(id);
    };

    const { invoice_email } = useAppSelector(state => state.company);

    return (
        <>
            <Spacer y={4} />
            <div className="font-semibold text-xl">Expenses</div>
            <Spacer y={6} />
            <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] lg:grid-cols-[1.1fr_auto_1.1fr_auto_1fr] gap-4">
                <div className="border rounded-2xl p-4">
                    <AddExpenseForm />
                </div>

                <div className="flex items-center justify-center px-2">
                    <span className="text-sm font-medium text-default-500">or</span>
                </div>

                <div>
                    <ExpenseUpload onSuccess={onUploadSuccess} />
                </div>

                <div className="flex items-center justify-center px-2 md:col-span-3 xl:col-span-1">
                    <span className="text-sm font-medium text-default-500">or</span>
                </div>

                <div className="flex flex-col justify-center items-center gap-2 border rounded-2xl p-4 md:col-span-3 xl:col-span-1">
                    <Skeleton isLoaded={!!invoice_email}>
                        <span className="sm:text-sm text-xs font-medium break-all">
                            forward your expense to {'  '}
                            <a
                                className="text-xs sm:text-sm text-primary text-wrap"
                                href={`mailto:${invoice_email}`}
                            >
                                {invoice_email}
                            </a>
                        </span>
                    </Skeleton>
                </div>
            </div>
            <Spacer y={6} />
            <AllExpenses selected={selected} setSelected={setSelected} />
        </>
    );
}
