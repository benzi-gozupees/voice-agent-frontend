import { useCallback, useEffect, useRef, useState } from 'react';

interface IUseModal {
    initialState?: boolean;
    onChange?: (isOpen: boolean) => void;
    onClose?: () => void;
}

function useModal({ initialState = false, onChange, onClose }: IUseModal = {}) {
    const [isOpen, setIsOpen] = useState(initialState);
    const initialRender = useRef(true);

    useEffect(() => {
        if (onChange) onChange(isOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else if (onClose && !isOpen) onClose();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => setIsOpen(false), []);
    const toggleModal = useCallback(() => setIsOpen(prev => !prev), []);

    return { isOpen, openModal, closeModal, toggleModal };
}

export default useModal;
