import { ReactSVG } from 'react-svg';

import logo from '@assets/icons/gozupees-logo.png';

function LoginHeader() {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex mb-2 bg-black rounded-lg">
                <img src={logo} alt="Gozupees Logo" className="w-full h-full object-contain" />
            </div>
            <h4 className="text-3xl font-semibold pb-2">Welcome Back</h4>
        </div>
    );
}

export default LoginHeader;
