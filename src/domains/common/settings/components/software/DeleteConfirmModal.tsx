import {
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
import { MutationFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import Button from '@components/atomic/Button';
import { setCompany } from '@domains/common/slices/company';
import { useAppDispatch } from '@hooks/store';

interface DeleteModalProps {
    _id: string;
    isOpen: boolean;
    onClose: () => void;
    mutationFn: MutationFunction<any, any>;
    invalidationKey: string;
    otherInvalidationKey?: string;
    title?: string;
    body?: string;
}

export default function DeleteConfirmModal({
    _id,
    isOpen = false,
    onClose,
    mutationFn,
    invalidationKey,
    otherInvalidationKey,
    title = 'Delete item?',
    body = 'Do you want to delete this item? this cant be undone.',
}: DeleteModalProps) {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const { mutate, isPending } = useMutation({
        mutationFn,
        onSuccess: data => {
            dispatch(setCompany(data));
            queryClient.invalidateQueries({ queryKey: [invalidationKey] });
            queryClient.invalidateQueries({ queryKey: [otherInvalidationKey] });
            toast.success('Deleted successfully');
            onClose();
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Something went wrong';
            toast.error(message);
        },
    });

    if (!_id) return null;

    return (
        <Modal
            classNames={{
                base: 'rounded-3xl bg-background',
            }}
            closeButton={<></>}
            isOpen={isOpen}
            placement="center"
            radius="lg"
            size="sm"
            onClose={onClose}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                <ModalBody>
                    <p>{body}</p>
                    <Divider className="mt-2 bg-default-200" />
                </ModalBody>
                <ModalFooter>
                    <Button color="white" variant="light" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button color="danger" isLoading={isPending} onClick={() => mutate(_id)}>
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
