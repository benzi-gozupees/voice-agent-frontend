import { Divider, Spacer } from '@nextui-org/react';

import MoreIcon from '@assets/icons/more-hollow.svg?react';
import Button from '@components/atomic/Button';
import Chip from '@components/atomic/Chip';
import Dropdown, { DropdownMenu, DropdownTrigger } from '@components/atomic/DropDown';
import useFormatCurrency from '@hooks/useFormatCurrency';
import { formatDate } from '@utils/formatDate';

import { Support } from '../../types/support';

type SupportItemProps = {
    row: Support;
};

export default function SupportItem({ row }: SupportItemProps) {
    const formatCurrency = useFormatCurrency();

    return (
        <div className="p-5 rounded-2xl border">
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <span className="font-medium line-clamp-1">{row?.title}</span>
                    <Chip status={row.status as any} />
                    {/* <span className="text-sm text-default-500 line-clamp-1">({row?.plan})</span> */}
                </div>

                <Dropdown className="w-6">
                    <DropdownTrigger>
                        <Button
                            isIconOnly
                            className="p-0 min-w-0 text-primary"
                            color="white"
                            size="md"
                        >
                            <MoreIcon height={24} width={24} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Actions">
                        {/* <DropdownItem
                            key="view"
                            href={row?.invoice_pdf}
                            target="_blank"
                            title="Download"
                        /> */}
                    </DropdownMenu>
                </Dropdown>
            </div>
            <Spacer y={2} />
            {/* <div className="flex items-center gap-2">
                <span className="font-medium line-clamp-1">Plan</span>
                <span className="text-sm text-default-500 line-clamp-1">({row?.plan})</span>
            </div> */}
            {/* <Spacer y={1} /> */}
            {/* <div className="flex items-center gap-2">
                <span className="font-medium text-default-500">Plan:</span>
                <span className="font-medium text-default-800 line-clamp-1">{row?.plan}</span>
            </div> */}
            <Divider className="my-4" />
            <div className="grid grid-cols-2 gap-1">
                <span className="text-default-500">Date Added</span>
                <span className="text-md text-default-500 text-end">
                    {formatDate(row?.created_at)}
                </span>
                <span className="text-default-500">Description</span>
                <span className="text-md text-default-500 text-end">{row?.description}</span>
                <span className="text-default-500">Remarks</span>
                <span className="text-md text-default-500 text-end">{row?.remarks}</span>
            </div>
        </div>
    );
}
