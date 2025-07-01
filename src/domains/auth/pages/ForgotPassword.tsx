import { useAppSelector } from '@src/hooks/store';

import AuthFooter from '../components/common/AuthFooter';
import ForgotPasswordCarousel from '../components/forgotPassword/ForgotPasswordCarousel';
import ForgotPasswordStepOneHeader from '../components/forgotPassword/ForgotPasswordStepOneHeader';
import ForgotPasswordStepTwoHeader from '../components/forgotPassword/ForgotPasswordStepTwoHeader';
import ForgotPasswordStepOneForm from '../components/forms/ForgotPasswordStepOneForm';
import ForgotPasswordStepTwoForm from '../components/forms/ForgotPasswordStepTwoForm';

function ForgotPassword() {
    document.title = 'Forgot Password | GoZupees';
    const currentStep = useAppSelector(state => state.forgotPassword.step);

    return (
        <div className="md:h-dvh flex flex-col-reverse md:flex-row">
            <ForgotPasswordCarousel />
            <div className="w-full md:w-[600px] h-full flex flex-col items-center p-4">
                <div className="flex-grow w-[360px] flex flex-col justify-center mt-12 md:mt-0">
                    {currentStep === 1 && <ForgotPasswordStepOneHeader />}
                    {currentStep === 2 && <ForgotPasswordStepTwoHeader />}
                    <div className="mt-4 gap-8">
                        {currentStep === 1 && <ForgotPasswordStepOneForm />}
                        {currentStep === 2 && <ForgotPasswordStepTwoForm />}
                        {/* <SocialButtons /> */}
                        {/* <div className="flex items-center justify-center my-4">
                            <h2 className="text-sm">Don’t have an account?</h2>
                            <Link className="text-sm text-primary ml-1" to="/plan">
                                Sign up
                            </Link>
                        </div> */}
                    </div>
                </div>
                <AuthFooter />
            </div>
        </div>
    );
}

export default ForgotPassword;
