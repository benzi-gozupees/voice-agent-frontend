import { useMemo, useState } from 'react';

import { Autocomplete, AutocompleteItem, AutocompleteProps } from '@nextui-org/react';
import { Field, FieldProps } from 'formik';

import { currencyOptions } from '@src/constants/currency';

interface SelectInputWithSearchProps
    extends Omit<AutocompleteProps, 'onChange' | 'options' | 'children'> {
    name: string;
    label?: string;
}

function EndContent({ value }: any) {
    if (!value) return null;
    const opt = currencyOptions.find(option => option.value === value);
    return <span>{opt?.symbol}</span>;
}

function CurrencyPicker({ name, ...props }: SelectInputWithSearchProps) {
    const [searchValue, setSearchValue] = useState<string>('');
    const filteredOptions = useMemo(() => {
        if (searchValue === '') return currencyOptions;
        return currencyOptions.filter(option =>
            option.label.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [searchValue]);

    return (
        <Field name={name}>
            {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => {
                const error: any = touched[name] && errors[name];

                return (
                    <Autocomplete
                        {...field}
                        {...props}
                        aria-label={props.label || 'Currency picker'}
                        defaultSelectedKey={field.value}
                        inputProps={{
                            classNames: {
                                inputWrapper: 'h-[42px] border border-divider bg-light',
                                label: `font-medium ${props.labelPlacement === 'outside-left' ? 'w-[130px]' : ''}`,
                                input: `${props.labelPlacement === 'outside-left' ? 'h-[42px]' : ''}`,
                            },
                        }}
                        isClearable={false}
                        isInvalid={!!error}
                        radius="md"
                        size="md"
                        variant="bordered"
                        onInput={e => {
                            const inputValue = (e.target as HTMLInputElement).value;
                            setSearchValue(inputValue);
                        }}
                        onSelectionChange={(value: any) => {
                            if (field.value !== value) {
                                setFieldValue(name, value);
                            }
                        }}
                        labelPlacement="outside"
                        // startContent={<EndContent value={field.value} />}
                        errorMessage={error as string}
                    >
                        {filteredOptions?.map(option => (
                            <AutocompleteItem key={option?.value} value={option?.value}>
                                {option?.label}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                );
            }}
        </Field>
    );
}

export default CurrencyPicker;
