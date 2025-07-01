import { ReactSVG } from 'react-svg';

import logo from '@assets/icons/logo.svg';

type Props = {};

function RegisterHeader(props: Props) {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="mb-8 mt-1">
                <ReactSVG className="w-full h-full" src={logo} />
            </div>
            <h4 className="text-3xl font-semibold pb-2">Welcome!</h4>
            <div className="flex flex-col gap-20">
                {/* <Image src={logo} alt="logo" preview={false} width={180} className="-mb-8 ml-6" /> */}
                <h5 className="text-sm text-center align-middle">Create an account with GoZupees.</h5>
            </div>
        </div>
    );
}

export default RegisterHeader;
