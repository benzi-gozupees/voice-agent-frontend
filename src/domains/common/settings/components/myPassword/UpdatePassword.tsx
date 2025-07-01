import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import * as Yup from 'yup';

import Button from '@components/atomic/Button';
import Input from '@components/atomic/Input';
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@components/atomic/Modal';
import PasswordInput from '@components/atomic/PasswordInput';

import { updatePassword } from '../../api/password';

export default function UpdatePassword({
    data,
    isOpen,
    onOpenChange,
}: {
    isOpen: boolean;
    data: any;
    onOpenChange: () => void;
}) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updatePassword,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['passwords'] });
            toast.success('Updated successfully');
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
                        <ModalHeader>Update password</ModalHeader>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                id: data?._id,
                                title: data?.title || '',
                                user_name: data?.user_name || '',
                                password: data?.password || '',
                                url: data?.url || '',
                                type: data?.type || '',
                                image: [],
                            }}
                            validationSchema={Yup.object().shape({
                                title: Yup.string().required('Title is a required field'),
                                user_name: Yup.string().required('User name is a required field'),
                                password: Yup.string().required('Password is a required field'),
                                url: Yup.string()
                                    .nullable()
                                    .notRequired()
                                    .url('Please enter a valid URL'),
                            })}
                            onSubmit={values => {
                                mutate({ ...values, image: values?.image[0] });
                            }}
                        >
                            <Form>
                                <ModalBody>
                                    <div className="flex flex-col gap-4">
                                        <Input
                                            isRequired
                                            label="Title"
                                            name="title"
                                            placeholder="Enter the software/service name"
                                        />
                                        <Input
                                            label="Type"
                                            name="type"
                                            placeholder="Enter the software/service type"
                                        />
                                        <Input
                                            isRequired
                                            label="Username"
                                            name="user_name"
                                            placeholder="Enter your username "
                                        />
                                        <PasswordInput
                                            isRequired
                                            label="Password"
                                            name="password"
                                            placeholder="Enter your password"
                                            type="password"
                                        />
                                        <Input
                                            label="Website url"
                                            name="url"
                                            placeholder="Enter website url"
                                        />

                                        <Input label="Image" name="file" type="file" />
                                        {data?.image ? (
                                            <Link
                                                className="text-primary flex justify-end mr-4 underline"
                                                target="__blank"
                                                to={data?.image as any}
                                            >
                                                Existing File
                                            </Link>
                                        ) : null}
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
