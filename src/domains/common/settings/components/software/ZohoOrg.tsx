import { useState } from 'react';

import { Checkbox } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { toast } from 'sonner';

import Button from '@components/atomic/Button';
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@components/atomic/Modal';
import { setCompany } from '@domains/common/slices/company';
import { useAppDispatch, useAppSelector } from '@hooks/store';

import { getZohoOrg, registerZohoOrg } from '../../api/softwares';

export default function ZohoOrg({
    isOpen,
    onOpenChange,
}: {
    isOpen: boolean;
    onOpenChange: () => void;
}) {
    const queryClient = useQueryClient();
    const [checked, setChecked] = useState();
    const dispatch = useAppDispatch();
    const company = useAppSelector(state => state.company);
    const { mutate, isPending } = useMutation({
        mutationFn: registerZohoOrg,

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

    const { data, isLoading } = useQuery({
        queryKey: ['zohoOrg'],
        queryFn: () => getZohoOrg(company?._id),
    });

    return (
        <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange}>
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader>Zoho Organization</ModalHeader>
                        <Formik
                            initialValues={{
                                orgId: '',
                                company: company?._id,
                            }}
                            // validationSchema={Yup.object().shape({
                            //     wafeq_key: Yup.string().required('API key is a required field'),
                            // })}
                            onSubmit={values => {
                                mutate({ orgId: checked || '', company: company?._id || '' });
                            }}
                        >
                            <Form>
                                <ModalBody>
                                    {data?.organisations?.length > 0 ? (
                                        <>
                                            <h1>
                                                Pick your zoho organization from the below list to
                                                complete the process.
                                            </h1>
                                            <div className="flex flex-col gap-4">
                                                {data?.organisations.map(
                                                    (item: any, index: number) => (
                                                        <Checkbox
                                                            key={index}
                                                            name="org"
                                                            onChange={() =>
                                                                setChecked(item?.organization_id)
                                                            }
                                                        >
                                                            {item?.contact_name}
                                                        </Checkbox>
                                                    )
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <h1>
                                            Please add an organisation with the zoho account to
                                            proceed
                                        </h1>
                                    )}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="white" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        color="primary"
                                        isDisabled={!data?.organisations?.length}
                                        isLoading={isPending}
                                        type="submit"
                                    >
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
