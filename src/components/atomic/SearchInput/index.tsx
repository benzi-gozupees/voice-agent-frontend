import { Input, InputProps } from '@nextui-org/input';

import Search from '@assets/icons/search.svg?react';

interface SearchInputProps extends InputProps {
    placeholder?: string;
}

export default function SearchInput({ placeholder, ...props }: SearchInputProps) {
    return (
        <Input
            {...props}
            isClearable
            aria-label="Search"
            classNames={{
                inputWrapper: 'bg-background h-[40px] border shadow-none',
                input: 'text-sm',
            }}
            endContent={<div className="w-1 h-1" />}
            labelPlacement="outside"
            placeholder={placeholder}
            radius="md"
            size="md"
            startContent={<Search className="text-secondary me-1" height={16} width={16} />}
            type="search"
            variant="bordered"
            width="full"
        />
    );
}
