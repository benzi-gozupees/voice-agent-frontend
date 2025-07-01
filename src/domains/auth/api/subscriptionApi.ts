import axiosInstance from '@src/services/axiosInstance';

export const allPlans = async (search: string) =>
    axiosInstance
        .get(`/user/public/plans?search=${search}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
