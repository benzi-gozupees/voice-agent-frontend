import * as Yup from 'yup';

export const bank_accountSchema = Yup.object().shape({
    account_holder_name: Yup.string()
        .required('Account holder name is required')
        .min(2, 'Account holder name must be at least 2 characters')
        .max(25, 'Account holder name must be at most 100 characters'),
    bank_name: Yup.string()
        .required('Bank name is required')
        .min(2, 'Bank name must be at least 2 characters')
        .max(25, 'Bank name must be at most 100 characters'),
    account_no: Yup.string()
        .required('Account number is required')
        .min(2, 'Bank name must be at least 2 characters')
        .max(25, 'Bank name must be at most 100 characters'),
    code: Yup.string()
        .required('Code is required')
        .min(3, 'Code must be at least 3 characters')
        .max(15, 'Code must be at most 15 characters'),
    isDefault: Yup.boolean().optional(),
});
