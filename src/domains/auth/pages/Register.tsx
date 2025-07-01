import { Link } from 'react-router-dom';

import AuthFooter from '../components/common/AuthFooter';
import RegisterForm from '../components/forms/RegisterForm';
import RegisterCarousel from '../components/register/RegisterCarousel';
import RegisterHeader from '../components/register/RegisterHeader';

function Register() {
    document.title = 'Create a new account with GoZupees';
    return (
        <div className="md:min-h-dvh flex justify-center h-screen flex-col-reverse md:flex-row">
            <RegisterCarousel />
            <div className="w-full md:w-[600px] flex flex-col items-center py-4">
                <div className="flex-grow w-[360px] flex flex-col justify-center mt-12 md:mt-0">
                    <RegisterHeader />
                    <div className="mt-1 gap-8">
                        <RegisterForm />
                        {/* <SocialButtons /> */}
                        <div className="flex items-center justify-center my-2">
                            <h2 className="text-sm">Already have an account?</h2>
                            <Link className="text-sm text-primary ml-1" to="/login">
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
                <AuthFooter />
            </div>
        </div>
    );
}

export default Register;
