import { useEffect, useState } from 'react';

import { parseDate } from '@internationalized/date';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import { toast } from 'sonner';

import Button from '@components/atomic/Button';
import CurrencyInput from '@components/atomic/CurrencyInput';
import DatePicker from '@components/atomic/DatePicker';
import Input from '@components/atomic/Input';
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@components/atomic/Modal';
import SelectInputWithSearch from '@components/atomic/SelectInputWithSearch';
import { useAppSelector } from '@hooks/store';
import { currencyOptions } from '@src/constants/currency';

import { convertFile, editExpense, expenseCategory } from '../api/expenseApi';
import { expenseSchema } from '../schema';

export default function EditExpenseModal({
    selectedExpense,
    isOpen,
    onOpenChange,
}: {
    selectedExpense: any;
    isOpen: boolean;
    onOpenChange: () => void;
}) {
    const queryClient = useQueryClient();
    const [category, setCategory] = useState(selectedExpense?.category);

    const paidViaOptions = [
        { label: 'Bank', value: 'bank' },
        { label: 'Cheque', value: 'cheque' },
        { label: 'Net Banking', value: 'net_banking' },
        { label: 'Cash', value: 'cash' },
        { label: 'Other', value: 'other' },
    ];

    const { mutate, isPending } = useMutation({
        mutationFn: editExpense,

        onSuccess: data => {
            if (data.expense) queryClient.invalidateQueries({ queryKey: ['allExpenses'] });
            queryClient.invalidateQueries({ queryKey: ['serviceLimitations'] });
            queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
            toast.success('Expense updated successfully');
            onOpenChange();
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Something went wrong';
            toast.error(message);
        },
    });

    const company = useAppSelector(state => state.company);

    const { data: expenseCategoryData } = useQuery({
        queryKey: ['getCategory'],
        queryFn: expenseCategory,
    });

    const { data: fileData, isLoading } = useQuery({
        queryKey: ['getfile', selectedExpense?.file],
        queryFn: () => convertFile(selectedExpense?.file),
        enabled: !!selectedExpense?.file,
    });

    const categoryOptions =
        expenseCategoryData?.expense_categories?.map((item: any) => ({
            label: item?.category?.label,
            value: item?.category?.value,
        })) || [];

    const file = fileData?.file
        ? new File(
              [
                  new Blob([new Uint8Array(fileData.file.buffer.data)], {
                      type: fileData.file.mimetype,
                  }),
              ],
              fileData.file.originalname,
              { type: fileData.file.mimetype }
          )
        : null;
    useEffect(() => {
        setCategory(selectedExpense?.category);
        return () => setCategory('');
    }, [selectedExpense?.category]);

    return (
        <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange}>
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit Expense</ModalHeader>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                id: selectedExpense?._id || '',
                                company: selectedExpense?.company?._id || '',
                                type: selectedExpense?.type || '',
                                merchant: selectedExpense?.merchant || '',
                                payment_method: selectedExpense?.payment_method || '',
                                amount: selectedExpense?.amount || '',
                                category: selectedExpense?.category || '',
                                date: parseDate(
                                    format(new Date(selectedExpense?.date), 'yyyy-MM-dd')
                                ),
                                file: file ? [file] : [],
                                currency: company?.currency || '',
                            }}
                            validationSchema={expenseSchema}
                            onSubmit={values => {
                                const payload = {
                                    ...values,
                                    date: values.date,
                                };
                                mutate(payload);
                            }}
                        >
                            <Form>
                                <ModalBody>
                                    <div className="flex justify-between gap-6">
                                        <div className="w-full">
                                            <div className="flex flex-col gap-4">
                                                <Input
                                                    isRequired
                                                    label="Type"
                                                    name="type"
                                                    placeholder="Enter expense type"
                                                />
                                                <Input
                                                    isRequired
                                                    label="Merchant"
                                                    name="merchant"
                                                    placeholder="Enter the merchant"
                                                />
                                                <div className="flex gap-2">
                                                    <SelectInputWithSearch
                                                        defaultSelectedKey={
                                                            selectedExpense?.category
                                                        }
                                                        label="Category"
                                                        name="category"
                                                        options={categoryOptions}
                                                        placeholder="Select a category"
                                                        onInputChange={setCategory}
                                                    />
                                                </div>
                                                <SelectInputWithSearch
                                                    isRequired
                                                    defaultSelectedKey={
                                                        selectedExpense?.payment_method
                                                    }
                                                    label="Paid Via"
                                                    name="payment_method"
                                                    options={paidViaOptions}
                                                    placeholder="Select payment method"
                                                />

                                                <CurrencyInput
                                                    isRequired
                                                    currencyName="currency"
                                                    currencyOptions={currencyOptions}
                                                    defaultCurrency={company?.currency}
                                                    label="Price"
                                                    labelPlacement="outside"
                                                    name="amount"
                                                    placeholder="0.00"
                                                />
                                                <DatePicker
                                                    disableFutureDates
                                                    isRequired
                                                    label="Date"
                                                    name="date"
                                                />
                                            </div>
                                        </div>
                                        {/* Divider */}
                                        {/* <div>
                                                <Divider
                                                    className="bg-default-200"
                                                    orientation="vertical"
                                                />
                                            </div> */}
                                        {/* <div className="flex w-full">
                                                <div className="gap-3 mt-3 w-full h-full">
                                                    <Dropzone isLoading={isLoading} name="file" />
                                                    <div className="mt-2">
                                                        <CaptureImage name="file" />
                                                    </div>
                                                </div>
                                            </div> */}
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="white" variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" isLoading={isPending} type="submit">
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </Form>
                        </Formik>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
