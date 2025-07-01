/* eslint-disable import/no-extraneous-dependencies */
import { useMutation } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import Button from '@components/atomic/Button';
import Input from '@components/atomic/Input';
import PasswordInput from '@components/atomic/PasswordInput';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';

import { forgotPassword } from '../../api/authApi';
import { forgotPasswordStepOneSchema } from '../../schema';
import { forgotPasswordNextStep, forgotPasswordReset } from '../../slices/forgotPasswordSlice';

type Props = {};

function ForgotPasswordStepOneForm(props: Props) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { email, new_password } = useAppSelector(state => state.forgotPassword);

    const { mutate, isPending } = useMutation({
        mutationFn: values => forgotPassword(values),
        onSuccess: (res: any, values: any) => {
            if (res) {
                dispatch(forgotPasswordNextStep(values));
                toast.success(res?.message);
            }
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message || 'Something went wrong. Please try again later.';
            toast.error(message);
        },
    });

    const handleSubmit = (values: any) => {
        mutate(values); // This ensures that the form values are passed to mutate
    };

    const handleBackToLogin = () => {
        dispatch(forgotPasswordReset());
    };

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    email: email || '',
                    new_password: new_password || '',
                    confirm_password: '',
                }}
                validationSchema={forgotPasswordStepOneSchema}
                onSubmit={handleSubmit}
            >
                {({ isValid }) => (
                    <Form className="mt-4 pt-2">
                        <div className="flex flex-col gap-4">
                            <Input
                                isRequired
                                label="Email"
                                name="email"
                                placeholder="Enter your email"
                                type="email"
                            />
                            <PasswordInput
                                isRequired
                                label="New Password"
                                name="new_password"
                                placeholder="Enter your new password"
                                type="password"
                            />
                            <PasswordInput
                                isRequired
                                label="Confirm Password"
                                name="confirm_password"
                                placeholder="Confirm your new pasword"
                                type="password"
                            />

                            <Button
                                color="primary"
                                disabled={!isValid}
                                isLoading={isPending}
                                type="submit"
                            >
                                Get OTP
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
            <Link
                className="flex items-center mt-2 justify-center
         pt-2 text-primary cursor-pointer"
                to="/login"
                onClick={() => handleBackToLogin()}
            >
                Back to log in
            </Link>
        </>
    );
}

export default ForgotPasswordStepOneForm;
