import axiosInstance from '@src/services/axiosInstance';

export const addTracking = async (payload: any) =>
    axiosInstance
        .post(`/user/accountant/tracking`, payload)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
