import { Divider, Spacer, Spinner } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FieldArray, Form, Formik } from 'formik';
import { toast } from 'sonner';
import * as Yup from 'yup';

import AddInputItem from '@components/atomic/AddInputItem';
import Button from '@components/atomic/Button';
import Input from '@components/atomic/Input';
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@components/atomic/Modal';
import { getAccountantById, updateAccountant } from '@domains/common/settings/api/profile';
import { useAppSelector } from '@hooks/store';

type EditAccountantProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

function EditAccountantProfileModal({ isOpen, onClose }: EditAccountantProfileModalProps) {
    const { user } = useAppSelector((state: any) => state.auth);
    const queryClient = useQueryClient();

    const { data, refetch, isLoading, error } = useQuery({
        queryKey: ['getAccountantById', user?._id],
        queryFn: () => getAccountantById(user?._id),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: updateAccountant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getAccountantById'] });
            queryClient.invalidateQueries({ queryKey: ['getProfile'] });
            onClose();
            toast.success('Updated successfully');
        },
        onError: (err: any) => {
            const message = err?.response?.data?.message || 'Something went wrong';
            toast.error(message);
        },
    });
    return (
        <Modal isOpen={isOpen} scrollBehavior="outside" size="2xl" onOpenChange={onClose}>
            <ModalContent>
                <ModalHeader>Edit Personal Details</ModalHeader>

                {isLoading ? (
                    <div
                        className="flex justify-center items-center"
                        style={{ marginTop: '100px' }}
                    >
                        <Spinner />
                    </div>
                ) : null}
                <Formik
                    enableReinitialize
                    initialValues={{
                        name: data?.accountant?.name || '',
                        email: data?.accountant?.email || '',
                        skills: data?.profile?.skills || [''],
                        expertise: data?.profile?.expertise || [''],
                        experience: data?.profile?.experience || '',
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Please Enter Your Name'),
                        email: Yup.string()
                            .email('Invalid email format')
                            .required('Please Enter Your Email'),
                        experience: Yup.number()
                            .typeError('Experience must be a number')
                            .required('Please Enter Your Experience'),
                        skills: Yup.array().of(Yup.string().required('Please Enter a Skill')),
                        expertise: Yup.array().of(
                            Yup.string().required('Please Enter an Expertise')
                        ),
                    })}
                    onSubmit={async (values: any) => mutate({ id: user?._id, data: values })}
                >
                    {({ values, setFieldValue, errors, touched, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <ModalBody>
                                <Input
                                    isRequired
                                    label="Name"
                                    name="name"
                                    placeholder="Enter name"
                                />
                                <Input
                                    isRequired
                                    label="Email"
                                    name="email"
                                    placeholder="Enter email"
                                />
                                <Input
                                    isRequired
                                    label="Experience"
                                    name="experience"
                                    placeholder="Experience in years"
                                />
                                <div className="flex flex-row mb-3 gap-4">
                                    <div className="sm:w-full md:w-6/12">
                                        <h2 className="text-sm font-medium mb-2">Skills</h2>
                                        <FieldArray
                                            name="skills"
                                            render={arrayHelpers =>
                                                values.skills?.map((item: any, index: any) => (
                                                    <AddInputItem
                                                        key={index}
                                                        arrayHelpers={arrayHelpers}
                                                        index={index}
                                                        item={item}
                                                        name="skills"
                                                        placeholder="Enter a skill"
                                                        values={values}
                                                    />
                                                ))
                                            }
                                        />
                                        <Button
                                            className="text-sm p-0"
                                            color="text"
                                            onClick={() =>
                                                setFieldValue('skills', [
                                                    ...(values.skills ?? []),
                                                    '',
                                                ])
                                            }
                                        >
                                            Add a skill
                                        </Button>
                                    </div>
                                    <div className="sm:w-full md:w-6/12">
                                        <h2 className="text-sm font-medium mb-2">Expertises</h2>
                                        <FieldArray
                                            name="expertise"
                                            render={arrayHelpers =>
                                                values.expertise?.map((item: any, index: any) => (
                                                    <AddInputItem
                                                        key={index}
                                                        arrayHelpers={arrayHelpers}
                                                        index={index}
                                                        item={item}
                                                        name="expertise"
                                                        placeholder="Enter an expertise"
                                                        values={values}
                                                    />
                                                ))
                                            }
                                        />
                                        <Button
                                            className="text-sm p-0"
                                            color="text"
                                            onClick={() =>
                                                setFieldValue('expertise', [
                                                    ...(values.expertise ?? []),
                                                    '',
                                                ])
                                            }
                                        >
                                            Add an expertise
                                        </Button>
                                    </div>
                                </div>
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
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
}

export default EditAccountantProfileModal;
