import React, { Suspense } from 'react';

import SplashScreen from '@components/molecular/SplashScreen';

const Providers = React.lazy(() => import('./Providers'));

export default function App() {
    return (
        <Suspense fallback={<></>}>
            <Providers />
        </Suspense>
    );
}
