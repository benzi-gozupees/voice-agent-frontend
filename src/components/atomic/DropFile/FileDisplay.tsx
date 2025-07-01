import { Image } from '@nextui-org/react';
import { useField, useFormikContext } from 'formik';
import { pdfjs } from 'react-pdf';
import { ReactSVG } from 'react-svg';

import contentIcon from '@assets/icons/content.svg';
import closeIcon from '@assets/icons/crossRed.svg';
import PlusIcon from '@assets/icons/plus.svg?react';
import { FileUrl } from '@customTypes/general';
import { getFileExtension, removeFileExtension } from '@utils/stringOps';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import Button from '../Button';
import { ScrollArea } from '../ScrollArea';

import RenderPdf from './RenderPdf';

pdfjs.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';

interface FileWithId extends File {
    id: string;
}

type Props = {
    open: () => void;
    name: string;
    url: string;
};

export default function FileDisplay({ open, name, url }: Props) {
    const renderBody = (file: File | string) => {
        if (!file) return null;
        if (typeof file === 'string') {
            return (
                <Image
                    alt="Invoice"
                    className="object-cover"
                    height={184}
                    radius="none"
                    src={file}
                    width={130}
                />
            );
        }
        if (file.type.includes('image')) {
            return (
                <Image
                    alt="Invoice"
                    className="object-contain"
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

    const renderUrl = (file: FileUrl) => {
        if (!file) return 'null';
        if (file.type.includes('image')) {
            return (
                <Image
                    alt="Invoice"
                    className="object-contain"
                    height={184}
                    radius="none"
                    src={file.url}
                    width={130}
                />
            );
        }
        // if (file.type.includes('pdf')) {
        //     return <RenderPdf file={file as FileWithId} />;
        // }
        return (
            <div className="h-[184px] flex justify-center items-center text-sm">
                <ReactSVG className="text-default-300" height={48} src={contentIcon} width={48} />
            </div>
        );
    };

    const [field, _, helpers] = useField(name);
    const { value: files } = field;

    const [fieldUrls] = useField(url);
    const { value: fileUrls } = fieldUrls;

    const removeFile = (id: string) => {
        helpers.setValue(files.filter((f: FileWithId) => f.id !== id));
    };

    const { setFieldValue } = useFormikContext();
    const removeFileUrl = (id: string) => {
        setFieldValue(
            url,
            fileUrls.filter((f: FileUrl) => f._id !== id)
        );
    };

    if (files.length === 0 && fileUrls.length === 0) return 'no files to show';

    return (
        <div className="w-full">
            <ScrollArea className="px-4" orientation="horizontal">
                <div className="flex justify-center gap-4 p-4 items-stretch">
                    {fileUrls.map((file: FileUrl) => (
                        <div key={file._id} className="relative rounded-2xl p-1 pb-1">
                            <div className="rounded-lg border overflow-hidden">
                                {renderUrl(file)}
                            </div>
                            <div className="flex mt-1 w-[130px] text-sm text-wrap px-1">
                                <span className="truncate">{removeFileExtension(file.name)}</span>
                                <span>.{file.extension}</span>
                            </div>
                            <button
                                className="absolute -top-3 -right-3 p-2 rounded-full z-10"
                                type="button"
                                onClick={() => {
                                    removeFileUrl(file._id);
                                }}
                            >
                                <ReactSVG
                                    className="text-danger"
                                    height={24}
                                    src={closeIcon}
                                    width={24}
                                />
                            </button>
                        </div>
                    ))}

                    {files.map((file: FileWithId) => (
                        <div key={file.id} className="relative rounded-2xl p-1 pb-1">
                            <div className="rounded-lg border overflow-hidden">
                                {renderBody(file)}
                            </div>
                            <div className="flex mt-1 w-[130px] text-sm text-wrap px-1">
                                <span className="truncate">{removeFileExtension(file.name)}</span>
                                <span>.{getFileExtension(file.name)}</span>
                            </div>
                            <button
                                className="absolute -top-3 -right-3 p-2 rounded-full z-10"
                                type="button"
                                onClick={() => {
                                    removeFile(file.id);
                                }}
                            >
                                <ReactSVG
                                    className="text-danger"
                                    height={24}
                                    src={closeIcon}
                                    width={24}
                                />
                            </button>
                        </div>
                    ))}

                    <div className="pb-7 self-stretch">
                        <Button
                            className="rounded-lg min-w-[80px] h-full px-0"
                            color="transparent"
                            onClick={open}
                        >
                            <PlusIcon height={24} width={24} />
                        </Button>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
