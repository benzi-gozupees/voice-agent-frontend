import { useState } from 'react';

import { Image, useDisclosure } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import Icon from '@assets/icons/my_password.svg?react';
import PlusIcon from '@assets/icons/plus.svg?react';
import ActionButton from '@components/atomic/ActionButton';
import Button from '@components/atomic/Button';
import CopyToClipboard from '@components/atomic/CopyToClipboard';
import DeleteConfirmModal from '@components/modals/DeleteConfirmModal';
import Empty from '@components/molecular/Empty';

import { all_passwords, deletePassword } from '../api/password';

import AddPassword from './myPassword/AddPassword';
import UpdatePassword from './myPassword/UpdatePassword';

function MyPasswords() {
    const [selectedData, setSelectedData] = useState();
    const [selectedPassword, setSelectedPassword] = useState('');
    const { data, isPending } = useQuery({
        queryKey: ['passwords'],
        queryFn: all_passwords,
    });
    const deleteModal = useDisclosure();

    const handleDeletePassword = (id: string) => {
        setSelectedPassword(id);
        deleteModal.onOpen();
    };
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const {
        isOpen: updateIsOpen,
        onOpen: updateOnOpen,
        onOpenChange: updateOnOpenChange,
    } = useDisclosure();
    return (
        <div>
            <div className="flex gap-2 justify-end w-full mb-3">
                <Button
                    className="border border-default"
                    color="white"
                    radius="md"
                    startContent={<PlusIcon height={20} width={20} />}
                    onClick={() => onOpen()}
                >
                    Add new password
                </Button>
            </div>
            {data?.passwords?.length === 0 ? (
                <div className="flex justify-center items-center w-full">
                    <Empty message="" title="No passwords found" />
                </div>
            ) : null}
            <div className="grid sm:grid-cols-3 gap-5">
                {data?.passwords?.map((item: any, index: number) => (
                    <div key={index} className="border rounded-3xl p-6 flex flex-col gap-5">
                        <div className="flex justify-between items-center gap-1">
                            <div className="flex gap-2 items-center">
                                {item?.image ? (
                                    <Image
                                        alt=""
                                        className=" object-contain"
                                        height={70}
                                        src={item?.image}
                                        width={70}
                                    />
                                ) : (
                                    <Icon height={45} width={45} />
                                )}
                                <div className="flex-1">
                                    <h1 className="font-semibold text-2xl">{item?.title}</h1>
                                    <h5 className="font-semibold text-sm">{item?.type}</h5>
                                </div>
                            </div>
                            <div>
                                <ActionButton
                                    type="delete"
                                    onClick={() => handleDeletePassword(item?._id)}
                                />
                            </div>
                        </div>
                        <div>
                            <span className="text-sm text-[#8B8B8B]">Username</span>
                            <p className="mb-1 mt-1">{item?.user_name}</p>
                            <span className="text-sm text-[#8B8B8B]">Password</span>
                            <div className="flex gap-2">
                                <p className="mb-1 mt-1">*********</p>{' '}
                                <CopyToClipboard isButton={false} size="sm" text={item?.password} />
                            </div>

                            <span className="text-sm text-[#8B8B8B]">Website</span>
                            <p className="mb-1 mt-1 text-primary">
                                <a href={item?.url} rel="noopener noreferrer" target="_blank">
                                    {item?.url || 'N/A'}
                                </a>
                            </p>
                        </div>
                        <div className="w-full">
                            <Button
                                className="w-full"
                                onClick={() => {
                                    setSelectedData(item);
                                    updateOnOpen();
                                }}
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            {isOpen ? <AddPassword isOpen={isOpen} onOpenChange={onOpenChange} /> : null}
            {updateIsOpen ? (
                <UpdatePassword
                    data={selectedData}
                    isOpen={updateIsOpen}
                    onOpenChange={updateOnOpenChange}
                />
            ) : null}
            {deleteModal.isOpen && selectedPassword ? (
                <DeleteConfirmModal
                    _id={selectedPassword || ''}
                    invalidationKey="passwords"
                    isOpen={deleteModal.isOpen}
                    mutationFn={deletePassword}
                    title="Delete Password"
                    onClose={deleteModal.onClose}
                />
            ) : null}
        </div>
    );
}

export default MyPasswords;
