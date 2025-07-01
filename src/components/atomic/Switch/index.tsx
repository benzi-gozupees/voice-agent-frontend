import { Switch as NextSwitch, SwitchProps } from '@nextui-org/react';
import { Field, FieldProps } from 'formik';

interface CustomSwitchProps extends SwitchProps {
    name: string;
}

export default function Switch({ name, size, ...props }: CustomSwitchProps) {
    return (
        <Field name={name}>
            {({ field, form: { setFieldValue } }: FieldProps) => (
                <div className="flex items-center gap-2">
                    <NextSwitch
                        {...field}
                        {...props}
                        // defaultSelected={field.value}
                        isSelected={field.value}
                        size={size || 'sm'}
                        variant="bordered"
                        onChange={e => {
                            setFieldValue(name, e.target.checked);
                        }}
                    />
                </div>
            )}
        </Field>
    );
}
