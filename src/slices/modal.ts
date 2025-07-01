import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ModalState = 'add-expense' | 'add-company' | 'meeting';

interface Modal {
    currentModal: null | ModalState;
}

const initialState: Modal = {
    currentModal: null,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setOpenModal: (state, action: PayloadAction<ModalState>) => {
            state.currentModal = action.payload;
        },
        setCloseModal: state => {
            state.currentModal = null;
        },
    },
});

export const { setOpenModal, setCloseModal } = modalSlice.actions;

export default modalSlice.reducer;
