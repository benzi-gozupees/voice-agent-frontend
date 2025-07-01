import { useQuery } from '@tanstack/react-query';

import CompanyIcon from '@assets/icons/company.svg?react';
import GiftIcon from '@assets/icons/gift.svg?react';
import SendIcon from '@assets/icons/send.svg?react';
import CopyToClipboard from '@components/atomic/CopyToClipboard';
import Skeleton from '@components/atomic/Skeleton';

import { getReferral_code } from '../api/referrals';

import ListReferrals from './referrals/ListReferrals';

function Referral() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['referral_code'],
        queryFn: () => getReferral_code(),
    });
    return (
        <div className="gap-5 flex flex-col">
            <div className="rounded-3xl border flex sm:flex-row justify-between sm:py-10 px-5 flex-col gap-3 sm:gap-0 py-5">
                <div className="flex gap-2 flex-col">
                    <h1 className="font-semibold text-2xl">Refer a business and earn reward</h1>
                    <h5 className="font-medium text-xl">
                        Get 50% off for each company you refer to GoZupees
                    </h5>
                    {isLoading ? (
                        <div className="flex gap-2">
                            <Skeleton className="w-20">12345678</Skeleton>
                            <Skeleton className="w-14">12345678</Skeleton>
                        </div>
                    ) : (
                        <div className="flex flex-col  gap-2 md:flex-row w-full">
                            <p className="border p-2 rounded-xl h-[42px] w-full text-nowrap text-sm">
                                {`${import.meta.env.VITE_CLIENT_URL}/plan?referral_code=${data?.referral_code?.referral_code}`}
                            </p>
                            <div className=" text-primary md:w-1/5  text-center">
                                <CopyToClipboard
                                    text={`${import.meta.env.VITE_CLIENT_URL}/plan?referral_code=${data?.referral_code?.referral_code}`}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="rounded-3xl border">
                    <div className="flex items-center gap-3 p-4 border-b-1">
                        <div className="bg-[#DCF0FF] rounded-full p-3">
                            <SendIcon height={20} width={20} />
                        </div>
                        <div>
                            <h1 className="font-semibold">Share your referral link</h1>
                            <p className="text-sm">
                                Invite companies to join the GoZupees.me using your unique referral
                                link
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 border-b-1">
                        <div className="bg-[#DCF0FF] rounded-full p-3">
                            <CompanyIcon height={20} width={20} />
                        </div>
                        <div>
                            <h1 className="font-semibold">Company Joins</h1>
                            <p className="text-sm">
                                When your companies joins GoZupees.me through shared link, they use
                                GoZupees
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-4">
                        <div className="bg-[#DCF0FF] rounded-full p-3">
                            <GiftIcon height={20} width={20} />
                        </div>
                        <div>
                            <h1 className="font-semibold">You earn reward</h1>
                            <p className="text-sm">
                                As a token of appreciation, you will receive 50% for the very next
                                month
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ListReferrals />
        </div>
    );
}

export default Referral;
