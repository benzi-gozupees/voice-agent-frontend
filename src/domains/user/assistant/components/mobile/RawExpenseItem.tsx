import { Divider, Spacer } from '@nextui-org/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import MoreIcon from '@assets/icons/more-hollow.svg?react';
import Button from '@components/atomic/Button';
import Chip from '@components/atomic/Chip';
import Dropdown, { DropdownItem, DropdownMenu, DropdownTrigger } from '@components/atomic/DropDown';
import { getProfile } from '@domains/common/settings/api/profile';
import { RawExpense } from '@domains/user/expenses/types';
import useFormatCurrency from '@hooks/useFormatCurrency';
import { formatDate } from '@utils/formatDate';

type RawExpenseItemProps = {
    row: RawExpense;
    setSelectedItem: any;
    deleteModal: any;
};

export default function RawExpenseItem({ row, setSelectedItem, deleteModal }: RawExpenseItemProps) {
    const queryClient = useQueryClient();
    const handleViewFile = (url: string) => {
        if (url) {
            window.open(url, '_blank');
        } else {
            toast.error('File not available');
        }
    };

    const { data: softwares, isLoading } = useQuery({
        queryKey: ['softwares'],
        queryFn: () => getProfile('customer'),
    });

    const formatCurrency = useFormatCurrency();

    return (
        <div className="p-5 rounded-2xl border">
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <span>{row?.files[0]?.name}</span>
                    <Chip status={row?.status as any} />
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
                        <DropdownItem
                            key="view"
                            className={`${row?.files[0]?.url ? '' : 'hidden'}`}
                            title="View"
                            onClick={() => {
                                handleViewFile(row?.files[0]?.url as any);
                            }}
                        />
                        <DropdownItem
                            key="delete"
                            className={row?.status === 'processed' ? 'hidden' : ''}
                            title="Delete"
                            onPress={() => {
                                setSelectedItem(row);
                                deleteModal.onOpen();
                            }}
                        />
                    </DropdownMenu>
                </Dropdown>
            </div>
            <Spacer y={2} />

            <Divider className="my-4" />
            <div className="grid grid-cols-2 gap-1">
                <span className="text-default-500">Date Added</span>
                <span className="text-md text-default-500 text-end">
                    {formatDate(row?.created_at)}
                </span>
            </div>
        </div>
    );
}
