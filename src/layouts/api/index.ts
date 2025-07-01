import { AccessLevel, ServiceResponse } from '@customTypes/accessLevel';
import axiosInstance from '@src/services/axiosInstance';

export const accessLevel = async () =>
    axiosInstance
        .get<AccessLevel>('/user/admin/profile/access-level')
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getServices = async () =>
    axiosInstance
        .get<ServiceResponse>('/user/customer/profile/services')
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getTasksHealthCheckStats = async (company: string) =>
    axiosInstance
        .get<any>('/user/customer/tasks/health-check', { params: { company } })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getExpenseHealthCheckStats = async (company: string) =>
    axiosInstance
        .get<any>('/user/customer/expenses/health-check', { params: { company } })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getInvoiceHealthCheckStats = async (company: string) =>
    axiosInstance
        .get<any>('/user/customer/invoices/health-check', { params: { company } })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getVendorPaymentHealthCheckStats = async (company: string) =>
    axiosInstance
        .get<any>('/user/customer/purchases/health-check', { params: { company } })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getSalariesHealthCheckStats = async (company: string) =>
    axiosInstance
        .get<any>('/user/customer/salaries/health-check', { params: { company } })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getChequesHealthCheckStats = async (company: string) =>
    axiosInstance
        .get<any>('/user/customer/cheque/health-check', { params: { company } })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getStatementsHealthCheckStats = async (company: string) =>
    axiosInstance
        .get<any>('/user/customer/bank-statement/health-check', { params: { company } })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getTaxFilingHealthCheckStats = async (company: string) =>
    axiosInstance
        .get<any>('/user/customer/tax/health-check', { params: { company } })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
