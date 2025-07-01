import React, { useEffect } from 'react';

import { Autocomplete, AutocompleteItem, Image } from '@nextui-org/react';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { useField } from 'formik';

import countries from '../data/countries.json';
import useCountryList from '../hooks/useCountryList';

export default function CodeSelect({ name }: { name: string }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const { items, hasMore, isLoading, onLoadMore } = useCountryList();
    const [selected, setSelected] = React.useState<any>(null);

    const [offset, setOffset] = React.useState(0);

    useEffect(() => {
        setOffset(items.length);
    }, [items]);

    useEffect(() => {
        setOffset(selected);
    }, [selected]);

    useEffect(() => {
        setOffset(0);
        onLoadMore(0, query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false,
        onLoadMore: () => onLoadMore(offset, query),
    });

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [field, meta, helpers] = useField(name);

    const [code, setCode] = React.useState(field.value);

    useEffect(() => {
        const sel = countries.find(i => i.code === code);
        setSelected(sel);
    }, [code]);

    useEffect(() => {
        const sel = countries.find(i => i.code === field.value);
        setSelected(sel);
    }, [field.value]);

    const handleInputChange = (val: string) => {
        if (val.length === 1 && /^\d$/.test(val)) {
            const t = `+${val}`;
            setCode(t);
            helpers.setValue(t);
        } else {
            setCode(val);
            helpers.setValue(val);
            setQuery(val);
        }
    };

    return (
        <Autocomplete
            allowsCustomValue
            showScrollIndicators
            aria-label="Select country"
            classNames={{
                base: 'border-none w-[150px]',
                popoverContent: 'w-[250px]',
            }}
            inputProps={{
                classNames: {
                    inputWrapper: 'border-none shadow-none ps-2',
                    input: 'ms-1 w-12',
                },
            }}
            inputValue={field.value || code}
            isClearable={false}
            isLoading={isLoading}
            items={items}
            label=""
            placeholder="Select country"
            scrollRef={scrollerRef}
            startContent={
                selected ? (
                    <Image
                        alt={selected?.name}
                        className="min-w-6 shadow-sm object-cover"
                        height={24}
                        radius="full"
                        src={selected?.flag}
                        width={24}
                    />
                ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-300" />
                )
            }
            variant="bordered"
            onBlur={() => helpers.setTouched(true)}
            onInputChange={handleInputChange}
            onOpenChange={setIsOpen}
        >
            {item => (
                <AutocompleteItem key={item.id} className="capitalize" textValue={item.code}>
                    <div className="flex items-center gap-2">
                        <Image
                            alt={item.name}
                            className="size-6 rounded-full shadow-sm object-cover flex-shrink-0"
                            height={24}
                            radius="full"
                            src={item.flag}
                            width={24}
                        />
                        <span>{item.code}</span>
                        <span className="text-default-500 truncate">{` (${item.name})`}</span>
                    </div>
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
}
