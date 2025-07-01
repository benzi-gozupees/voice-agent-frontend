import { Spacer } from '@nextui-org/react';

import Error404 from '@assets/images/error-404.svg?react';

export default function Error503() {
    return (
        <div className="flex flex-col justify-center items-center gap-2 min-h-screen py-16 px-1">
            <Error404 width={400} />
            <Spacer y={2} />
            <p className="text-3xl font-semibold">
                Sorry, Something went wrong. Please try again later.
            </p>
            <Spacer y={4} />
            {/* <Button href="/dashboard" color="primary" size="lg">
                Go to Dashboard
            </Button> */}
        </div>
    );
}
