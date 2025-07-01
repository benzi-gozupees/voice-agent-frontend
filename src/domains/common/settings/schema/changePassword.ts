import * as Yup from 'yup';
import zxcvbn from 'zxcvbn';

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

const changePassword = Yup.object().shape({
    curr_pass: Yup.string().required('Please enter your current password'),
    new_pass: Yup.string()
        .required('Please enter a new password')
        .notOneOf([Yup.ref('curr_pass')], 'New password must be different from current password')
        .test('password-strength', function (value) {
            const check = passwordStrengthCheck(value || '');
            if (!check.valid) {
                return this.createError({ message: check.message });
            }
            return true;
        }),
    confirm_pass: Yup.string()
        .oneOf([Yup.ref('new_pass')], 'Passwords must match')
        .required('Please confirm your new password'),
});

export default changePassword;
