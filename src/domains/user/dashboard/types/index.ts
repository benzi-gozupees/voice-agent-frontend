export type CreateCompanyRequest = {
    name: string;
    currency: string;
    language: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    tax_number: string;
    financial_start_date: any;
    business_years: string;
    license_expiry: any;
    license_issue_date: any;
    sector: string;
    user_role: string;
    size: string;
    current_method: string;
    purpose: string;
    email: string;
    country_code: string;
    mobile: string;
    license_number: string;
    license_authority: string;
    trn: string;
    license: File[];
    _id?: string;
};

export type UpdateCompanyRequest = {
    _id?: string;
    name: string;
    currency: string;
    language: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    tax_number: string;
    financial_start_date: any;
    business_years: string;
    sector: string;
    user_role: string;
    size: string;
    current_method: string;
    purpose: string;
    email: string;
    country_code: string;
    mobile: string;
    trn: string;
};

export type Company = {
    _id: string;
    user: string;
    name: string;
    currency: string;
    language: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    tax_number: string;
    financial_start_date: string;
    business_years: string;
    license_expiry: string;
    sector: string;
    user_role: string;
    size: string;
    current_method: string;
    purpose: string;
    email: string;
    country_code: string;
    mobile: string;
    license: string;
    logo: string;
    license_number: string;
    license_authority: string;
    trn: string;
    invoice_email: string;
    status: string;
    created_at: string;
    updated_at: string;
    is_default: boolean;
    wafeq_key: string;
    zoho_org_id: string;
    zoho_tokens: {
        token: string;
        refresh_token: string;
    };
    chat_id: string;
};

export type CompanyResponse = {
    company: Company;
};

export type AllCompaniesResponse = {
    companies: Company[];
    total: number;
};

export type ChangeDefaultCompanyResponse = Company;
