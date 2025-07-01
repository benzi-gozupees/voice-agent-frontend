/* eslint-disable react/function-component-definition */
import React from 'react';

import { ReactSVG } from 'react-svg';

import crossIcon from '@assets/icons/crossRed.svg';

import { Plan } from '../../types';

type PlanTableProps = {
    plans: Plan[];
};

const PlanTable: React.FC<PlanTableProps> = ({ plans }) => {
    const uniqueLimitations = Array.from(
        new Set(plans?.flatMap(plan => plan?.limitations?.map(l => l.name)))
    );

    return (
        <div className="overflow-x-auto" style={{ borderRadius: '48px' }}>
            <table className="min-w-full divide-y divide-gray-200 border border-[#EFF1F5]">
                <thead className="bg-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-[#EFF1F5]" />
                        {plans?.map(plan => (
                            <th
                                key={plan._id}
                                className="px-6 py-4 font-semibold tracking-wider text-center border-r border-[#EFF1F5]"
                            >
                                {plan.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {uniqueLimitations?.map(limitation => (
                        <tr key={limitation}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-[#EFF1F5]">
                                {limitation}
                            </td>
                            {plans?.map(plan => {
                                const limit = plan.limitations.find(l => l.name === limitation);
                                return (
                                    <td
                                        key={plan._id}
                                        className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 border-r border-[#EFF1F5]"
                                    >
                                        {limit?.is_unlimited ? 'Unlimited' : null}
                                        {!limit?.is_unlimited &&
                                        limit?.is_available &&
                                        limit.count > 0
                                            ? limit.count
                                            : null}
                                        {!limit?.is_unlimited && !limit?.is_available && (
                                            <ReactSVG
                                                className="inline-block text-red-500"
                                                src={crossIcon}
                                            />
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlanTable;
