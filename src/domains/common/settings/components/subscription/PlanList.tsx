import React from 'react';

import { Tab, Tabs } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import { allPlans } from '@domains/auth/api/subscriptionApi';
import { Plan } from '@domains/auth/types';

import PlanCard from './PlanCard';

function PlanList({
    planPriceId,
    toggle,
    isFree,
    isActive,
}: {
    planPriceId: string;
    toggle: () => void;
    isFree: boolean;
    isActive: boolean;
}) {
    const [selected, setSelected] = React.useState('monthly');
    const { data, isLoading, error } = useQuery({
        queryKey: ['allPlansForCard', selected],
        queryFn: () => allPlans(selected),
    });
    const currentPlanPriceId = planPriceId;
    const currentPlan = data?.plans.find(
        (plan: Plan) => plan?.stripe_price_id === currentPlanPriceId
    );

    const currentPlanPrice = currentPlan?.price || 0;

    const monthData = data?.plans
        .filter(
            (plan: Plan) =>
                plan?.title !== 'Free' && (isActive ? plan.price >= currentPlanPrice : true)
        )
        .map((plan: Plan) => ({
            ...plan,
            isFeatured: plan?.stripe_price_id === currentPlanPriceId,
        }));
    return (
        <div>
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
                        <div className="sm:py-7 sm:flex-row flex flex-col gap-3 sm:gap-8">
                            {monthData?.map((item: Plan, index: number) => (
                                <PlanCard
                                    key={item?._id}
                                    data={item}
                                    defaultPlan={planPriceId === item.stripe_price_id}
                                    isActive={isActive}
                                    isFree={isFree}
                                    toggle={toggle}
                                />
                            ))}
                        </div>
                    </Tab>
                    <Tab key="yearly" title="Yearly">
                        <div className="sm:py-7 sm:flex-row flex flex-col gap-3 sm:gap-8">
                            {monthData?.map((item: Plan, index: number) => (
                                <PlanCard
                                    key={item?._id}
                                    data={item}
                                    defaultPlan={planPriceId === item.stripe_price_id}
                                    isActive={isActive}
                                    isFree={isFree}
                                    toggle={toggle}
                                />
                            ))}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default PlanList;
