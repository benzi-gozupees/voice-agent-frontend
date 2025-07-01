import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { useLocation } from 'react-router-dom';

interface ProgressContextType {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    progress: number;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

function ProgressProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isLoading) {
            setProgress(5);
            const interval = setInterval(() => {
                setProgress(prev => Math.min(prev + 5, 90));
            }, 300);
            return () => {
                clearInterval(interval);
            };
        }
        setProgress(100);
        setTimeout(() => setProgress(0), 300);
        return () => {};
    }, [isLoading]);

    const location = useLocation();
    const { pathname } = location;
    useEffect(() => {
        setProgress(100);
        setTimeout(() => setProgress(0), 300);
    }, [pathname]);

    const contextValue = useMemo(
        () => ({
            isLoading,
            setIsLoading,
            progress,
        }),
        [isLoading, progress]
    );

    return <ProgressContext.Provider value={contextValue}>{children}</ProgressContext.Provider>;
}

const useProgressbar = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};

export { ProgressProvider, useProgressbar };

function useProgress(isRefetching: boolean) {
    const { setIsLoading } = useProgressbar();
    useMemo(() => {
        setIsLoading(isRefetching);
    }, [isRefetching]);
}

export default useProgress;
