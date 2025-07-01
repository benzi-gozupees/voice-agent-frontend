import BackButton from '@components/atomic/Button/BackButton';
import PlanList from '@src/domains/auth/components/subscription/PlanList';

import ComparisonTable from '../components/subscription/ComparisonTable';

function Subscription() {
    document.title = 'Welcome to GoZupees';
    return (
        <div className="bg-[#EFF1F5]">
            <div className="flex w-full flex-col items-center sm:scale-90">
                <div className="flex w-full flex-col items-center sm:scale-90 p-4 py-10 sm:p-0 sm:py-0">
                    <div className="flex w-full justify-between">
                        <BackButton />
                        <h1 className="text-4xl mb-2 text-center font-semibold flex-1">
                            Choose a plan to continue
                        </h1>
                        <div className="w-10" />
                    </div>
                    <h5 className="text-xl mb-2 text-center">
                        We believe GoZupees should be accessible to all companies, no matter the size.
                    </h5>
                </div>

                <div className="flex flex-col gap-7">
                    <PlanList />
                    <ComparisonTable />
                </div>
            </div>
        </div>
    );
}

export default Subscription;
