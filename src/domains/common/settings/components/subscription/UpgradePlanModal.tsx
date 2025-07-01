import Modal, { ModalBody, ModalContent, ModalHeader } from '@components/atomic/Modal';

import PlanList from './PlanList';

function UpgradePlanModal({ priceId, isFree, isOpen, onOpenChange, onClose, isActive }: any) {
    return (
        <Modal
            isOpen={isOpen}
            scrollBehavior="outside"
            size="4xl"
            onClose={onClose}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader>Upgrade Plan </ModalHeader>
                <div className="sm:p-10 p-5">
                    <div className="flex w-full flex-col items-center">
                        <div className="flex w-full justify-between">
                            <h1 className="text-4xl mb-2 text-center font-semibold flex-1">
                                Choose a plan to continue
                            </h1>
                            <div className="w-10" />
                        </div>
                        <h5 className="text-xl mb-2 text-center">
                            We believe GoZupees should be accessible to all companies, no matter the
                            size.
                        </h5>
                        <div className="flex flex-col gap-7">
                            <PlanList
                                isActive={isActive}
                                isFree={isFree}
                                planPriceId={priceId}
                                toggle={onOpenChange}
                            />
                        </div>
                    </div>
                </div>
                <ModalBody />
                {/* <ModalFooter>
                    <Button color="white" variant="light" onPress={onOpenChange}>
                        Cancel
                    </Button>
                    <Button color="primary" type="submit">
                        Submit
                    </Button>
                </ModalFooter> */}
            </ModalContent>
        </Modal>
    );
}

export default UpgradePlanModal;
