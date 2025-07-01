/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import OTPInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import Button from '@components/atomic/Button';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';

import { resendOTP, verifyOTPAndResetPassword } from '../../api/authApi';
import { forgotPasswordPreviousStep, forgotPasswordReset } from '../../slices/forgotPasswordSlice';

function ForgotPasswordStepTwoForm() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [resendDisabled, setResendDisabled] = useState(true);
    const { email, new_password } = useAppSelector(state => state.forgotPassword);
    const dispatch = useAppDispatch();

    const { mutate, isPending } = useMutation({
        mutationFn: resendOTP,
        onSuccess: (res: any) => {
            if (res) {
                toast.success(res?.message);
            }
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message || 'Something went wrong. Please try again later.';
            toast.error(message);
        },
    });

    const {
        mutate: verifyAndSubmitMutate,
        isPending: verifyAndSubmitIsPending,
        isError,
    } = useMutation({
        mutationFn: (values: any) => verifyOTPAndResetPassword(values),
        onSuccess: (res: any) => {
            if (res) {
                setOtp('');
                dispatch(forgotPasswordReset());
                toast.success(res?.message);
                navigate('/login');
            }
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message || 'Something went wrong. Please try again later.';
            toast.error(message);
        },
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeRemaining > 0) {
                setTimeRemaining(time => time - 1);
            } else {
                setResendDisabled(false);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeRemaining]);

    const handlePrevious = () => {
        dispatch(forgotPasswordPreviousStep());
    };

    const formatTime = (seconds: any) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleResendOTP = () => {
        setOtp('');
        mutate({ email });
        setTimeRemaining(120);
        setResendDisabled(true);
    };

    const handleVerifyAndSubmit = () => {
        if (otp.length < 4) {
            toast.error('Please enter a valid OTP');
            return;
        }
        verifyAndSubmitMutate({ otp, email, new_password });
    };

    return (
        <div className="">
            <div className="my-2">
                <OTPInput
                    containerStyle={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                    inputStyle={{
                        display: 'inline-flex',
                        flex: 1,
                        backgroundColor: 'whitesmoke',
                    }}
                    numInputs={4}
                    renderInput={(props, index) => (
                        <input
                            {...props}
                            className={`border border-gray-300 h-[60px]  rounded-md ${isError ? 'border-red-500' : ''}`}
                        />
                    )}
                    renderSeparator={<span>&nbsp; </span>}
                    value={otp}
                    onChange={setOtp}
                />
            </div>

            <Button
                className="w-full"
                color="primary"
                isLoading={verifyAndSubmitIsPending}
                onClick={handleVerifyAndSubmit} // Now passes the correct function
            >
                Verify and Submit
            </Button>

            <div className="w-full flex items-center justify-between">
                <p className="text-primary">{formatTime(timeRemaining)}</p>
                <Button
                    className={`bg-0 px-0 text-md font-medium ${resendDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    color="default"
                    isDisabled={resendDisabled}
                    isLoading={isPending}
                    onClick={resendDisabled ? undefined : handleResendOTP} // Simplified condition
                >
                    Resend OTP
                </Button>
            </div>

            <div className="flex sm:cursor-pointer items-center justify-center">
                <Link className="bg-0 text-primary" to="/forgot-password" onClick={handlePrevious}>
                    Go Back
                </Link>
            </div>
        </div>
    );
}

export default ForgotPasswordStepTwoForm;
