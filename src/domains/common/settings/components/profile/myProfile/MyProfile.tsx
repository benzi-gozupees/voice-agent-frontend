import { ChangeEvent, useState } from 'react';

import { Chip, Image, Spinner } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import EditPencilIcon from '@assets/icons/edit_pencil.svg?react';
import ImageEditIcon from '@assets/icons/image_edit.svg?react';
import userImageDummy from '@assets/icons/user_profile.svg';
import Button from '@components/atomic/Button';
import Skeleton from '@components/atomic/Skeleton';
import {
    getAccountantById,
    getProfile,
    updateProfileImage,
} from '@domains/common/settings/api/profile';
import { useAppDispatch, useAppSelector } from '@hooks/store';
import useModal from '@hooks/useModal';

import ChangePassword from '../../ChangePassword';

import EditAccountantProfileModal from './EditAccountantProfileModal';
import EditMyProfileModal from './EditMyProfileModal';

type Props = {};

function MyProfile(props: Props) {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const { role: userRole, user } = useAppSelector((state: any) => state.auth);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const editProfileModal = useModal();
    const editAccountProfileModal = useModal();
    const changePasswordModal = useModal();

    const { data, isPending, error } = useQuery({
        queryKey: ['getProfile'],
        queryFn: () => getProfile(userRole),
    });

    const {
        data: accountData,
        refetch,
        isLoading,
        error: accountantDataError,
    } = useQuery({
        queryKey: ['getAccountantById', user?._id],
        queryFn: () => getAccountantById(user?._id),
        enabled: userRole === 'accountant',
    });

    //   useEffect(() => {
    // console.log('🚀 ~ MyProfile ~ data:', accountData);
    //     if (data && data.user) {
    //         const { user } = data;
    //         dispatch(setUser(user));
    //         dispatch(setIsCompanyAdded({ is_company_added: data.is_company_added }));
    //     }
    // }, [data, dispatch]);

    const mutation = useMutation({
        mutationFn: (payload: { role: string; formData: FormData }) =>
            updateProfileImage(payload.role, payload.formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getProfile'] });
            toast.success('Profile image updated successfully');
        },
        onError: (err: any) => {
            const message = err?.response?.data?.message || 'Something went wrong';
            toast.error(message);
        },
    });

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);

            const formData = new FormData();
            formData.append('file', file);

            mutation.mutate({ role: userRole, formData });
        }
    };

    if (isPending)
        return (
            <div className="flex flex-col border rounded-2xl p-4">
                {/* Skeleton loader for Image, name, email */}
                <div className="flex">
                    <div className="ms-3">
                        <Skeleton className="rounded-full w-[100px] h-[100px]" />
                    </div>
                    <div className="flex flex-1 justify-between items-center ms-3">
                        <div>
                            <Skeleton className="w-[200px] h-[30px]" />
                            <Skeleton className="mt-1 w-[250px] h-[20px]" />
                        </div>
                    </div>
                </div>

                {/* Skeleton loader for Role, Invoice Email, Experience */}
                <div className="flex justify-between px-36 mt-6 w-full">
                    <Skeleton className="w-[200px] h-[30px]" />
                    <Skeleton className="w-[200px] h-[30px]" />
                    <Skeleton className="w-[200px] h-[30px]" />
                </div>

                {/* Skeleton loader for Skills and Expertise */}
                {userRole === 'accountant' && (
                    <div className="flex justify-between px-36 mt-4 w-full">
                        <Skeleton className="w-[300px] h-[40px]" />
                        <Skeleton className="w-[300px] h-[40px]" />
                    </div>
                )}
            </div>
        );

    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data found</div>;

    return (
        <>
            <div className=" flex flex-col border rounded-2xl sm:p-8 p-4 w-full">
                {/* Image, name, email, and edit button section */}
                <div className="flex justify-between items-center w-full">
                    <div className="mb-3">
                        <div className="flex justify-center w-full">
                            <div className="relative flex justify-center items-center sm:w-32 sm:h-32 w-20 h-20">
                                {mutation.isPending ? (
                                    <div
                                        className="flex justify-center items-center absolute w-full h-full"
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            zIndex: 1,
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <Spinner />
                                    </div>
                                ) : null}
                                <Image
                                    alt=""
                                    className="cursor-pointer object-cover rounded-full border border-default sm:w-24 sm:h-24 w-20 h-20"
                                    src={
                                        data?.user?.image !== ''
                                            ? data?.user?.image
                                            : userImageDummy
                                    }
                                />
                                <input
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    className="hidden"
                                    id="avatar"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                {
                                    // eslint-disable-next-line
                                    <label htmlFor="avatar">
                                        <div className="absolute w-[25px] z-10  h-[25px] sm:bottom-4 sm:right-4 bottom-1 right-2 bg-white border border-default rounded-full flex items-center justify-center cursor-pointer">
                                            <ImageEditIcon
                                                className="hover:text-primary"
                                                height={20}
                                                width={20}
                                            />
                                        </div>
                                    </label>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 sm:hidden">
    
                            <Button
                                className="border border-primary"
                                color="white"
                                radius="md"
                                size="sm"
                                startContent={<EditPencilIcon />}
                                onClick={changePasswordModal.openModal}
                            >
                                Change Password
                            </Button>
        
                        <Button
                            className="border border-primary"
                            color="white"
                            radius="md"
                            size="sm"
                            startContent={<EditPencilIcon />}
                            onClick={
                                userRole === 'accountant'
                                    ? editAccountProfileModal.openModal
                                    : editProfileModal.openModal
                            }
                        >
                            Edit
                        </Button>
                    </div>
                    <div className="sm:flex gap-3 hidden ">
               
                            <Button
                                className="border border-primary"
                                color="white"
                                radius="md"
                                startContent={<EditPencilIcon />}
                                onClick={changePasswordModal.openModal}
                            >
                                Change Password
                            </Button>
                       
                        <Button
                            className="border border-primary"
                            color="white"
                            radius="md"
                            startContent={<EditPencilIcon />}
                            onClick={
                                userRole === 'accountant'
                                    ? editAccountProfileModal.openModal
                                    : editProfileModal.openModal
                            }
                        >
                            Edit
                        </Button>
                    </div>
                </div>
                {/* Newly added section */}
                <h1 className="font-semibold text-2xl">Contact Person Information</h1>

                <div className="flex justify-between mt-4">
                    <div className="">
                        <span className="text-sm text-[#8B8B8B]">Authorised Person name</span>
                        <p className="mb-1 mt-1">{data?.user?.name}</p>
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <div className="">
                        <span className="text-sm text-[#8B8B8B]">Email</span>
                        <p className="mb-1 mt-1">{data?.user?.email}</p>
                    </div>

                    {accountData?.profile?.experience ? (
                        <div className="w-1/2">
                            <span className="text-sm text-[#8B8B8B]">Experience</span>
                            <p className="mb-1 mt-1">{accountData?.profile?.experience} Years</p>
                        </div>
                    ) : null}
                </div>

                {userRole === 'accountant' && accountData ? (
                    <div className="flex justify-between mt-4">
                        <div className="w-1/2">
                            <span className="text-sm text-[#8B8B8B]">Skills</span>
                            <div className="mb-1 mt-1 flex flex-wrap gap-2">
                                {accountData?.profile?.skills ? (
                                    accountData?.profile?.skills?.map(
                                        (skill: string, index: number) => (
                                            <Chip
                                                key={index?.toString()}
                                                className="bg-primary mt-1 text-light"
                                                color="default"
                                                variant="shadow"
                                            >
                                                {skill}
                                            </Chip>
                                        )
                                    )
                                ) : (
                                    <p>No skills added</p>
                                )}
                            </div>
                        </div>

                        <div className="w-1/2">
                            <span className="text-sm text-[#8B8B8B]">Expertise</span>
                            <div className="mb-1 mt-1 flex flex-wrap gap-2">
                                {accountData?.profile?.expertise ? (
                                    accountData?.profile?.expertise?.map(
                                        (expertise: string, index: number) => (
                                            <Chip
                                                key={index?.toString()}
                                                className="bg-primary mt-1 text-light"
                                                color="default"
                                                variant="shadow"
                                            >
                                                {expertise}
                                            </Chip>
                                        )
                                    )
                                ) : (
                                    <p>No expertise added</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>

            {editAccountProfileModal.isOpen ? (
                <EditAccountantProfileModal
                    isOpen={editAccountProfileModal.isOpen}
                    onClose={editAccountProfileModal.toggleModal}
                />
            ) : null}

            {editProfileModal.isOpen ? (
                <EditMyProfileModal
                    isOpen={editProfileModal.isOpen}
                    onClose={editProfileModal.toggleModal}
                />
            ) : null}
            {changePasswordModal.isOpen ? (
                <ChangePassword
                    isOpen={changePasswordModal.isOpen}
                    onOpenChange={changePasswordModal.toggleModal}
                />
            ) : null}
        </>
    );
}

export default MyProfile;
