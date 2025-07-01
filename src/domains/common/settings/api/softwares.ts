import axiosInstance from '@src/services/axiosInstance';

export const getZohoToken = async ({ code, companyId }: { code: string; companyId: string }) =>
    axiosInstance
        .patch(`/user/customer/users/zoho-auth/${code}`, { company: companyId })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const softwarekey = async (payload: { wafeq_key: string }) =>
    axiosInstance
        .patch('/user/customer/users/software-key', payload)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const disconnectWafeq = async (id: string) =>
    axiosInstance
        .delete(`/user/customer/users/software-key/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
export const disconnectZoho = async (id: string) =>
    axiosInstance
        .delete(`/user/customer/users/zoho/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
export const getZohoOrg = async (company: string) =>
    axiosInstance
        .get(`/user/customer/users/zoho-org`, { params: { company } })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
export const registerZohoOrg = async (payload: { orgId: string; company: string }) =>
    axiosInstance
        .patch(`/user/customer/users/zoho-org`, payload)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
