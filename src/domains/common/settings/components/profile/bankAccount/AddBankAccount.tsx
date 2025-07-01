import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { toast } from 'sonner';

import Button from '@components/atomic/Button';
import Checkbox from '@components/atomic/Checkbox';
import Input from '@components/atomic/Input';
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@components/atomic/Modal';
import { add_bank_account } from '@domains/common/settings/api/bank_account';
import { bank_accountSchema } from '@domains/common/settings/schema/bankAccount';

export default function AddBankAccount({
    isOpen,
    onOpenChange,
}: {
    isOpen: boolean;
    onOpenChange: () => void;
}) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: add_bank_account,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myAccounts'] });
            toast.success('Account added successfully');
            onOpenChange();
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Something went wrong';
            toast.error(message);
        },
    });
    return (
        <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange}>
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Add Bank Account</ModalHeader>
                        <Formik
                            initialValues={{
                                account_holder_name: '',
                                bank_name: '',
                                account_no: '',
                                code: '',
                                isDefault: false,
                            }}
                            validationSchema={bank_accountSchema}
                            onSubmit={values => {
                                mutate(values);
                            }}
                        >
                            <Form>
                                <ModalBody>
                                    <div className="flex flex-col gap-4">
                                        <Input
                                            label="Account holder name"
                                            name="account_holder_name"
                                            placeholder="Please enter account holder name"
                                        />
                                        <Input
                                            label="Bank name"
                                            name="bank_name"
                                            placeholder="Please enter bank name"
                                        />
                                        <Input
                                            label="Account number"
                                            name="account_no"
                                            placeholder="Please enter account number"
                                        />
                                        <Input
                                            label="Bank code/Branch code"
                                            name="code"
                                            placeholder="Please enter bank code/branch code"
                                        />
                                        <Checkbox name="isDefault">Set as default account</Checkbox>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="white" variant="light" onPress={onClose}>
                                        Close
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
