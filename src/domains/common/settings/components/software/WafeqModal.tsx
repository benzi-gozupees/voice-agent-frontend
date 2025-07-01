import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { toast } from 'sonner';
import * as Yup from 'yup';

import Button from '@components/atomic/Button';
import Input from '@components/atomic/Input';
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@components/atomic/Modal';
import { setCompany } from '@domains/common/slices/company';
import { useAppDispatch, useAppSelector } from '@hooks/store';

import { softwarekey } from '../../api/softwares';

export default function WafeqModal({
    selectedData,
    isOpen,
    onOpenChange,
}: {
    selectedData: any;
    isOpen: boolean;
    onOpenChange: () => void;
}) {
    const queryClient = useQueryClient();
    const company = useAppSelector(state => state.company);
    const dispatch = useAppDispatch();
    const { mutate, isPending } = useMutation({
        mutationFn: softwarekey,

        onSuccess: data => {
            dispatch(setCompany(data));
            queryClient.invalidateQueries({ queryKey: ['softwares'] });
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
                        <ModalHeader>Wafeq API Key</ModalHeader>
                        <Formik
                            initialValues={{
                                wafeq_key: selectedData || '',
                                company: company?._id,
                            }}
                            validationSchema={Yup.object().shape({
                                wafeq_key: Yup.string().required('API key is a required field'),
                            })}
                            onSubmit={values => {
                                mutate(values);
                            }}
                        >
                            <Form>
                                <ModalBody>
                                    <div className="flex flex-col gap-4">
                                        <Input
                                            isRequired
                                            label="API Key"
                                            name="wafeq_key"
                                            placeholder="Enter your api key shown in your wafeq developer section"
                                        />
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
