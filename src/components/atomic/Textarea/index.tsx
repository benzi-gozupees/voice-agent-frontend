import { Textarea as NextTextarea, TextAreaProps } from '@nextui-org/input';
import { Field, FieldProps, getIn } from 'formik';

interface CustomTextareaProps extends TextAreaProps {
    name: string;
}

export default function Textarea({ name, ...props }: CustomTextareaProps) {
    return (
        <Field name={name}>
            {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => {
                const error = getIn(touched, name) && getIn(errors, name);
                return (
                    <NextTextarea
                        {...field}
                        {...props}
                        classNames={{
                            inputWrapper: `h-[60px] border border-divider`,
                            label: 'font-medium pb-2',
                        }}
                        errorMessage={error as string}
                        isInvalid={!!error}
                        labelPlacement="outside"
                        radius="md"
                        size="md"
                        variant="bordered"
                        onChange={e => {
                            setFieldValue(name, e.target.value);
                        }}
                    />
                );
            }}
        </Field>
    );
}
