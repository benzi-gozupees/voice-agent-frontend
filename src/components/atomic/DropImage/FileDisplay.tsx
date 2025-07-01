import { Image } from '@nextui-org/react';
import { useField } from 'formik';
import { ReactSVG } from 'react-svg';

import contentIcon from '@assets/icons/content.svg';
import closeIcon from '@assets/icons/crossRed.svg';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

type Props = {
    open: () => void;
    name: string;
};

export default function FileDisplay({ open, name }: Props) {
    const renderBody = (file: File | string) => {
        if (!file)
            return (
                <div className="h-full flex justify-center items-center text-sm">
                    <ReactSVG
                        className="text-default-300"
                        height={48}
                        src={contentIcon}
                        width={48}
                    />
                </div>
            );
        if (typeof file === 'string')
            return (
                <Image
                    alt="biller logo"
                    className="object-contain"
                    height={64}
                    radius="none"
                    src={file}
                />
            );
        if (file?.type?.includes('image')) {
            return (
                <Image
                    alt="biller logo"
                    className="object-contain"
                    height={32}
                    radius="none"
                    src={URL.createObjectURL(file)}
                />
            );
        }
        return (
            <div className="h-full flex justify-center items-center text-sm">
                <ReactSVG className="text-default-300" height={48} src={contentIcon} width={48} />
            </div>
        );
    };

    const [field, _, helpers] = useField(name);
    const { value: file } = field;
    const removeFile = () => helpers.setValue(null);
    if (!file) return null;

    return (
        <div className="w-full">
            <div className="flex justify-center items-center gap-4 py-6">
                <div className="relative p-4 pb-1">
                    {renderBody(file)}
                    <ReactSVG
                        className="absolute -top-2 -right-2 cursor-pointer text-danger"
                        height={24}
                        src={closeIcon}
                        width={24}
                        onClick={() => removeFile()}
                    />
                </div>
            </div>
        </div>
    );
}
