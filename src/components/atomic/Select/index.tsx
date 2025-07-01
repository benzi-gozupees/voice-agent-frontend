/* eslint-disable import/no-extraneous-dependencies */
import { SelectItem } from '@nextui-org/react';
import { Field, FieldProps, getIn, useFormikContext } from 'formik';

import SelectStyled, { SelectStyledProps } from './SelectStyled';

interface CustomSelectProps extends SelectStyledProps {
    // eslint-disable-next-line react/require-default-props
    name?: string;
    className?: string;
    title?: string;
}

export default function Select({ name, className, title, ...props }: CustomSelectProps) {
    const formik = useFormikContext();
    if (!name) {
        return (
            <SelectStyled
                className={className}
                {...props}
                renderValue={value => (
                    <span className="font-semibold text-sm">{value[0].rendered}</span>
                )}
                startContent={
                    <span
                        className={`${!title && 'hidden'} text-sm text-[#515151] whitespace-nowrap`}
                    >{`${title}:`}</span>
                }
            >
                {props.children}
            </SelectStyled>
        );
    }
    if (!formik && name)
        return (
            <span className="text-danger">
                Select with name must be wrapped in a Formik component
            </span>
        );
    return (
        <Field name={name}>
            {({ field, form: { touched, errors } }: FieldProps) => {
                // const error = touched[name] && errors[name];
                const error = getIn(touched, name) && getIn(errors, name);

                return (
                    <SelectStyled
                        {...field}
                        {...props}
                        className={className}
                        errorMessage={error as string}
                        isInvalid={!!error}
                        labelPlacement="outside"
                        selectedKeys={
                            props.selectionMode === 'multiple'
                                ? [...field.value]
                                : [field.value?.toString()]
                        }
                    >
                        {props.children}
                    </SelectStyled>
                );
            }}
        </Field>
    );
}

export { SelectItem };
