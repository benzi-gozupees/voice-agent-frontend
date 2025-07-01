import { useEffect, useRef, useState } from 'react';

import { Image, Progress } from '@nextui-org/react';
import { MutateFunction, useMutation } from '@tanstack/react-query';
import axios, { CancelTokenSource } from 'axios';
import { pdfjs } from 'react-pdf';
import { ReactSVG } from 'react-svg';
import { toast } from 'sonner';

import contentIcon from '@assets/icons/content.svg';
import { useAppSelector } from '@hooks/store';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import RenderPdf from './RenderPdf';

pdfjs.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';

interface FileWithId extends File {
    id: string;
}

type Props = {
    open: () => void;
    files: FileWithId[];
    setFiles: (files: FileWithId[]) => void;
    mutationFn: MutateFunction<any, any, any, any>;
    onSuccess: (res: any) => void;
};

export default function FileDisplay({ open, files, setFiles, mutationFn, onSuccess }: Props) {
    const { mutate, isPending } = useMutation({
        mutationFn,
        onSuccess: res => {
            setFiles([]);
            onSuccess(res);
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Something went wrong';
            toast.error(message);
            setFiles([]);
        },
    });

    const [progress, setProgress] = useState(0);
    const startTimeRef = useRef<number>(0);
    const cancelTokenRef = useRef<CancelTokenSource>(axios.CancelToken.source());
    const { _id } = useAppSelector(state => state.company);
    useEffect(() => {
        if (files.length > 0) {
            startTimeRef.current = new Date().getTime();
            mutate({
                file: files[0],
                company: _id,
                progressCallback: setProgress,
                cancelToken: cancelTokenRef.current,
            });
        }
    }, [files]);

    const renderBody = (file: File) => {
        if (!file) return null;
        if (file.type.includes('image')) {
            return (
                <Image
                    alt="Invoice"
                    className="object-cover"
                    height={200}
                    radius="none"
                    src={URL.createObjectURL(file)}
                    width={200}
                />
            );
        }
        if (file.type.includes('pdf')) {
            return <RenderPdf file={file as FileWithId} />;
        }
        return (
            <div className="h-[184px] flex justify-center items-center text-sm">
                <ReactSVG className="text-default-300" height={48} src={contentIcon} width={48} />
            </div>
        );
    };

    const removeFile = (id: string) => {
        setFiles(files.filter((f: FileWithId) => f.id !== id));
    };

    if (files.length === 0) return null;

    return (
        <div className="border rounded relative">
            <div className="rounded overflow-hidden">{renderBody(files[0])}</div>
            <div className="absolute bottom-0 w-full">
                <div className="w-full border-t bg-default-100 p-2 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-xs line-clamp-1">Uploading...</span>
                    </div>
                    <Progress isDisabled size="sm" value={progress} />
                </div>
            </div>
        </div>
    );
}
