import { createSlice } from '@reduxjs/toolkit';

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
        step: 1,
        email: '',
        new_password: '',
    },
    reducers: {
        forgotPasswordNextStep: (state, action) => {
            state.step = 2;
            state.email = action.payload.email;
            state.new_password = action.payload.new_password;
        },
        forgotPasswordPreviousStep: state => {
            state.step -= 1;
        },
        forgotPasswordReset: state => {
            state.step = 1;
            state.email = '';
            state.new_password = '';
        },
    },
});

export const { forgotPasswordNextStep, forgotPasswordPreviousStep, forgotPasswordReset } =
    forgotPasswordSlice.actions;

export const forgotPasswordReducer = forgotPasswordSlice.reducer;
