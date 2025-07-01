import { FallbackProps } from 'react-error-boundary';

import Error503 from '@src/pages/Error503';

export default function index({ error, resetErrorBoundary }: FallbackProps) {
    if (import.meta.env.MODE !== 'development') {
        return <Error503 />;
    }
    return (
        <div className="border-1 rounded shadow-lg p-2 m-4">
            <h4 className="text-danger">{error?.message}</h4>
            <pre className="mt-4 text-body whitespace-break-spaces">{error?.stack.toString()}</pre>
            <div className="m-4 flex">
                <button
                    className="btn btn-danger border-2 rounded-lg px-4 py-1 text-sm font-medium"
                    type="button"
                    onClick={resetErrorBoundary}
                >
                    Reload
                </button>
            </div>
        </div>
    );
}
