import { useEffect, useMemo, useState } from 'react';

import { SharedSelection, SortDescriptor } from '@nextui-org/react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@hooks/store';

type Filters = {
    [key: string]: Set<string> | number | string | boolean;
};

type Props<T extends Filters> = {
    defaultSort: SortDescriptor;
    defaultFilters?: T;
};

type Query = {
    page: number;
    limit: number;
    company?: string;
    search?: string;
    sort?: string;
    filters?: string;
};

export default function useGetTableData<T extends Filters>({
    defaultFilters,
    defaultSort,
}: Props<T>) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { _id: company } = useAppSelector(state => state.company);

    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [limit, setLimit] = useState(Number(searchParams.get('limit')) || 10);
    // const [company, setCompany] = useState(searchParams.get('company') || _id);
    const [search, setSearch] = useState(searchParams.get('search') || '');

    const parseSort = (sortString: string): SortDescriptor => {
        const [column, direction] = sortString.split(':');
        return { column, direction: direction === 'asc' ? 'ascending' : 'descending' };
    };
    const [sort, setSort] = useState<SortDescriptor>(
        searchParams.get('sort') ? parseSort(searchParams.get('sort')!) : defaultSort
    );

    const parseFilters = (filtersString: string): T => {
        const filters1: Partial<{ [K in keyof T]: T[K] }> = {};

        filtersString.split(',').forEach(filter => {
            const [key, values] = filter.split('(');
            if (values) {
                (filters1 as any)[key] = new Set(values.replace(')', '').split(','));
            }
        });

        return filters1 as T;
    };
    const [filters, setFilters] = useState<T>(() => {
        if (searchParams.get('filters')) {
            return parseFilters(searchParams.get('filters')!);
        }
        return defaultFilters ?? ({} as T);
    });

    useEffect(() => {
        setPage(1);
    }, [company, search, sort, filters]);

    const apiQuery = useMemo(() => {
        const query: Query = { page, limit, company };
        if (search) query.search = search;
        if (sort) {
            query.sort = `${sort.column}:${sort.direction === 'ascending' ? 'asc' : 'desc'}`;
        }
        if (filters) {
            let filterString = '';
            Object.entries(filters).forEach(([key, value]) => {
                if (value instanceof Set && value.size) {
                    filterString += `${key}=${Array.from(value).join(',')}&`;
                } else if (value !== undefined && value !== null) {
                    filterString += `${key}=${value}&`;
                }
            });
            if (filterString) query.filters = filterString;
        }

        return query;
    }, [page, limit, search, sort, filters, company]);

    useEffect(() => {
        const params = new URLSearchParams();

        params.set('page', String(page));
        params.set('limit', String(limit));
        if (company) params.set('company', company);
        if (search) params.set('search', encodeURIComponent(search));

        if (sort) {
            const encodedSort = `${sort.column}:${sort.direction === 'ascending' ? 'asc' : 'desc'}`;
            params.set('sort', encodedSort);
        }

        if (filters) {
            const filterString = Object.entries(filters)
                .map(([key, value]) => {
                    const values = value instanceof Set ? Array.from(value) : value;
                    return `${key}(${Array.isArray(values) ? values.join(',') : values})`;
                })
                .join(',');
            if (filterString) params.set('filters', filterString);
        }

        setSearchParams(params, { replace: true });
    }, [page, limit, search, sort, filters, company, setSearchParams]);

    const onFilterChange = (key: string, value: SharedSelection | string | number | boolean) => {
        setFilters((prev: T) => ({
            ...prev,
            [key]: value instanceof Set ? new Set(value) : value,
        }));
    };

    return {
        page,
        setPage,
        limit,
        setLimit,
        search,
        setSearch,
        sort,
        setSort,
        filters,
        setFilters,
        apiQuery,
        onFilterChange,
    };
}
