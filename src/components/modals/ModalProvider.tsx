// import AddCompanyModal from '@domains/common/settings/components/profile/company/AddCompanyModal';
import AddExpenseModal from '@domains/user/expenses/components/AddExpenseModal';
import { useAppDispatch, useAppSelector } from '@hooks/store';
import { setCloseModal } from '@src/slices/modal';

function ModalProvider() {
    const { currentModal } = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();
    const onClose = () => {
        dispatch(setCloseModal());
    };

    switch (currentModal) {
        case 'add-expense':
            return <AddExpenseModal isOpen={!!currentModal} onClose={onClose} />;
        // case 'add-company':
        //     return <AddCompanyModal isOpen={!!currentModal} onClose={onClose} />;
        default:
            return null;
    }
}

export default ModalProvider;
