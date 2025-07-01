import { NextUIProvider } from '@nextui-org/system';
import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Toaster } from 'sonner';

import errorIcon from '@assets/icons/error.svg';
import infoIcon from '@assets/icons/info.svg';
import successIcon from '@assets/icons/success.svg';
import ErrorFallback from '@components/molecular/ErrorFallback';
import ProgressBar from '@components/molecular/ProgressBar';
import { useAppSelector } from '@hooks/store';
import PersistState from '@layouts/components/PersistState';
import { store } from '@store/store';

import Router from './routes';

function ReactQueryProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                placeholderData: keepPreviousData,
                refetchOnWindowFocus: false,
                enabled: isAuthenticated,
                staleTime: 60_000,
            },
        },
    });
    return <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>;
}

function NextProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    return <NextUIProvider navigate={navigate}>{children}</NextUIProvider>;
}

export default function Providers() {
    const toastIcons = {
        success: <ReactSVG className="text-success" src={successIcon} />,
        error: <ReactSVG className="text-danger" src={errorIcon} />,
        info: <ReactSVG className="text-warning" src={infoIcon} />,
    };

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ReduxProvider store={store}>
                <BrowserRouter> {/* ✅ Must come first for routing to work */}
                    <PersistState> {/* ✅ Now this can safely use useNavigate */}
                        <ReactQueryProvider>
                            <NextProvider>
                                <main className="bg-background text-foreground">
                                    <Router />
                                </main>
                                <ProgressBar />
                            </NextProvider>
                            <Toaster icons={toastIcons} position="bottom-center" />
                            <ReactQueryDevtools
                                buttonPosition="bottom-left"
                                initialIsOpen={false}
                                position="bottom"
                            />
                        </ReactQueryProvider>
                    </PersistState>
                </BrowserRouter>
            </ReduxProvider>
        </ErrorBoundary>
    );
}

