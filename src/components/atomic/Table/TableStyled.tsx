import { extendVariants, Table } from '@nextui-org/react';

const TableStyled = extendVariants(Table, {
    variants: {
        color: {
            default: {
                wrapper:
                    'rounded-2xl md:rounded-t-none shadow-none bg-light p-0 pb-2 overflow-x-hidden',
                tr: 'h-12',
                thead: 'text-default-500',
                th: 'first:shadow-none bg-[#F9FAFB] ps-6 first:rounded-none last:rounded-none',
                tbody: 'shadow-none [&>tr]:border-b [&>tr:last-child]:border-b-0 rounded-none [&>tr>td]:last:rounded-t-none [&>tr]:min-h-[164px]',
                td: 'ps-6 py-2 group-data-[first=true]:first:before:rounded-none group-data-[first=true]:last:before:rounded-none group-data-[middle=true]:before:rounded-none',
            },
        },
        // selectionMode: {
        //     multiple: {
        //         tr: '[&>td]:text-light'
        //     },
        // },
    },
    defaultVariants: {
        color: 'default',
        selectionMode: 'none',
        disabledBehavior: 'all',
        layout: 'fixed',
    },
});

export default TableStyled;
