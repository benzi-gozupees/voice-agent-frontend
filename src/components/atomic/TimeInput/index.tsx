import { TimeInput as NextTimeInput, TimeInputProps } from '@nextui-org/react';
import { Field, FieldProps, getIn } from 'formik';

interface CustomInputProps extends TimeInputProps {
    name: string;
}

export default function TimeInput({ name, ...props }: CustomInputProps) {
    return (
        <Field name={name}>
            {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => {
                const error = getIn(touched, name) && getIn(errors, name);

                const handleChange = (time: any) => {
                    setFieldValue(name, time);
                };

                return (
                    <NextTimeInput
                        {...field}
                        {...props}
                        classNames={{
                            inputWrapper: `h-[42px] border border-divider`,
                            label: 'font-medium',
                        }}
                        errorMessage={error as string}
                        isInvalid={!!error}
                        labelPlacement="outside"
                        radius="md"
                        size="md"
                        variant="bordered"
                        onChange={handleChange}
                    />
                );
            }}
        </Field>
    );
}
