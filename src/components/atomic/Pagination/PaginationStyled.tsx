import { extendVariants, Pagination as NextPagination, VariantProps } from '@nextui-org/react';

const PaginationStyled = extendVariants(NextPagination, {
    variants: {
        color: {
            primary: {
                base: 'flex justify-center',
                cursor: 'bg-[#E9E8FF]',
                item: 'text-secondary text-semibold bg-light shadow-none',
                wrapper: 'gap-4 w-full',
                next: 'bg-light shadow-none',
                prev: 'bg-light shadow-none',
            },
            dots: {
                item: 'text-[0px] w-3 min-w-3 h-3',
                cursor: 'text-light text-[0px] bg-default-700 w-3 min-w-3 h-3',
            },
        },
    },
    defaultVariants: {
        color: 'primary',
        radius: 'md',
        showControls: 'true',
    },
});

export default PaginationStyled;

export type PaginationStyledProps = VariantProps<typeof PaginationStyled>;
