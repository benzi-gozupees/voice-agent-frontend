import axiosInstance from '@src/services/axiosInstance';

export const previousTickets = async (params: any) =>
    axiosInstance
        .get(`/messaging/customer/complaints`, { params })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const raiseTicket = async (payload: any) => {
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
        .post(`/messaging/customer/complaints`, formData)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
};
