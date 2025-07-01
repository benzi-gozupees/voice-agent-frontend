import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

import TickIcon from '@assets/icons/tick-green.svg?react';

import { addRawExpense } from '../api';

import PdfDropzone from './PdfDropzone';

type ExpenseUploadProps = {
    onSuccess: (id: string[]) => void;
};

export default function ExpenseUpload({ onSuccess }: ExpenseUploadProps) {
    const queryClient = useQueryClient();
    const [status, setStatus] = useState('ready');

    useEffect(() => {
        if (status === 'upload-success') {
            setTimeout(() => setStatus('ready'), 3000);
        }
    }, [status]);

    const renderBody = () => {
        if (status === 'ready')
            return (
                <div className="h-full flex flex-col gap-4">
                    <PdfDropzone
                        mutationFn={addRawExpense}
                        title="Upload Expense"
                        onSuccess={res => {
                            queryClient.invalidateQueries({
                                queryKey: ['allExpenses'],
                            });
                            queryClient.invalidateQueries({
                                queryKey: ['allRawExpenses'],
                            });
                            queryClient.invalidateQueries({
                                queryKey: ['serviceLimitations'],
                            });
                            queryClient.invalidateQueries({
                                queryKey: ['dashboardStats'],
                            });
                            queryClient.invalidateQueries({
                                queryKey: ['expenseHealthCheckStats'],
                            });
                            setStatus('upload-success');
                            onSuccess([res.data._id]);
                        }}
                    />
                    <span className="text-sm text-default-500">
                        Only support .jpg, .png, .doc, and .pdf files
                    </span>
                </div>
            );

        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <TickIcon height={48} width={48} />
                <p className="text-lg">Uploaded</p>
                <p className="text-sm text-default-500 text-center w-[80%]">
                    Your expense uploaded successfully, for removing go to raw expense list
                </p>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-4 border p-4 rounded-2xl h-full">
            <div>
                <p className="font-semibold text-medium">Drag and drop</p>
                <p className="text-sm">Receipt, Invoice, or Bank Statement</p>
            </div>
            <div className="flex-grow">
                <AnimatePresence>
                    <motion.div
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full h-full"
                        exit={{ opacity: 0, scale: 0.8 }}
                        initial={{ opacity: 0, scale: 1 }}
                        transition={{ duration: 0.1 }}
                    >
                        {renderBody()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
