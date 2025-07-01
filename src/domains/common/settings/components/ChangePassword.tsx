import { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { toast } from 'sonner';

import Button from '@components/atomic/Button';
import Modal from '@components/atomic/Modal';
import PasswordInput from '@components/atomic/PasswordInput';
import { useAppSelector } from '@hooks/store';

import { updatePassword } from '../api/profile';
import changePasswordSchema from '../schema/changePassword';

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
};

function ChangePassword({ isOpen, onOpenChange }: Props) {
    const queryClient = useQueryClient();
    const { role } = useAppSelector((state: any) => state.auth);

    const { mutate, isPending, error } = useMutation({
        mutationFn: (payload: { role: string; data: any }) =>
            updatePassword(payload.role, payload.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getProfile'] });
            toast.success('Password updated');
            onOpenChange();
        },
        onError: (err: any) => {
            const message = err?.response?.data?.message || 'Something went wrong';
            toast.error(message);
        },
    });

    return (
        <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange}>
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Change Password</ModalHeader>
                        <Formik
                            initialValues={{
                                new_pass: '',
                                curr_pass: '',
                                confirm_pass: '',
                            }}
                            validationSchema={changePasswordSchema}
                            onSubmit={values => {
                                const data = {
                                    new_password: values.new_pass,
                                    old_password: values.curr_pass,
                                };
                                mutate({ role, data });
                            }}
                        >
                            {({ handleSubmit }) => (
                                <Form className="" onSubmit={handleSubmit}>
                                    <ModalBody>
                                        <div className="flex flex-col gap-4">
                                            <PasswordInput
                                                isRequired
                                                label="Old Password"
                                                name="curr_pass"
                                                placeholder="Enter your old password"
                                                type="password"
                                            />
                                            <PasswordInput
                                                isRequired
                                                label="New Password"
                                                name="new_pass"
                                                placeholder="Enter your new password"
                                                type="password"
                                            />
                                            <PasswordInput
                                                isRequired
                                                label="Confirm Password"
                                                name="confirm_pass"
                                                placeholder="Enter your new password"
                                                type="password"
                                            />
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="white" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="primary" isLoading={isPending} type="submit">
                                            Change
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            )}
                        </Formik>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ChangePassword;
