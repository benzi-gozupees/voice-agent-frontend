import { getLocalTimeZone, today } from '@internationalized/date';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { toast } from 'sonner';

import Button from '@components/atomic/Button';
import DatePicker from '@components/atomic/DatePicker';
import Input from '@components/atomic/Input';
import SelectInputWithSearch from '@components/atomic/SelectInputWithSearch';
import { useAppSelector } from '@hooks/store';

import { addExpense, expenseCategory } from '../api';
import { expenseSchema } from '../schema';

interface AddExpenseFormProps {
    onClose?: () => void;
}

export default function AddExpenseForm({ onClose }: AddExpenseFormProps) {
    const queryClient = useQueryClient();
    const paidViaOptions = [
        { label: 'Bank', value: 'bank' },
        { label: 'Cheque', value: 'cheque' },
        { label: 'Net Banking', value: 'net_banking' },
        { label: 'Cash', value: 'cash' },
        { label: 'Other', value: 'other' },
    ];

    const { mutate, isPending } = useMutation({
        mutationFn: addExpense,
        onSuccess: data => {
            if (data.expense) queryClient.invalidateQueries({ queryKey: ['allExpenses'] });
            queryClient.invalidateQueries({ queryKey: ['serviceLimitations'] });
            queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
            queryClient.invalidateQueries({ queryKey: ['expenseHealthCheckStats'] });
            toast.success('Expense added successfully');
            if (onClose) onClose();
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Something went wrong';
            toast.error(message);
        },
    });

    const { currency } = useAppSelector(state => state.company);

    const { data: expenseCategoryData } = useQuery({
        queryKey: ['getCategory'],
        queryFn: expenseCategory,
    });

    const categoryOptions =
        expenseCategoryData?.expense_categories?.map((item: any) => ({
            label: item?.category?.label,
            value: item?.category?.value,
        })) || [];

    const { _id } = useAppSelector(state => state.company);

    return (
        <Formik
            enableReinitialize
            initialValues={{
                company: _id,
                type: '',
                payment_method: '',
                amount: '',
                category: '',
                merchant: '',
                date: today(getLocalTimeZone()),
                file: [],
                currency,
            }}
            validationSchema={expenseSchema}
            onSubmit={(values, { resetForm }) => {
                const payload = {
                    ...values,
                    date: values.date.toString(),
                };
                mutate(payload, {
                    onSuccess: async () => {
                        resetForm();
                    },
                });
            }}
        >
            {({ values }) => (
                <Form>
                    <div className="space-y-3">
                        <Input
                            isRequired
                            errorMessage=""
                            label=""
                            name="type"
                            placeholder="Enter expense type"
                        />
                        <Input
                            isRequired
                            errorMessage=""
                            label=""
                            name="merchant"
                            placeholder="Enter the merchant"
                        />
                        <SelectInputWithSearch
                            errorMessage=""
                            label=""
                            name="category"
                            options={categoryOptions}
                            placeholder="Select a category"
                            selectedKey={values?.category}
                        />
                        <SelectInputWithSearch
                            isRequired
                            errorMessage=""
                            label=""
                            name="payment_method"
                            options={paidViaOptions}
                            placeholder="Select payment method"
                            selectedKey={values?.payment_method}
                        />
                        <Input
                            isRequired
                            endContent={
                                <span className="text-xs text-default-500">{currency}</span>
                            }
                            errorMessage=""
                            label=""
                            name="amount"
                            placeholder="Enter the price"
                            type="number"
                        />
                        <DatePicker
                            disableFutureDates
                            isRequired
                            errorMessage=""
                            label=""
                            name="date"
                        />
                        <Button fullWidth color="primary" isLoading={isPending} type="submit">
                            Add Expense
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
