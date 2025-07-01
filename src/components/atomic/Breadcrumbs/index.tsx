import { BreadcrumbItem, Breadcrumbs as NextBreadcrumbs } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

type BreadcrumbsProps = {
    entries: {
        title: string;
        href: string;
    }[];
};

export default function Breadcrumbs({ entries }: BreadcrumbsProps) {
    const navigate = useNavigate();
    return (
        <NextBreadcrumbs>
            {entries.map((entry, index) => (
                <BreadcrumbItem key={index} onClick={() => navigate(entry.href)}>
                    {entry.title}
                </BreadcrumbItem>
            ))}
        </NextBreadcrumbs>
    );
}
