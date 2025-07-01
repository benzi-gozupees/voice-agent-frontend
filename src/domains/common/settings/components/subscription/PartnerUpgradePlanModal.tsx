import Modal, { ModalBody, ModalContent, ModalHeader } from '@components/atomic/Modal';
import Empty from '@components/molecular/Empty';

function PartnerUpgradePlanModal({ isOpen, onOpenChange, onClose }: any) {
    return (
        <Modal isOpen={isOpen} size="xl" onClose={onClose} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Subscription Alert </ModalHeader>
                <ModalBody>
                    <div className="flex w-full flex-col items-center">
                        <div className="flex w-full justify-between">
                            <h1 className="text-xl mb-2 text-center font-semibold flex-1">
                                Please upgrade your subscription to continue.
                            </h1>
                            <div className="w-10" />
                        </div>
                    </div>
                    <Empty message="" title="" />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default PartnerUpgradePlanModal;
