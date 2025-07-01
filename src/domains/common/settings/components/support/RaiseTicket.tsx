import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { toast } from 'sonner';
import * as Yup from 'yup';

import Button from '@components/atomic/Button';
import Input from '@components/atomic/Input';
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@components/atomic/Modal';
import Textarea from '@components/atomic/Textarea';

import { raiseTicket } from '../../api/support';

function RaiseTicket({
    selectedData,
    isOpen,
    onOpenChange,
}: {
    selectedData: any;
    isOpen: boolean;
    onOpenChange: () => void;
}) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: raiseTicket,

        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['support'] });
            toast.success('Submitted successfully');
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
                        <ModalHeader>Raise ticket</ModalHeader>
                        <Formik
                            initialValues={{
                                title: selectedData?.title || '',
                                description: selectedData?.description || '',
                                file: '',
                            }}
                            validationSchema={Yup.object().shape({
                                title: Yup.string().required('Title is a required'),
                                description: Yup.string().required('Description is a required'),
                            })}
                            onSubmit={values => {
                                const payload = { ...values, file: values.file[0] };
                                mutate(payload);
                            }}
                        >
                            <Form>
                                <ModalBody>
                                    <div className="flex flex-col gap-4">
                                        <Input
                                            isRequired
                                            label="Title"
                                            name="title"
                                            placeholder="Enter title "
                                        />
                                        <Textarea
                                            isRequired
                                            label="Description"
                                            name="description"
                                            placeholder="Enter description "
                                        />
                                        <Input label="Upload" name="file" type="file" />
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

export default RaiseTicket;
