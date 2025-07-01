import { Link } from 'react-router-dom';

import AuthFooter from '../components/common/AuthFooter';
import LoginForm from '../components/forms/LoginForm';
import LoginCarousel from '../components/login/LoginCarousel';
import LoginHeader from '../components/login/LoginHeader';

function Login() {
    document.title = 'Welcome to GoZupees';
    const renderLoginBody = () => (
        <div className="mt-4 gap-8">
            <div className="flex flex-col gap-24">
                <h5 className="text-sm text-center align-middle">Sign in to continue to GoZupees.</h5>
            </div>
            <LoginForm />

            {import.meta.env.VITE_SIGNUP_DISABLED !== 'true' ? (
                <div className="flex items-center justify-center my-4">
                    <h2 className="text-sm">Don’t have an account?</h2>

                    <Link className="text-sm text-primary ml-1" to="/register">
                        Sign up
                    </Link>
                </div>
            ) : null}
        </div>
    );

    return (
        <div className="h-dvh flex flex-col-reverse md:flex-row">
            <LoginCarousel />
            <div className="w-full lg:w-[600px] h-full flex flex-col items-center p-4">
                <div className="flex-grow w-[300px] xs:w-[360px] flex flex-col justify-center">
                    <LoginHeader />
                    {renderLoginBody()}
                </div>
                <AuthFooter />
            </div>
        </div>
    );
}

export default Login;
