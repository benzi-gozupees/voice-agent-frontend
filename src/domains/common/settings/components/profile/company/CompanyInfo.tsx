import { ChangeEvent, useState } from 'react';

import { Image, Spinner } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import EditPencilIcon from '@assets/icons/edit_pencil.svg?react';
import ImageEditIcon from '@assets/icons/image_edit.svg?react';
import userImageDummy from '@assets/icons/user_profile.svg';
import Button from '@components/atomic/Button';
import { updateCompanyLogo } from '@domains/common/settings/api/company';
import { getCompany } from '@domains/user/dashboard/api/company';
import { useAppDispatch, useAppSelector } from '@hooks/store';
import { capitalize } from '@utils/stringOps';

type CompanyInfoProps = {
    toggle: () => void;
};

function CompanyInfo({ toggle }: CompanyInfoProps) {
    const queryClient = useQueryClient();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { role: userRole } = useAppSelector((state: any) => state.auth);
    const dispatch = useAppDispatch();
    const company = useAppSelector(state => state.company);

    const { data, isPending: isPendingGetCompany } = useQuery({
        queryKey: ['getCompany', company?._id],
        queryFn: () => getCompany(),
        enabled: !!company?._id,
    });

    const mutation = useMutation({
        mutationFn: updateCompanyLogo,
        onSuccess: res => {
            // dispatch(setCompany(res?.company));
            queryClient.invalidateQueries({ queryKey: ['getAllCompanies'] });
            queryClient.invalidateQueries({ queryKey: ['getCompany'] });
            toast.success('Logo updated successfully');
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
            mutation.mutate({ id: company._id, file });
        }
    };

    // if (isPending)
    //     return (
    //         <div className=" flex flex-col border rounded-2xl p-4">
    //             {/* Header Skeleton */}
    //             <div className="flex flex-1 justify-between items-center ms-3">
    //                 <Skeleton className="h-6 w-1/3" />
    //                 <Skeleton className="h-8 w-20" />
    //             </div>

    //             {/* Image and Info Skeleton */}
    //             <div className="flex my-3">
    //                 <div className="ms-3">
    //                     <div className="flex justify-center w-full">
    //                         <div className="relative w-[120px] h-[120px]">
    //                             <Skeleton className="h-[120px] w-[120px] rounded-full" />
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <div className="flex flex-1 justify-between items-center ms-3">
    //                     <div className="items-start">
    //                         <Skeleton className="h-5 w-48 mb-2" />
    //                         <Skeleton className="h-4 w-36 mb-1" />
    //                         <Skeleton className="h-4 w-48 mb-1" />
    //                     </div>
    //                 </div>
    //             </div>

    //             {/* Additional Info Skeleton */}
    //             <div className="px-36">
    //                 <div className="flex justify-between mt-4">
    //                     <Skeleton className="h-4 w-1/3" />
    //                     <Skeleton className="h-4 w-1/3" />
    //                 </div>
    //                 <div className="flex justify-between mt-4">
    //                     <Skeleton className="h-4 w-1/3" />
    //                     <Skeleton className="h-4 w-1/3" />
    //                 </div>
    //                 <div className="flex justify-between mt-4">
    //                     <Skeleton className="h-4 w-1/3" />
    //                     <Skeleton className="h-4 w-1/3" />
    //                 </div>
    //                 <div className="flex justify-between mt-4">
    //                     <Skeleton className="h-4 w-1/3" />
    //                     <Skeleton className="h-4 w-1/3" />
    //                 </div>
    //                 <div className="flex justify-between mt-4">
    //                     <Skeleton className="h-4 w-1/3" />
    //                     <Skeleton className="h-4 w-1/3" />
    //                 </div>
    //                 <div className="flex justify-between mt-4">
    //                     <Skeleton className="h-4 w-1/3" />
    //                     <Skeleton className="h-4 w-1/3" />
    //                 </div>
    //             </div>
    //         </div>
    //     );

    return (
        <div className=" flex flex-col border rounded-2xl sm:p-8 p-4">
            {/* Image, name, email, and edit button section */}
            <div className="flex flex-1 justify-between items-center">
                <div className="flex mb-3">
                    <div className="">
                        <div className="flex justify-center w-full">
                            <div className="relative flex items-center justify-center sm:w-32 sm:h-32 w-20 h-20">
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
                                        data?.company?.logo !== ''
                                            ? data?.company?.logo
                                            : userImageDummy
                                    }
                                />
                                <input
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    aria-label="Upload Logo"
                                    className="hidden"
                                    id="logo"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                {
                                    // eslint-disable-next-line
                                    <label htmlFor="logo">
                                        <div className="absolute w-[25px] z-10 h-[25px] sm:bottom-4 sm:right-4 bottom-1 right-2 bg-white border border-default rounded-full flex items-center justify-center cursor-pointer">
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

                    <div className="flex flex-1 justify-between items-center ms-3">
                        <div className="items-start">
                            <h5 className="font-bold text-3xl">{data?.company?.name}</h5>
                            {/* <p className="mb-1 mt-1 text-md">
                                {company?.city}, {company?.country}
                            </p>
                            <p className="mb-1 mt-1 text-md">{company?.email}</p> */}
                        </div>
                    </div>
                </div>
                <div className="items-end">
                    <div className="hidden sm:block">
                        <Button
                            className="border border-primary"
                            color="white"
                            radius="md"
                            startContent={<EditPencilIcon />}
                            onClick={toggle}
                        >
                            Edit
                        </Button>
                    </div>
                    <div className="sm:hidden">
                        <Button
                            className="border border-primary"
                            color="white"
                            radius="md"
                            size="sm"
                            startContent={<EditPencilIcon />}
                            onClick={toggle}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </div>

            {/* Newly added section */}
            <h1 className="font-semibold text-2xl">Company Information</h1>
            <div className="">
                <div className="flex justify-between mt-6">
                    <div className="w-1/2">
                        <span className="text-sm text-[#8B8B8B]">Phone Number</span>
                        <p className="mb-1 mt-1">
                            {data?.company?.country_code}
                            {data?.company?.mobile}
                        </p>
                    </div>
                    <div className="w-1/2">
                        <span className="text-sm text-[#8B8B8B]">Employees</span>
                        <p className="mb-1 mt-1 uppercase">{data?.company?.size}</p>
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <div className="w-1/2">
                        <span className="text-sm text-[#8B8B8B]">Company Address</span>
                        <p className="mb-1 mt-1">{data?.company?.address}</p>
                    </div>
                    <div className="w-1/2">
                        <span className="text-sm text-[#8B8B8B]">City</span>
                        <p className="mb-1 mt-1">{data?.company?.city}</p>
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <div className="w-1/2">
                        <span className="text-sm text-[#8B8B8B]">Trade License Number</span>
                        <p className="mb-1 mt-1">{data?.company?.license_number}</p>
                    </div>
                    <div className="w-1/2">
                        <span className="text-sm text-[#8B8B8B]">Licensing Authority</span>
                        <p className="mb-1 mt-1">{data?.company?.license_authority}</p>
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <div className="w-1/2">
                        <span className="text-sm text-[#8B8B8B]">Sector</span>
                        <p className="mb-1 mt-1">{capitalize(data?.company?.sector as string)}</p>
                    </div>
                    <div className="w-1/2">
                        <span className="text-sm text-[#8B8B8B]">Activity</span>
                        <p className="mb-1 mt-1">{data?.company?.purpose}</p>
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <div className="w-1/2">
                        <span className="text-sm text-[#8B8B8B]">TRN Number</span>
                        <p className="mb-1 mt-1">{data?.company?.trn}</p>
                    </div>
                    <div className="w-1/2">
                        <span className="text-sm text-[#8B8B8B]">Corporate Tax ID</span>
                        <p className="mb-1 mt-1">{data?.company?.tax_number}</p>
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <div className="w-1/2">
                        <span className="text-sm text-[#8B8B8B]">Accounting Method</span>
                        <p className="mb-1 mt-1">{data?.company?.current_method}</p>
                    </div>
                    <div className="w-1/2">
                        <span className="text-sm text-[#8B8B8B]">Currency</span>
                        <p className="mb-1 mt-1">{data?.company?.currency}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyInfo;
