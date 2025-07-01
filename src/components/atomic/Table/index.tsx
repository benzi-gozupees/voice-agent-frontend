import React, { useMemo } from 'react';

import {
    TableBody,
    TableCell,
    TableColumn,
    TableColumnProps,
    TableHeader,
    TableProps,
    TableRow,
} from '@nextui-org/react';

import Error from '@components/molecular/Error';
import useBreakpoint from '@hooks/useBreakPoint';

import { ScrollArea } from '../ScrollArea';

import TableStyled from './TableStyled';

export interface ColumnProps<T> extends Omit<TableColumnProps<T>, 'children'> {
    uid: Extract<keyof T, string | number> | 'actions' | 'extra';
    sortable?: boolean;
    render?: ({ cell, row }: { cell: any; row: T }) => React.ReactNode;
    skeleton: React.ReactNode;
}

interface CustomTableProps<T> extends TableProps {
    columns: ColumnProps<T>[];
    items: T[] | undefined;
    uid: Extract<keyof T, string | number>;
    emptyContent: React.ReactNode;
    errorContent?: React.ReactNode;
    isLoading?: boolean;
    isError?: boolean;
    highlightedRows?: string[];
    mobileRender?: ({ row }: { row: T }) => React.ReactNode;
    mobileSkeleton?: () => React.ReactNode;
}

const disabledKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function Table<T>({
    columns,
    items,
    uid,
    emptyContent,
    errorContent,
    highlightedRows,
    isLoading,
    isError,
    mobileRender,
    mobileSkeleton,
    ...props
}: CustomTableProps<T>) {
    const { isBelowMd } = useBreakpoint('md');
    const renderCell = (row: any, columnKey: React.Key) => {
        const cellValue = row[columnKey as keyof T];
        const column = columns.find(col => col.uid === columnKey);
        if (column && column?.render) {
            return column.render({ cell: cellValue, row });
        }
        return cellValue;
    };

    const renderTableRows = () => {
        if (isError) return [];
        if (isLoading) {
            return Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                    {columns.map(column => (
                        <TableCell key={column.uid}>
                            <div className={`flex justify-${column.align}`}>{column.skeleton}</div>
                        </TableCell>
                    ))}
                </TableRow>
            ));
        }

        if (!items) return [];

        return items.map((item: T, index) => {
            const isHighlighted = highlightedRows?.includes(String(item[uid] ?? ''));
            return (
                <TableRow
                    key={index}
                    className={
                        isHighlighted ? 'bg-secondary-100 animate-appearance-in-table-row' : ''
                    }
                >
                    {columns.map(column => (
                        <TableCell key={column.uid}>{renderCell(item, column.uid)}</TableCell>
                    ))}
                </TableRow>
            );
        });
    };

    const dataState = useMemo(() => {
        if (items?.length === 0) return emptyContent;
        if (isError) return errorContent || <Error />;
        return emptyContent;
    }, [items, emptyContent, isError, errorContent]);

    if (isBelowMd && mobileRender && mobileSkeleton) {
        if (items?.length === 0) return emptyContent;
        if (isError) return errorContent || <Error />;
        if (isLoading) {
            return (
                <div className="flex flex-col gap-3">
                    {Array.from({ length: 5 }).map(mobileSkeleton)}
                </div>
            );
        }
        return (
            <div className="flex flex-col gap-3">
                {items?.map(item => mobileRender({ row: item }))}
            </div>
        );
    }

    return (
        <ScrollArea className="px-4" orientation="horizontal">
            <TableStyled
                aria-label="table"
                radius="none"
                {...props}
                disabledKeys={isLoading ? disabledKeys : undefined}
            >
                <TableHeader columns={columns}>
                    {column => (
                        <TableColumn
                            key={column.uid}
                            align={column?.align || 'start'}
                            allowsSorting={column?.sortable || false}
                            width={column?.width || 150}
                        >
                            {column.title}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={dataState}>{renderTableRows()}</TableBody>
            </TableStyled>
        </ScrollArea>
    );
}
