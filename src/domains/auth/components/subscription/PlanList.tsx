import React, { useMemo } from 'react';

import { Tab, Tabs } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import { allPlans } from '../../api/subscriptionApi';
import { Plan } from '../../types';

import PlanCard from './PlanCard';

function PlanList() {
    const [selected, setSelected] = React.useState('monthly');
    const { data, isLoading, error } = useQuery({
        queryKey: ['allPlansForCard', selected],
        queryFn: () => allPlans(selected),
        enabled: true,
    });

    const sortedPlans = useMemo(
        () => [...(data?.plans || [])].sort((a, b) => a.price - b.price),
        [data?.plans]
    );

    if (error) {
        return <div>Error loading plans</div>;
    }

    return (
        <div className="flex w-full flex-col items-center mt-2">
            <Tabs
                aria-label="Options"
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
                <Tab key="monthly" title="Monthly">
                    <div className="sm:py-7 sm:flex-row flex flex-col gap-3 sm:gap-8 mt-8 sm:mt-0">
                        {sortedPlans?.map((item: Plan, index: number) => (
                            <PlanCard
                                key={item._id}
                                data={item}
                                defaultPlan={index === 0}
                                isLoading={isLoading}
                            />
                        ))}
                    </div>
                </Tab>
                <Tab key="yearly" title="Yearly">
                    <div className="sm:py-7 sm:flex-row flex flex-col gap-3 sm:gap-8 mt-8 sm:mt-0">
                        {sortedPlans?.map((item: Plan, index: number) => (
                            <PlanCard
                                key={item._id}
                                data={item}
                                defaultPlan={index === 0}
                                isLoading={isLoading}
                            />
                        ))}
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}

export default PlanList;
