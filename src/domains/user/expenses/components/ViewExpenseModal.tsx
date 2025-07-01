import { parseDate } from '@internationalized/date';
import { Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import { toast } from 'sonner';

import Button from '@components/atomic/Button';
import CurrencyInput from '@components/atomic/CurrencyInput';
import DatePicker from '@components/atomic/DatePicker';
import Input from '@components/atomic/Input';
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@components/atomic/Modal';
import Error from '@components/molecular/Error';
import { currencyOptions } from '@src/constants/currency';

import { getExpense } from '../api/expenseApi';

type ViewExpenseModalProps = {
    isOpen: boolean;
    onClose: () => void;
    id: string;
};

export default function ViewExpenseModal({ isOpen, onClose, id }: ViewExpenseModalProps) {
    const { data, isPending, isError } = useQuery({
        queryKey: ['getExpense', id],
        queryFn: () => getExpense(id || ''),
        enabled: !!id,
    });

    const initialValues = {
        type: data?.type || '',
        payment_method: data?.payment_method || '',
        amount: data?.amount || '',
        merchant: data?.merchant || '',
        date: parseDate(format(new Date(data?.date || new Date()), 'yyyy-MM-dd')),
        category: data?.category || '',
        currency: data?.currency || '',
    };

    const handleViewFile = (url: string) => {
        if (url) window.open(url, '_blank');
        else toast.error('File not available');
    };

    const renderBody = () => {
        if (isPending)
            return (
                <div className="h-24 flex justify-center">
                    <Spinner />
                </div>
            );

        if (isError || !data)
            return (
                <div className="mt-16 flex justify-center">
                    <Error width={250} />
                </div>
            );

        return (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2" id="view">
                <div className="flex flex-col gap-4">
                    <Input readOnly label="Type" name="type" />
                    <Input readOnly label="Merchant" name="merchant" />
                    <Input readOnly label="Category" name="category" />
                    <Input readOnly label="Paid Via" name="payment_method" />
                    <CurrencyInput
                        isDisabled
                        currencyName="currency"
                        currencyOptions={currencyOptions}
                        defaultCurrency={initialValues.currency}
                        label="Price"
                        name="amount"
                    />
                    <DatePicker isDisabled label="Date" name="date" />
                    <div className="flex">
                        {data.file ? (
                            <Button color="text" onClick={() => handleViewFile(data.file[0].url)}>
                                View Attachment
                            </Button>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Formik enableReinitialize initialValues={initialValues} onSubmit={() => {}}>
            <Form>
                <Modal isOpen={isOpen} size="xl" onOpenChange={onClose}>
                    <ModalContent>
                        <ModalHeader>View Expense</ModalHeader>
                        <ModalBody>{renderBody()}</ModalBody>
                        <ModalFooter>
                            <Button color="white" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Form>
        </Formik>
    );
}
