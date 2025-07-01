import axiosInstance from '@src/services/axiosInstance';

export const all_passwords = async () =>
    axiosInstance
        .get(`/user/customer/passwords`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const addPassword = async (payload: any) => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]: [any, any]) => {
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                formData.append(`${key}[${index}]`, item);
            });
        } else {
            formData.append(key, value);
        }
    });
    return axiosInstance
        .post(`/user/customer/passwords`, formData)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
};

export const updatePassword = async (payload: any) => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]: [any, any]) => {
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                formData.append(`${key}[${index}]`, item);
            });
        } else {
            formData.append(key, value);
        }
    });
    return axiosInstance
        .put(`/user/customer/passwords/${payload?.id}`, formData)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
};

export const deletePassword = async (id: string) =>
    axiosInstance
        .delete(`/user/customer/passwords/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
