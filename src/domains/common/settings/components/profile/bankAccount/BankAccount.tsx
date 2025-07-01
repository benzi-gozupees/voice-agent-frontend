import { useState } from 'react';

import { useDisclosure } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import EditPencilIcon from '@assets/icons/edit_pencil.svg?react';
import PlusIcon from '@assets/icons/plus.svg?react';
import Button from '@components/atomic/Button';
import Skeleton from '@components/atomic/Skeleton';
import { all_bank_accounts } from '@domains/common/settings/api/bank_account';
import { bank_account } from '@domains/common/settings/types/bankAccount';
import useModal from '@hooks/useModal';

import AddBankAccount from './AddBankAccount';
import EditBankAccount from './EditAccountModal';

function BankAccount() {
    const [selectedData, setSelectedData] = useState<any>();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const editAccount = useModal();
    const { data, isPending, isRefetching, error } = useQuery({
        queryKey: ['myAccounts'],
        queryFn: all_bank_accounts,
    });
    return (
        <div className=" flex flex-col border rounded-2xl p-8 w-full">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-2xl">Bank Account</h1>
                <div className="hidden sm:block">
                    <Button
                        className="border-primary text-primary rounded-2xl"
                        startContent={<PlusIcon height={20} width={20} />}
                        onClick={() => onOpen()}
                    >
                        Add Bank Account
                    </Button>
                </div>
                <div className="sm:hidden block">
                    <Button
                        className="border-primary text-primary rounded-2xl"
                        startContent={<PlusIcon height={20} width={20} />}
                        onClick={() => onOpen()}
                    >
                        Add Bank Account
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-3 justify-between mt-4">
                {isPending ? (
                    <div className="flex flex-col gap-5 ms-3">
                        <div className="items-start">
                            <Skeleton className="h-5 w-48 mb-2" />
                            <Skeleton className="h-4 w-36 mb-1" />
                            <Skeleton className="h-4 w-36 mb-1" />
                        </div>
                        <div className="items-start">
                            <Skeleton className="h-5 w-48 mb-2" />
                            <Skeleton className="h-4 w-36 mb-1" />
                            <Skeleton className="h-4 w-36 mb-1" />
                        </div>
                    </div>
                ) : null}
                {data?.bank_accounts.length === 0 && <div>No bank account has been added yet.</div>}
                {data?.bank_accounts.map((account: bank_account, index: number) => (
                    <div key={index} className=" flex justify-between items-center">
                        <div>
                            <span className="text-sm  text-[#8B8B8B]">
                                Bank Account {account.isDefault ? '(Default)' : null}{' '}
                            </span>
                            <p className=" mt-2">{account?.bank_name}, </p>
                            <p className="mb-1 mt-1">{account?.account_no}</p>
                        </div>
                        <Button
                            className="border border-primary"
                            color="white"
                            radius="md"
                            startContent={<EditPencilIcon />}
                            onClick={() => {
                                setSelectedData(account);
                                editAccount.openModal();
                            }}
                        >
                            Edit
                        </Button>
                    </div>
                ))}
            </div>
            {isOpen ? <AddBankAccount isOpen={isOpen} onOpenChange={onOpenChange} /> : null}
            {editAccount.isOpen ? (
                <EditBankAccount
                    isOpen={editAccount?.isOpen}
                    selectedData={selectedData}
                    onOpenChange={editAccount?.closeModal}
                />
            ) : null}
        </div>
    );
}

export default BankAccount;
