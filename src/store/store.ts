import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { forgotPasswordReducer } from '@src/domains/auth/slices/forgotPasswordSlice';

import authReducer from '../domains/auth/slices/auth';
import companyReducer from '../domains/common/slices/company';
import modalReducer from '../slices/modal';

const rootReducer = combineReducers({
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    modal: modalReducer,
    company: companyReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
