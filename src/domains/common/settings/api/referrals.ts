import axiosInstance from '@src/services/axiosInstance';

export const getReferrals = async (data: any) =>
    axiosInstance
        .get(`/user/customer/referrals`, { params: data })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getReferral_code = async () =>
    axiosInstance
        .get(`/user/customer/referrals/code`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
