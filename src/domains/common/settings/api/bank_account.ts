import axiosInstance from '@src/services/axiosInstance';

export const all_bank_accounts = async () =>
    axiosInstance
        .get(`/user/customer/bank_account`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const add_bank_account = async (payload: any) =>
    axiosInstance
        .post(`/user/customer/bank_account`, payload)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
export const update_bank_account = async (payload: any) =>
    axiosInstance
        .patch(`/user/customer/bank_account/${payload?.id}`, payload)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
