import { useNavigate } from 'react-router-dom';

import Button from '@components/atomic/Button';
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@components/atomic/Modal';

function ChoosePlanInfoModal({ isOpen, onClose, onOpenChange }: any) {
    const navigate = useNavigate();
    return (
        <Modal isOpen={isOpen} size="4xl" onClose={onClose} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Info</ModalHeader>
                <div className="sm:p-10 p-5">
                    <div className="flex w-full justify-between">
                        <h1 className="text-xl mb-2 text-center font-semibold flex-1">
                            For accessing the features, You need to purchase a valid subscription
                            plan.
                        </h1>
                        <div className="w-10" />
                    </div>
                    <h5 className="text-md mb-2 text-center">
                        Please click continue to purchase a subscription plan.
                    </h5>
                </div>
                <ModalBody />
                <ModalFooter className="">
                    <Button color="white" variant="light" onPress={onOpenChange}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={() => navigate('/plans')}>
                        Continue
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ChoosePlanInfoModal;
