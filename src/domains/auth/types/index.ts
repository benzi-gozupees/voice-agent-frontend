export type LoginRequest = {
    email: string;
    password: string;
    remember: boolean;
};

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
    trn: string;
    invoice_email: string;
    chat_id: string;
}

export type LoginResponse = {
  id: number;
  email: string;
  company_name: string;
  contact_number: string;
  token: string;
  refresh_token: string;
  user_profile_image: string;
  country: string;
  role: string;
  status: string;
};

export type RegisterRequest = {
    name: string;
    role: string;
    email: string;
    password: string;
};

export type Plan = {
    _id: string;
    title: string;
    description: string;
    price: number;
    offer_price?: number;
    available_benefits: string[];
    unavailable_benefits: string[];
    limitations: Limitation[];
    duration: string;
    stripe_price_id: string;
    stripe_product_id: string;
    created_at: string;
    updated_at: string;
};

export type Limitation = {
    name: string;
    is_available: boolean;
    is_unlimited: boolean;
    count: number;
};

export type DirectLoginRequest = {
    token: string;
    redirectURL?: string;
    sessionId: string;
};

export type AutoLoginRequest = {
    name: string;
    countryCode: string;
    mobileNo: string;
    email: string;
    contactPersonName: string;
};
