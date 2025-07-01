import axiosInstance from '@src/services/axiosInstance';

export const getAlerts = async () =>
    axiosInstance
        .get(`/user/customer/alert`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
export const setAlerts = async (payload: any) =>
    axiosInstance
        .post(`/user/customer/alert`, payload)
        .then(res => res)
        .catch(err => {
            throw err;
        });
