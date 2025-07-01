import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { pathname } = useLocation();
    if (['/chat', '/accountant/chat'].includes(pathname)) return null;
    return (
        <div className="hidden lg:flex justify-center xl:justify-between items-center flex-wrap gap-2 text-gray-500 text-tiny p-6 px-8">
            <span className="whitespace-nowrap text-center">
                © {currentYear} GoZupees AI Voice Agent. All Rights Reserved
            </span>
            <div className="divide-x-1 divide-secondary [&>*]:px-2 text-center text-secondary">
                <Link target="_blank" to="/agreement">
                    GoZupees Platform Agreement
                </Link>
                <Link target="_blank" to="/privacy">
                    Privacy Policy
                </Link>
                <Link target="_blank" to="/refund-policy">
                    Refund Policy
                </Link>
                <Link target="_blank" to="/cookie-policy">
                    Cookie Policy
                </Link>
            </div>
        </div>
    );
}
