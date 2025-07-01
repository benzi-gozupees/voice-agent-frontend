import { useState } from 'react';

import { InputProps, Input as NextInput } from '@nextui-org/input';
import { Field, FieldProps } from 'formik';

import EyeIcon from '@assets/icons/eye-outlined.svg?react';
import EyeSlashIcon from '@assets/icons/eye-slash.svg?react';

interface CustomInputProps extends InputProps {
    name: string;
}

export default function PasswordInput({ name, ...props }: CustomInputProps) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(prev => !prev);

    return (
        <Field name={name}>
            {({ field, form: { touched, errors } }: FieldProps) => {
                const error = touched[name] && errors[name];
                return (
                    <NextInput
                        {...field}
                        {...props}
                        classNames={{
                            inputWrapper: `h-[42px] border border-divider`,
                            label: 'font-medium',
                        }}
                        endContent={
                            <button
                                aria-label={isVisible ? 'Hide password' : 'Show password'}
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                            >
                                {isVisible ? (
                                    <EyeSlashIcon
                                        className="text-default-600"
                                        height={16}
                                        width={16}
                                    />
                                ) : (
                                    <EyeIcon className="text-default-600" height={16} width={16} />
                                )}
                            </button>
                        }
                        errorMessage={error as string}
                        isInvalid={!!error}
                        labelPlacement="outside"
                        radius="md"
                        size="md"
                        type={isVisible ? 'text' : 'password'}
                        variant="bordered"
                    />
                );
            }}
        </Field>
    );
}
