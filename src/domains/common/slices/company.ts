import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Company {
    _id: string;
    user: string;
    name: string;
    language: string;
    currency: string;
    tax_number: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    financial_start_date: string;
    logo: string;
    sector: string;
    user_role: string;
    business_years: string;
    size: string;
    current_method: string;
    purpose: string;
    email: string;
    mobile: string;
    status: string;
    created_at: string;
    updated_at: string;
    country_code: string;
    license_expiry: string;
    license: string;
    license_authority: string;
    license_number: string;
    invoice_email: string;
    trn: string;
    wafeq_key?: string;
    zoho_org_id?: string;
    zoho_tokens?: {
        token: string;
        refresh_token: string;
    };
    chat_id: string;
}

const initialState: Company = {
    _id: '',
    user: '',
    name: '',
    language: '',
    currency: 'AED',
    tax_number: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    financial_start_date: '',
    logo: '',
    sector: '',
    user_role: '',
    business_years: '',
    size: '',
    current_method: '',
    purpose: '',
    email: '',
    mobile: '',
    status: '',
    created_at: '',
    updated_at: '',
    country_code: '',
    license_expiry: '',
    license: '',
    license_authority: '',
    license_number: '',
    invoice_email: '',
    trn: '',
    wafeq_key: '',
    zoho_org_id: '',
    zoho_tokens: {
        token: '',
        refresh_token: '',
    },
    chat_id: '',
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompany: (state, action: PayloadAction<Company>) => {
            Object.assign(state, { ...initialState, ...action.payload });
        },
    },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;
