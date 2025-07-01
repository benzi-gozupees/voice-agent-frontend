import { ReactSVG } from 'react-svg';

import logo from '@assets/icons/logo.svg';

type Props = {};

function ForgotPasswordStepTwoHeader(props: Props) {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="mb-14">
                <ReactSVG className="w-full h-full" src={logo} />
            </div>
            <h4 className="text-3xl font-semibold pb-2">OTP Verification</h4>
            <div className="flex flex-col gap-24">
                {/* <Image src={logo} alt="logo" preview={false} width={180} className="-mb-8 ml-6" /> */}
                <h5 className="text-sm text-center align-middle">
                    An OTP has been sent to your email, Please verify.
                </h5>
            </div>
        </div>
    );
}

export default ForgotPasswordStepTwoHeader;
