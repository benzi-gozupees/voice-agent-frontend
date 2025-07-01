import { useEffect, useState } from 'react';

import { NProgress } from '@tanem/react-nprogress';
import { useIsFetching } from '@tanstack/react-query';

function ProgressContainer({ isAnimating }: { isAnimating: boolean }) {
    return (
        <NProgress isAnimating={isAnimating}>
            {({ isFinished, progress }) => (
                <div
                    className={`fixed top-0 w-full z-50 bg-default-100 ${isFinished ? 'hidden' : ''}`}
                >
                    <div
                        className="h-[3px] bg-primary transition-width"
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>
            )}
        </NProgress>
    );
}

function ProgressBar() {
    const isFetching = useIsFetching();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isFetching > 0) {
            setIsAnimating(true);
        } else {
            setIsAnimating(false);
        }
    }, [isFetching]);

    return <ProgressContainer isAnimating={isAnimating} />;
}

export default ProgressBar;
