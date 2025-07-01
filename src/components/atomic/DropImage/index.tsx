import { Field, FieldProps, useField } from 'formik';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

import UploadIcon from '@assets/icons/upload_icon.svg?react';

import FileDisplay from './FileDisplay';

type DropzoneProps = {
    name: string;
    multiple?: boolean;
    maxFiles?: number;
    accept?: Accept;
    maxSize?: number;
    disabled?: boolean;
};

const defaultAccept = {
    'image/*': [],
};

export default function DropIamge({
    name,
    multiple = false,
    maxFiles = 1,
    accept = defaultAccept,
    maxSize = 10 * 1024 * 1024,
    disabled = false,
}: DropzoneProps) {
    const [field, _, helpers] = useField(name);
    const { value } = field;

    const onDropRejected = (fileRejections: FileRejection[]) => {
        fileRejections.forEach(file => {
            file.errors.forEach(err => {
                if (err.code === 'file-invalid-type') {
                    toast.error('Invalid file type. Only image files are allowed.');
                }
                if (err.code === 'file-too-large') {
                    const size = maxSize / (1024 * 1024);
                    toast.error(`File is too large. Maximum file size is ${size}MB.`);
                }
                if (err.code === 'too-many-files') {
                    toast.error('Too many files. Maximum number of files is 10.');
                }
            });
        });
    };

    const onDrop = (files: File[]) => {
        helpers.setValue(files[0]);
    };

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        multiple,
        maxFiles,
        accept,
        disabled,
        maxSize,
        onDropRejected,
        noClick: !!value,
    });

    return (
        <Field name={name}>
            {({ form: { touched, errors } }: FieldProps) => {
                const error = touched[name] && errors[name];
                if (value)
                    return (
                        <div className="h-full relative">
                            <div className="absolute left-0 top-[50%] -translate-y-[50%]">
                                <FileDisplay name={name} open={open} />
                            </div>
                        </div>
                    );
                return (
                    <div
                        {...getRootProps()}
                        className={`w-full h-full p-1 custom-dashed bg-light flex flex-col justify-center items-center text-default-700 cursor-pointer ${isDragActive ? 'bg-primary-50' : ''} ${error ? 'custom-dashed-red text-danger' : ''}`}
                    >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center justify-center p-6 gap-4">
                            <p className="font-medium">Upload Logo</p>
                            <UploadIcon
                                className={`${isDragActive ? 'bg-primary-50' : ''}`}
                                height={24}
                                width={24}
                            />
                            <p className="font-light text-tiny text-center">
                                Drag your file(s) or browse 90x90px
                            </p>
                        </div>
                    </div>
                );
            }}
        </Field>
    );
}
