import * as Yup from 'yup';
import zxcvbn from 'zxcvbn';

const emailRegex = /^[a-zA-Z0-9._%+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordStrengthCheck = (password: string) => {
    const result = zxcvbn(password);
    if (result.score < 3) {
        const { feedback } = result;
        const suggestions = feedback.suggestions.join(' ');
        const { warning } = feedback;
        return {
            valid: false,
            message: warning || suggestions || 'Password is too weak',
        };
    }
    return { valid: true };
};

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Please enter Email ID')
        .matches(emailRegex, 'Please enter valid Email ID'),
    password: Yup.string().required('Please enter Password'),
    remember: Yup.boolean().optional(),
});

export const registerSchema = Yup.object().shape({
    name: Yup.string().trim().required('Please enter Name'),
    email: Yup.string()
        .trim()
        .required('Please enter Email ID')
        .matches(emailRegex, 'Please enter valid Email ID'),
    password: Yup.string()
        .trim()
        .required('Please enter a Password')
        .test('password-strength', function (value) {
            const check = passwordStrengthCheck(value || '');
            if (!check.valid) {
                return this.createError({ message: check.message });
            }
            return true;
        }),
    confirm_password: Yup.string()
        .trim()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
    // role: Yup.string().required('Please select Role'),
    partner: Yup.string().optional(),
    terms: Yup.boolean().oneOf([true], 'Please accept Terms & Conditions'),
});

export const accountantSchema = registerSchema.concat(
    Yup.object().shape({
        skills: Yup.array().of(Yup.string().trim().required('Please enter Skill')),
        expertise: Yup.array().of(Yup.string().trim().required('Please enter Expertise')),
        experience: Yup.number()
            .required('Please enter Experience')
            .min(0, 'Experience must be at least 0 years'),
    })
);

export const forgotPasswordStepOneSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter valid email ID')
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter valid email')
        .max(40, 'Email must be at most 40 characters')
        .required('Please enter email ID'),
    new_password: Yup.string()
        .trim()
        .required('Please enter your new password')
        .test('password-strength', function (value) {
            const check = passwordStrengthCheck(value || '');
            if (!check.valid) {
                return this.createError({ message: check.message });
            }
            return true;
        }),
    confirm_password: Yup.string()
        .trim()
        .required('Please confirm your password')
        .oneOf([Yup.ref('new_password'), ''], 'Passwords must match'),
});
