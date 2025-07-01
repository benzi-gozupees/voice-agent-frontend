/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { Tab, Tabs } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import Skeleton from '@components/atomic/Skeleton';

import { allPlans } from '../../api/subscriptionApi';

import PlanTable from './PlanTable';

function ComparisonTable() {
    const [selected, setSelected] = React.useState('monthly');
    const { data, isLoading, error } = useQuery({
        queryKey: ['allPlansForTable', selected],
        queryFn: () => allPlans(selected),
        enabled: true,
    });

    if (error) return <div>Error loading plans</div>;

    return (
        <Skeleton isLoaded={!isLoading}>
            <div className="sm:w-full w-screen px-5">
                <div className="sm:flex-row flex flex-col   sm:justify-between gap-2  sm:items-center mb-5">
                    <h1 className="text-3xl font-semi-bold">Compare Plans</h1>
                    <Tabs
                        aria-label="Options"
                        className="ml-auto"
                        classNames={{
                            tabContent: 'group-data-[selected=true]:text-primary',
                            tabList: 'p-0',
                            tab: ' px-7 min-h-[44px] font-semibold',
                        }}
                        radius="full"
                        selectedKey={selected}
                        variant="bordered"
                        onSelectionChange={setSelected as any}
                    >
                        <Tab key="monthly" title="Monthly Plans" />
                        <Tab key="yearly" title="Yearly Plans" />
                    </Tabs>
                </div>
                <div className="w-full ">
                    {/* {isLoading ? <Spinner className="flex justify-center items-center" /> : null}
                {error ? <p>Error loading plans</p> : null} */}
                    <PlanTable plans={data?.plans} />
                </div>
            </div>
        </Skeleton>
    );
}

export default ComparisonTable;
