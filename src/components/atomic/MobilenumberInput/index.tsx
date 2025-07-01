import { InputProps, Input as NextInput } from '@nextui-org/input';
import { Field, FieldProps, getIn } from 'formik';

import CodeSelect from './components/CodeSelect';

interface CustomInputProps extends InputProps {
    nameMobile: string;
    nameCode: string;
}

export default function MobilenumberInput({ nameMobile, nameCode, ...props }: CustomInputProps) {
    return (
        <Field name={nameMobile}>
            {({ field, form: { touched, errors } }: FieldProps) => {
                const errorMobile = getIn(touched, nameMobile) && getIn(errors, nameMobile);
                const errorCode = getIn(touched, nameCode) && getIn(errors, nameCode);
                const error = errorMobile || errorCode;

                return (
                    <NextInput
                        {...field}
                        {...props}
                        classNames={{
                            inputWrapper: `h-[42px] shadow-sm border border-divider px-1`,
                            label: 'font-medium',
                        }}
                        errorMessage={error as string}
                        isInvalid={!!error}
                        labelPlacement="outside"
                        radius="md"
                        size="md"
                        startContent={<CodeSelect name={nameCode} />}
                        variant="bordered"
                    />
                );
            }}
        </Field>
    );
}
