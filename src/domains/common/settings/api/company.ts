import {
    CompanyResponse,
    CreateCompanyRequest,
    UpdateCompanyRequest,
} from '@domains/user/dashboard/types';
import axiosInstance from '@src/services/axiosInstance';

export const addCompany = async (payload: CreateCompanyRequest) => {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('currency', payload.currency);
    formData.append('language', payload.language);
    formData.append('address', payload.address);
    formData.append('city', payload.city);
    formData.append('state', payload.state);
    formData.append('zip_code', payload.zip_code);
    formData.append('country', payload.country);
    formData.append('tax_number', payload.tax_number);
    formData.append('financial_start_date', payload.financial_start_date);
    formData.append('business_years', payload.business_years);
    formData.append('license_expiry', payload.license_expiry);
    formData.append('license_issue_date', payload.license_issue_date);
    formData.append('sector', payload.sector);
    formData.append('user_role', payload.user_role);
    formData.append('size', payload.size);
    formData.append('current_method', payload.current_method);
    formData.append('purpose', payload.purpose);
    formData.append('email', payload.email);
    formData.append('country_code', payload.country_code);
    formData.append('mobile', payload.mobile);
    formData.append('license', payload.license[0]);
    formData.append('license_number', payload.license_number);
    formData.append('license_authority', payload.license_authority);
    formData.append('trn', payload.trn);

    return axiosInstance
        .post(`/user/customer/companies`, formData)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
};

export const updateCompany = async (payload: UpdateCompanyRequest) => {
    const id = payload._id;
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('currency', payload.currency);
    formData.append('language', payload.language);
    formData.append('address', payload.address);
    formData.append('city', payload.city);
    formData.append('state', payload.state);
    formData.append('zip_code', payload.zip_code);
    formData.append('country', payload.country);
    formData.append('tax_number', payload.tax_number);
    formData.append('financial_start_date', payload.financial_start_date);
    formData.append('business_years', payload.business_years);
    formData.append('sector', payload.sector);
    formData.append('user_role', payload.user_role);
    formData.append('size', payload.size);
    formData.append('current_method', payload.current_method);
    formData.append('purpose', payload.purpose);
    formData.append('email', payload.email);
    formData.append('country_code', payload.country_code);
    formData.append('mobile', payload.mobile);
    formData.append('trn', payload.trn);

    return axiosInstance
        .patch(`/user/customer/companies/${id}`, formData)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
};

export const getCompany = async () =>
    axiosInstance
        .get<CompanyResponse>(`/user/customer/companies/company`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getTempCompany = async () =>
    axiosInstance
        .get<CompanyResponse>(`/user/customer/companies/temp-company`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const updateCompanyLogo = async ({ id, file }: { id: string; file: File }) => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosInstance
        .patch(`/user/customer/companies/${id}/image`, formData)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
};

export const getLicenseExpiry = async () =>
    axiosInstance
        .get<any>(`/user/customer/companies/expiry`)
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
}) =>
    axiosInstance
        .get<any>(`/user/customer/tasks`, { params: payload })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
