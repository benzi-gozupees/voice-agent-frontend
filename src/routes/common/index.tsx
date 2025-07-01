import CookiePolicy from '@domains/common/legalPolicies/cookiePolicy/CookiePolicy';
import PrivacyPolicy from '@domains/common/legalPolicies/privacyPolicy/PrivacyPolicy';
import RefundPolicy from '@domains/common/legalPolicies/refundPolicy/RefundPolicy';
import Terms from '@domains/common/legalPolicies/terms/Terms';

export const commonRoutes = [
    { path: '/privacy', element: <PrivacyPolicy /> },
    { path: '/agreement', element: <Terms /> },
    { path: '/cookie-policy', element: <CookiePolicy /> },
    { path: '/refund-policy', element: <RefundPolicy /> },
];
