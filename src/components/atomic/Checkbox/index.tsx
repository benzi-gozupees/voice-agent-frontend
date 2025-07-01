// eslint-disable-next-line import/no-extraneous-dependencies
import { CheckboxProps, Checkbox as NextCheckbox } from '@nextui-org/react';
import { Field, FieldProps } from 'formik';

interface CustomCheckboxProps extends CheckboxProps {
    name: string;
}

export default function Checkbox({ name, ...props }: CustomCheckboxProps) {
    return (
        <Field name={name}>
            {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => {
                const error = touched[name] && errors[name];
                return (
                    <NextCheckbox
                        {...field}
                        {...props}
                        classNames={{
                            icon: 'text-light',
                            label: 'text-sm whitespace-nowrap',
                        }}
                        errorMessage={error as string}
                        isInvalid={!!error}
                        isSelected={field.value}
                        labelPlacement="outside"
                        size="md"
                        variant="bordered"
                        onChange={e => {
                            setFieldValue(name, e.target.checked);
                        }}
                    />
                );
            }}
        </Field>
    );
}
