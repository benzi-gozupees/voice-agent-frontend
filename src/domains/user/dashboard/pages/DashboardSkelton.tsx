import { Spacer } from '@nextui-org/react';

import Skeleton from '@components/atomic/Skeleton';

export default function DashboardSkelton() {
    return (
        <>
            <div className="grid md:hidden grid-cols-2 gap-4 my-4">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
            </div>
            <div className="flex flex-col md:flex-row flex-wrap gap-6">
                <div className="flex-grow">
                    <Skeleton className="w-full h-12 rounded-2xl" />
                </div>
                <div className="md:w-[max(33%,330px)] flex justify-end gap-4 *:flex-1 md:*:flex-none">
                    <Skeleton className="w-[150px] h-12 rounded-2xl" />
                    <Skeleton className="w-[158px] h-12 rounded-2xl" />
                </div>
            </div>
            <div className="md:hidden my-6 h-40 scroll-mt-24" id="statistics">
                <div className="flex gap-4 rounded-3xl pb-3">
                    <Skeleton className="flex-1 w-[326px] min-w-[250px] h-[148px] rounded-3xl " />
                    <Skeleton className="flex-1 w-[326px] min-w-[250px] h-[148px] rounded-3xl" />
                </div>
            </div>
            <Spacer y={6} />
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-grow">
                    <div className="hidden md:block h-40 mb:2 scroll-mt-24" id="statistics">
                        <div className="flex gap-4 rounded-3xl pb-3">
                            <Skeleton className="w-[326px] min-w-[250px] h-[148px] rounded-3xl bg-[#F0F2FF] before:via-white" />
                            <Skeleton className="w-[326px] min-w-[250px] h-[148px] rounded-3xl bg-[#FAEBFF] before:via-white" />
                        </div>
                    </div>
                    <Spacer y={2} />
                    <Skeleton className="w-full rounded-3xl h-[344px] bg-[#fcfcfc] before:via-white border border-divider" />
                    <Spacer y={6} />
                    <Skeleton className="w-full rounded-3xl h-[344px] border border-divider" />
                </div>
                <div className="lg:w-[max(33%,330px)]">
                    <Skeleton className="w-full rounded-3xl min-h-[525px] border border-divider" />
                    <Spacer y={6} />
                    <Skeleton className="w-full rounded-3xl min-h-[350px] border border-divider" />
                </div>
            </div>
        </>
    );
}
