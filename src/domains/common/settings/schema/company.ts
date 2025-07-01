import * as Yup from 'yup';

export const AddCompanySchema = {
    stepOne: Yup.object().shape({
        name: Yup.string().trim().required('Name is required'),
        currency: Yup.string().trim().required('Currency is required'),
        language: Yup.string().trim().required('Language is required'),
        address: Yup.string().trim().required('Address is required'),
        city: Yup.string().trim().required('City is required'),
        state: Yup.string().trim().required('State is required'),
        zip_code: Yup.string().trim().required('Zip code is required'),
        country: Yup.string().trim().required('Country is required'),
        email: Yup.string().trim().email('Invalid email format').required('Email is required'),
        mobile: Yup.string().trim().required('Mobile is required'),
    }),
    stepTwo: Yup.object().shape({
        tax_number: Yup.string().trim().required('Tax number is required'),
        financial_start_date: Yup.date().required('Financial start date is required'),
        license_expiry: Yup.date().required('License expiry date is required'),
        license_issue_date: Yup.date().required('License issue date is required'),
        sector: Yup.string().trim().required('Sector is required'),
        user_role: Yup.string().trim().required('User role is required'),
        business_years: Yup.string().trim().required('Business years is required'),
        size: Yup.string().trim().required('Size is required'),
        current_method: Yup.string().trim().required('Current method is required'),
        purpose: Yup.string().trim().required('Activity is required'),
        license: Yup.mixed().test('license', 'License is required', (value: any) => {
            if (!value) return false;
            return value.length > 0;
        }),
        license_number: Yup.string().trim().required('License number is required'),
        license_authority: Yup.string().trim().required('Licensing authority is required'),
        trn: Yup.string().trim().required('TRN number is required'),
    }),
};

export const EditCompanySchema = {
    stepOne: Yup.object().shape({
        name: Yup.string().trim().required('Name is required'),
        currency: Yup.string().trim().required('Currency is required'),
        language: Yup.string().trim().required('Language is required'),
        address: Yup.string().trim().required('Address is required'),
        city: Yup.string().trim().required('City is required'),
        state: Yup.string().trim().required('State is required'),
        zip_code: Yup.string().trim().required('Zip code is required'),
        country: Yup.string().trim().required('Country is required'),
        email: Yup.string().trim().email('Invalid email format').required('Email is required'),
        mobile: Yup.string().trim().required('Mobile is required'),
    }),
    stepTwo: Yup.object().shape({
        name: Yup.string().trim().required('Name is required'),
        currency: Yup.string().trim().required('Currency is required'),
        language: Yup.string().trim().required('Language is required'),
        address: Yup.string().trim().required('Address is required'),
        city: Yup.string().trim().required('City is required'),
        state: Yup.string().trim().required('State is required'),
        zip_code: Yup.string().trim().required('Zip code is required'),
        country: Yup.string().trim().required('Country is required'),
        tax_number: Yup.string().trim().required('Tax number is required'),
        financial_start_date: Yup.date().required('Financial start date is required'),
        sector: Yup.string().trim().required('Sector is required'),
        user_role: Yup.string().trim().required('User role is required'),
        business_years: Yup.string().trim().required('Business years is required'),
        size: Yup.string().trim().required('Size is required'),
        current_method: Yup.string().trim().required('Current method is required'),
        purpose: Yup.string().trim().required('Activity is required'),
        trn: Yup.string().trim().required('TRN number is required'),
        // .test('fileFormat', 'Please choose Image or Document files', (value:any) => {
        //     if (!value) return true;
        //     return value.type.startsWith('image/') || value.type.startsWith('application/');
        // }),
    }),
};
