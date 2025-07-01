import { Divider, Spacer } from '@nextui-org/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import Cross from '@assets/icons/cross.svg?react';
import MoreIcon from '@assets/icons/more-hollow.svg?react';
import Tick from '@assets/icons/tick-circle.svg?react';
import Button from '@components/atomic/Button';
import Dropdown, { DropdownItem, DropdownMenu, DropdownTrigger } from '@components/atomic/DropDown';
import { getProfile } from '@domains/common/settings/api/profile';
import { Expense } from '@domains/user/expenses/types';
import useFormatCurrency from '@hooks/useFormatCurrency';
import { formatDate } from '@utils/formatDate';

type ExpenseItemProps = {
    row: Expense;
    setSelectedItem: any;
    editModalOnOpen: any;
    deleteModal: any;
};

export default function ExpenseItem({
    row,
    setSelectedItem,
    deleteModal,
    editModalOnOpen,
}: ExpenseItemProps) {
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
                    <span>{row?.type}</span>
                    {/* <Chip status={row?.status as any} /> */}
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
                            className={`${row?.file ? '' : 'hidden'}`}
                            title="View"
                            onClick={() => {
                                handleViewFile(row?.file as any);
                            }}
                        />
                        <DropdownItem
                            key="edit"
                            title="Edit"
                            onClick={() => {
                                setSelectedItem(row);
                                editModalOnOpen();
                            }}
                        />
                        <DropdownItem
                            key="delete"
                            title="Delete"
                            onPress={() => {
                                setSelectedItem(row);
                                deleteModal();
                            }}
                        />
                    </DropdownMenu>
                </Dropdown>
            </div>
            <Spacer y={2} />

            <Divider className="my-4" />
            <div className="grid grid-cols-[auto_1fr] gap-1">
                <span className="text-default-500">Expense Added</span>
                <span className="text-md text-default-500 text-end">{formatDate(row?.date)}</span>

                <span className="text-default-500">Category</span>
                <span className="text-md text-default-500 text-end">{row?.category}</span>
                <span className="text-default-500">Merchant</span>
                <span className="text-md text-default-500 text-end">{row?.merchant || ''}</span>
                <span className="text-default-500">Payment Method</span>
                <span className="text-md text-default-500 text-end capitalize">
                    {row?.payment_method}
                </span>
                <span className="text-default-500">Status</span>
                <div
                    className={
                        !softwares?.user?.wafeq_key && !softwares?.user?.zoho_org_id
                            ? 'invisible'
                            : 'flex justify-end'
                    }
                >
                    <h1
                        className={`${!softwares?.user?.wafeq_key ? 'hidden' : ''} flex items-center gap-1`}
                    >
                        {row?.wafeq_expense_id ? <Tick /> : <Cross fill="red" width={16} />}
                        Wafeq
                    </h1>
                    <h1
                        className={`${!softwares?.user?.zoho_org_id ? 'hidden' : ''} flex items-center gap-1`}
                    >
                        {row?.zoho_expense_id ? <Tick /> : <Cross fill="red" width={16} />}
                        Zoho Books
                    </h1>
                </div>
                <span className="text-default-500">Total Amount</span>
                <span className="text-md text-default-500 text-end">
                    {formatCurrency(row?.amount, true)}
                </span>
            </div>
        </div>
    );
}
