import { useEffect } from 'react';

import { ModalProps, Modal as NextModal } from '@nextui-org/react';
import { ReactSVG } from 'react-svg';

import crossIcon from '@assets/icons/cross.svg';

export default function Modal({ children, ...props }: ModalProps) {
    useEffect(() => {
        if (props.isOpen) document.body.style.overflowY = 'hidden';
        else document.body.style.overflowY = 'auto';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, [props.isOpen]);

    return (
        <NextModal
            classNames={{
                base: 'bg-background rounded-3xl',
                closeButton: 'right-4 top-[10px]',
            }}
            closeButton={<ReactSVG height={28} src={crossIcon} width={28} />}
            isDismissable={false}
            placement="center"
            {...props}
        >
            {children}
        </NextModal>
    );
}

export { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
