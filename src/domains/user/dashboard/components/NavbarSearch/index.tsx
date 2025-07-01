import React, { Key } from 'react';

import { Autocomplete, AutocompleteItem, AutocompleteSection } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import Search from '@assets/icons/search.svg?react';

import items from './data/sitemap';

function SectionTitle({ data }: any) {
    return (
        <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-default-100">
                <data.icon className="text-primary" height={18} width={18} />
            </div>
            <p className="font-medium text-md uppercase">{data.page}</p>
        </div>
    );
}

export default function NavbarSearch() {
    const [query, setQuery] = React.useState('');
    const [filteredItems, setFilteredItems] = React.useState(items);

    const handleInputChange = (val: string) => {
        setQuery(val);
        const valLowerCase = val.toLowerCase();
        const filtered = items
            .map(menu => {
                const pageMatches = menu.page.toLowerCase().includes(valLowerCase);
                return {
                    ...menu,
                    subRoutes: pageMatches
                        ? menu.subRoutes
                        : menu.subRoutes.filter(subRoute =>
                              subRoute.name.toLowerCase().includes(valLowerCase)
                          ),
                };
            })
            .filter(menu => menu.subRoutes.length > 0);
        setFilteredItems(filtered);
    };

    const navigate = useNavigate();
    const handleSelChange = (val: Key | null) => {
        if (!val) return;
        navigate(val as string);
    };

    return (
        <Autocomplete
            allowsCustomValue
            showScrollIndicators
            aria-label="Search everything like Invoices, expenses etc..."
            classNames={{
                base: 'border-none',
                selectorButton: 'hidden',
                endContentWrapper: 'pe-4',
            }}
            endContent={<Search className="text-secondary" />}
            inputProps={{
                classNames: {
                    inputWrapper:
                        'pl-6 bg-background h-[48px] border rounded-2xl hover:border-primary shadow-none',
                    input: 'text-sm',
                },
            }}
            inputValue={query}
            isClearable={false}
            items={filteredItems}
            label=""
            placeholder="Search everything like Invoices, expenses etc..."
            // selectorIcon={<Search className="text-secondary" />}
            variant="bordered"
            onInputChange={handleInputChange}
            onSelectionChange={handleSelChange}
        >
            {item => (
                <AutocompleteSection
                    key={item.route}
                    classNames={{
                        base: 'px-2 mb-0 -mt-2',
                        heading: 'font-medium ms-2',
                    }}
                    items={item.subRoutes}
                    title={(<SectionTitle data={item} />) as any}
                >
                    {subItem => (
                        <AutocompleteItem
                            key={subItem.route}
                            classNames={{
                                selectedIcon: 'hidden',
                            }}
                            value={subItem.name}
                        >
                            <span className="">{subItem.name}</span>
                        </AutocompleteItem>
                    )}
                </AutocompleteSection>
            )}
        </Autocomplete>
    );
}
