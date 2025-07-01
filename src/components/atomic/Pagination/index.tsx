import PaginationStyled, { PaginationStyledProps } from './PaginationStyled';

interface CustomPaginationProps extends PaginationStyledProps {
    hideOnSinglePage?: boolean;
}

export default function Pagination({ hideOnSinglePage = true, ...props }: CustomPaginationProps) {
    if (hideOnSinglePage && props.total !== undefined && props.total <= 1) return null;
    return <PaginationStyled {...props} />;
}
