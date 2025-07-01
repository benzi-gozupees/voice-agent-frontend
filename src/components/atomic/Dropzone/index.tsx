import { useMemo } from 'react';

import { Field, FieldProps, useField } from 'formik';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import UploadIcon from '@assets/icons/upload_icon.svg?react';

import Button from '../Button';

// eslint-disable-next-line import/order
import { Divider, Spinner } from '@nextui-org/react';

import FileDisplay from './FileDisplay';

pdfjs.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';

type DropzoneProps = {
    name: string;
    multiple?: boolean;
    maxFiles?: number;
    accept?: Accept;
    maxSize?: number;
    disabled?: boolean;
    title?: string;
    subtitle?: string;
    isLoading?: boolean;
};

interface FileWithId extends File {
    id: string;
}

// const validator = (file: File) => {
//     if (file.size > 10485760) {
//         return {
//             code: 'file-too-large',
//             message: 'File size is too large111',
//         };
//     }
//     return null;
// };

const onDropRejected = (fileRejections: FileRejection[]) => {
    fileRejections.forEach(file => {
        file.errors.forEach(err => {
            if (err.code === 'file-invalid-type') {
                toast.error('Invalid file type. Only PDF and image files are allowed.');
            }
            if (err.code === 'file-too-large') {
                toast.error('File is too large. Maximum file size is 10MB.');
            }
            if (err.code === 'too-many-files') {
                toast.error('Too many files. Maximum number of files is 10.');
            }
        });
    });
};

const defaultAccept = {
    'image/*': [],
    'application/pdf': [],
};

export default function Dropzone({
    name,
    multiple = true,
    maxFiles = 10,
    accept = defaultAccept,
    maxSize = 10 * 1024 * 1024,
    disabled = false,
    title,
    subtitle,
    isLoading,
}: DropzoneProps) {
    const [field, _, helpers] = useField(name);
    const { value } = field;

    const onDrop = (files: File[]) => {
        const filesWithId = files.map(file => {
            const fileWithId = file as FileWithId;
            fileWithId.id = uuidv4();
            return fileWithId;
        });
        helpers.setValue([...value, ...filesWithId]);
    };

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        multiple,
        maxFiles,
        accept,
        disabled,
        maxSize,
        onDropRejected,
        noClick: value.length > 0,
    });
    console.log(isLoading);

    const renderBody = useMemo(() => {
        if (isLoading) return <Spinner size="lg" />;
        if (value.length === 0) {
            return (
                <div className="flex flex-col items-center p-6">
                    <div
                        className={`flex justify-center items-center size-14 ${isDragActive ? 'bg-light' : ''}`}
                    >
                        <UploadIcon
                            className={`${isDragActive ? 'bg-primary-50' : ''}`}
                            height={35}
                            width={35}
                        />
                    </div>
                    <p className="text-sm font-semibold my-1">
                        Drag your file(s) to start uploading
                    </p>
                    <div className="flex items-center my-3 justify-center gap-2">
                        <Divider className="w-[60px]" />
                        <span className="text-sm text-default-400">OR</span>
                        <Divider className="w-[60px]" />
                    </div>
                    <Button color="primary" size="md" onClick={open}>
                        Browse files
                    </Button>
                </div>
            );
        }
        return <FileDisplay open={open} />;
    }, [value, isDragActive]);

    return (
        <Field name={name}>
            {({ form: { touched, errors } }: FieldProps) => {
                const error = touched[name] && errors[name];
                return (
                    <div
                        {...getRootProps()}
                        className={`w-full h-full p-1 custom-dashed bg-light flex flex-col justify-center items-center text-default-700 cursor-pointer ${isDragActive ? 'bg-primary-50' : ''} ${error ? 'custom-dashed-red text-danger' : ''}`}
                    >
                        <input {...getInputProps()} />
                        {renderBody}
                    </div>
                );
            }}
        </Field>
    );
}
