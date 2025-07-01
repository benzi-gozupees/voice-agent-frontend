import axiosInstance from '@src/services/axiosInstance';

import { AllCompaniesResponse, ChangeDefaultCompanyResponse, CompanyResponse } from '../types';

// export const addCompany = async (payload: CompanyPayload) => {
//     const formData = new FormData();
//     formData.append('name', payload.name);
//     formData.append('currency', payload.currency);
//     formData.append('language', payload.language);
//     formData.append('address', payload.address);
//     formData.append('city', payload.city);
//     formData.append('state', payload.state);
//     formData.append('zip_code', payload.zip_code);
//     formData.append('country', payload.country);
//     formData.append('tax_number', payload.tax_number);
//     formData.append('financial_start_date', payload.financial_start_date);
//     formData.append('business_years', payload.business_years);
//     formData.append('license_expiry', payload.license_expiry);
//     formData.append('sector', payload.sector);
//     formData.append('user_role', payload.user_role);
//     formData.append('size', payload.size);
//     formData.append('current_method', payload.current_method);
//     formData.append('purpose', payload.purpose);
//     formData.append('email', payload.email);
//     formData.append('country_code', payload.country_code);
//     formData.append('mobile', payload.mobile);
//     formData.append('license', payload.license[0]);
//     formData.append('license_number', payload.license_number);
//     formData.append('license_authority', payload.license_authority);
//     formData.append('trn', payload.trn);
//     return axiosInstance
//         .post(`/user/customer/companies`, formData)
//         .then(res => res.data)
//         .catch(err => {
//             throw err;
//         });
// };

// export const updateCompany = async (payload: CompanyPayload) => {
//     const id = payload._id;
//     const formData = new FormData();
//     formData.append('name', payload.name);
//     formData.append('currency', payload.currency);
//     formData.append('language', payload.language);
//     formData.append('address', payload.address);
//     formData.append('city', payload.city);
//     formData.append('state', payload.state);
//     formData.append('zip_code', payload.zip_code);
//     formData.append('country', payload.country);
//     formData.append('tax_number', payload.tax_number);
//     formData.append('financial_start_date', payload.financial_start_date);
//     formData.append('business_years', payload.business_years);
//     formData.append('license_expiry', payload.license_expiry);
//     formData.append('sector', payload.sector);
//     formData.append('user_role', payload.user_role);
//     formData.append('size', payload.size);
//     formData.append('current_method', payload.current_method);
//     formData.append('purpose', payload.purpose);
//     formData.append('email', payload.email);
//     formData.append('country_code', payload.country_code);
//     formData.append('mobile', payload.mobile);
//     formData.append('license', payload.license[0]);
//     formData.append('license_number', payload.license_number);
//     formData.append('license_authority', payload.license_authority);
//     formData.append('trn', payload.trn);

//     return axiosInstance
//         .patch(`/user/customer/companies/${id}`, formData)
//         .then(res => res.data)
//         .catch(err => {
//             throw err;
//         });
// };

export const getAllCompanies = async () =>
    axiosInstance
        .get<AllCompaniesResponse>(`/user/customer/companies`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getCompany = async () =>
    axiosInstance
        .get<CompanyResponse>(`/user/customer/companies/company`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const setDefaultCompany = async (id: string) =>
    axiosInstance
        .patch<ChangeDefaultCompanyResponse>(`/user/customer/companies/${id}/default`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getLicenseExpiry = async (id: string) =>
    axiosInstance
        .get(`/user/customer/companies/expiry`, { params: { company: id } })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getTasks = async (payload: {
    page?: number;
    limit?: number;
    period?: string;
    status?: string;
    priority?: string;
    company?: string;
    sort?: any;
}) =>
    axiosInstance
        .get<any>(`/user/customer/tasks`, { params: payload })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
export const getGraphData = async (payload: { from: string; to: string; company: string }) =>
    axiosInstance
        .get<any>(`/user/customer/invoices/charts`, { params: payload })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
export const getStatsData = async (payload: { company: string }) =>
    axiosInstance
        .get<any>(`/user/customer/users/stats`, { params: payload })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
