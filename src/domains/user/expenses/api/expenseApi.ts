import axiosInstance from '@src/services/axiosInstance';

import {
    AddExpensePayload,
    AddRawExpensePayload,
    EditExpensePayload,
    Expense,
    ExpenseChartResponse,
    ExpenseResponse,
    RawExpenseResponse,
} from '../types';

export const addExpense = async (payload: AddExpensePayload) =>
    axiosInstance
        .post(`/user/customer/expenses`, payload)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const addRawExpense = async ({
    file,
    company,
    progressCallback,
    cancelToken,
}: AddRawExpensePayload) => {
    const formData = new FormData();
    formData.append('company', company);
    formData.append('file', file);
    return axiosInstance.post('/user/customer/expenses/raw', formData, {
        onUploadProgress: progressEvent => {
            if (progressEvent.total) {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                progressCallback(percentCompleted);
            } else {
                progressCallback(0);
            }
        },
        cancelToken: cancelToken?.token,
    });
};

export const allRawExpenses = async (payload: any) =>
    axiosInstance
        .get<RawExpenseResponse>(`/user/customer/expenses/raw`, { params: payload })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const deleteRawExpense = async (id: string) => {
    const data = axiosInstance
        .delete(`/user/customer/expenses/raw/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
    return data;
};

export const allExpenses = async (payload: any) =>
    axiosInstance
        .get<ExpenseResponse>(`/user/customer/expenses`, { params: payload })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const editExpense = async (payload: EditExpensePayload) => {
    const formData = new FormData();
    formData.append('company', payload.company);
    if (payload.category) formData.append('category', payload.category);
    formData.append('type', payload.type);
    formData.append('merchant', payload.merchant);
    formData.append('amount', payload.amount);
    formData.append('currency', payload.currency || '');
    formData.append('payment_method', payload.payment_method);
    formData.append('date', payload.date);
    payload.file.forEach(file => {
        formData.append('file', file);
    });
    const data = axiosInstance
        .patch(`/user/customer/expenses/${payload.id}`, formData)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
    return data;
};

export const getExpense = async (id: string) =>
    axiosInstance
        .get<Expense>(`/user/customer/expenses/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const deleteExpense = async (id: string) => {
    const data = axiosInstance
        .delete(`/user/customer/expenses/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
    return data;
};

export const expenseCategory = async () => {
    const data = axiosInstance
        .get(`/user/customer/expenses/categories/all`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
    return data;
};

export const expenseSubCategory = async (category: string) => {
    const data = axiosInstance
        .get(`/user/customer/expenses/subcategory/all/?category=${category}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
    return data;
};

export const convertFile = async (image: string) => {
    const data = axiosInstance
        .get(`/user/customer/users/file?image=${image}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
    return data;
};

export const getExpenseChart = async (payload: any) =>
    axiosInstance
        .get<ExpenseChartResponse>(`/user/customer/expenses/chart`, { params: payload })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
