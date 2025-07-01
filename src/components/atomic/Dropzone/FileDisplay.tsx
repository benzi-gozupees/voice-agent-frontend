import { useEffect, useRef, useState } from 'react';

import { Image } from '@nextui-org/react';
import { useField } from 'formik';
import { pdfjs } from 'react-pdf';
import { ReactSVG } from 'react-svg';

import contentIcon from '@assets/icons/content.svg';
import closeIcon from '@assets/icons/crossRed.svg';
import plusIcon from '@assets/icons/plus.svg';
import Pagination from '@components/atomic/Pagination';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import Button from '../Button';

import RenderPdf from './RenderPdf';

pdfjs.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';

interface FileWithId extends File {
    id: string;
}

type Props = {
    open: () => void;
};

export default function FileDisplay({ open }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [taskAdded, setTaskAdded] = useState(false);

    const renderBody = (file: File) => {
        if (!file) return null;
        if (file.type.includes('image')) {
            return (
                <Image
                    alt="Invoice"
                    className="object-cover"
                    height={184}
                    radius="none"
                    src={URL.createObjectURL(file)}
                    width={130}
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

    const [field, _, helpers] = useField('file');
    const { value: files } = field;
    const removeFile = (id: string) => {
        helpers.setValue(files.filter((f: FileWithId) => f.id !== id));
    };

    const scrollToEnd = () => {
        const scrollableDiv = scrollRef.current;
        if (scrollableDiv) {
            scrollableDiv.scrollTo({
                left: scrollableDiv.scrollWidth,
                behavior: 'smooth',
            });
        }
    };

    const scrollToPosition = (it: number) => {
        const scrollableDiv = scrollRef.current;
        if (scrollableDiv) {
            const offset = (scrollRef.current.scrollWidth / files.length) * (it - 1);
            scrollableDiv.scrollTo({
                left: offset,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        if (taskAdded) {
            scrollToEnd();
            setTaskAdded(false);
        }
    }, [taskAdded]);

    if (files.length === 0) return null;

    return (
        <>
            <div ref={scrollRef} className="w-full mx-1 overflow-x-hidden">
                <div className="flex justify-center gap-4 py-6">
                    {files.map((file: FileWithId) => (
                        <div
                            key={file.id}
                            className="relative rounded-2xl border shadow-md p-4 pb-1"
                        >
                            <div className="rounded-lg shadow-xl overflow-hidden">
                                {renderBody(file)}
                            </div>
                            <span className="mt-1 w-[130px] line-clamp-1 text-sm text-wrap">
                                {file.name}
                            </span>
                            <ReactSVG
                                className="absolute -top-2 -right-2 cursor-pointer text-danger"
                                height={24}
                                src={closeIcon}
                                width={24}
                                onClick={() => removeFile(file.id)}
                            />
                        </div>
                    ))}
                    <div className="">
                        <Button
                            className="group h-[230px] border-2 border-dashed rounded-2xl flex justify-center items-center px-8 hover:border-primary"
                            color="text"
                            onClick={() => {
                                open();
                            }}
                        >
                            <ReactSVG
                                className="text-default-500 group-hover:text-primary"
                                height={24}
                                src={plusIcon}
                                width={24}
                            />
                        </Button>
                    </div>
                </div>
            </div>
            <Pagination
                color="dots"
                dotsJump={10}
                hidden={files.length <= 1}
                radius="full"
                showControls={false}
                size="sm"
                total={files.length}
                onChange={scrollToPosition}
            />
        </>
    );
}
