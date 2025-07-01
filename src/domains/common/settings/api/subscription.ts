import axiosInstance from '@src/services/axiosInstance';

export const ServiceLimitations = async (company: string) =>
    axiosInstance
        .get(`/user/customer/subscription/limitations`, { params: { company } })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const manageSubscription = async (company: string) =>
    axiosInstance
        .get(`/user/customer/payments/manage`, { params: { company } })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const upgradePlanPaymentRequest = async ({
    planId,
    company,
}: {
    planId: string;
    company: string;
}) =>
    axiosInstance
        .get(`/user/customer/payments/upgrade/${planId}`, { params: { company } })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const upgradeFreePlanPaymentRequest = async ({
    planId,
    company,
}: {
    planId: string;
    company: string;
}) =>
    axiosInstance
        .post(`/user/customer/payments/upgrade/request/${planId}`, { company })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getSubscriptionInvoices = async (payload: any) =>
    axiosInstance
        .get(`/user/customer/subscription/invoices`, { params: payload })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getSubscriptionCards = async (company: string) =>
    axiosInstance
        .get(`/user/customer/subscription/cards`, { params: { company } })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
