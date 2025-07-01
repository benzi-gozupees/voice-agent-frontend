import { Divider, Spacer } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { toast } from 'sonner';
import * as Yup from 'yup';

import Button from '@components/atomic/Button';
import Input from '@components/atomic/Input';
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@components/atomic/Modal';
import { setUser } from '@domains/auth/slices/auth';
import { updateProfile } from '@domains/common/settings/api/profile';
import { useAppDispatch, useAppSelector } from '@hooks/store';
import { capitalize } from '@utils/stringOps';

type EditMyProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

function EditMyProfileModal({ isOpen, onClose }: EditMyProfileModalProps) {
    const { user } = useAppSelector((state: any) => state.auth);
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
        mutationFn: (data: { role: string; payload: any }) =>
            updateProfile(data.role, data.payload),
        onSuccess: data => {
            dispatch(setUser(data?.user));
            queryClient.invalidateQueries({ queryKey: ['getProfile'] });
            toast.success('Name updated successfully');
            onClose();
        },
        onError: (err: any) => {
            const message = err?.response?.data?.message || 'Something went wrong';
            toast.error(message);
        },
    });

    return (
        <Modal isOpen={isOpen} size="xl" onOpenChange={onClose}>
            <ModalContent>
                <ModalHeader>Edit Personal Details</ModalHeader>
                <Formik
                    enableReinitialize
                    initialValues={{
                        name: user?.name || '',
                        email: user?.email || '',
                        role: capitalize(user?.role) || '',
                        invoice_email: user?.invoice_email || '',
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Please Enter Your Name'),
                    })}
                    onSubmit={(values: any) => mutate({ role: values.role, payload: values })}
                >
                    <Form>
                        <ModalBody>
                            <Input isRequired label="Name" name="name" placeholder="Enter name" />
                            <Input
                                isDisabled
                                isRequired
                                label="Email"
                                name="email"
                                placeholder="Enter email"
                            />
                            <Input
                                isDisabled
                                isRequired
                                label="Role"
                                name="role"
                                placeholder="Enter role"
                            />
                            <Input
                                isDisabled
                                isRequired
                                label="Invoice Email"
                                name="invoice_email"
                                placeholder="Enter invoice email"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <div className="w-full">
                                <Divider />
                                <Spacer y={4} />
                                <div className="flex justify-end gap-2">
                                    <Button color="white" variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        isDisabled={isPending}
                                        isLoading={isPending}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    );
}

export default EditMyProfileModal;
