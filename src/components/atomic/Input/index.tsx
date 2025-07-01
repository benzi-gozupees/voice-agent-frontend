import { InputProps, Input as NextInput } from '@nextui-org/input';
import { Spinner } from '@nextui-org/react';
import { Field, FieldProps, getIn } from 'formik';

interface CustomInputProps extends InputProps {
    name: string;
    textEnd?: boolean;
    isLoading?: boolean;
}

export default function Input({ name, textEnd, isLoading, ...props }: CustomInputProps) {
    return (
        <Field name={name}>
            {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => {
                const error = getIn(touched, name) && getIn(errors, name);

                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (props.type === 'file') {
                        setFieldValue(name, e.currentTarget.files);
                    } else {
                        setFieldValue(name, e.currentTarget.value);
                    }
                };
                const endContent = isLoading ? <Spinner size="sm" /> : props.endContent;
                return (
                    <NextInput
                        {...field}
                        classNames={{
                            inputWrapper: `h-[42px] border border-divider ${props.disabled ? 'bg-default-100' : ''}`,
                            label: 'font-medium',
                            input: textEnd ? 'text-end' : '',
                        }}
                        endContent={endContent}
                        errorMessage={error as string}
                        isInvalid={!!error}
                        labelPlacement="outside"
                        radius="md"
                        size="md"
                        value={props.type === 'file' ? undefined : field.value}
                        variant="bordered"
                        onChange={handleChange}
                        {...props}
                    />
                );
            }}
        </Field>
    );
}
