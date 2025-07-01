import Modal, { ModalContent, ModalHeader } from '@components/atomic/Modal';
import Skeleton from '@components/atomic/Skeleton';
import { useAppSelector } from '@hooks/store';

import AddExpenseForm from './AddExpenseForm';
import ExpenseUpload from './ExpenseUpload';

type AddExpenseModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function AddExpenseModal({ isOpen, onClose }: AddExpenseModalProps) {
    const { invoice_email } = useAppSelector(state => state.company);

    const onUploadSuccess = (id: string[]) => {
        onClose();
    };

    return (
        <Modal isOpen={isOpen} scrollBehavior="outside" size="5xl" onOpenChange={onClose}>
            <ModalContent>
                <ModalHeader>Add Expense</ModalHeader>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-4 p-4 pt-0">
                    <div className="border rounded-2xl p-4">
                        <AddExpenseForm onClose={onClose} />
                    </div>

                    <div className="flex items-center justify-center px-2">
                        <span className="text-sm font-medium text-default-500">or</span>
                    </div>

                    <div className="">
                        <ExpenseUpload onSuccess={onUploadSuccess} />
                    </div>

                    <div className="flex justify-center items-center gap-2 rounded-2xl md:col-span-3 p-6 border">
                        <div className="text-center">
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
                </div>
            </ModalContent>
        </Modal>
    );
}
