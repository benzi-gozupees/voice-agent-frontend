/* eslint-disable no-unsafe-optional-chaining */

import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { toast } from 'sonner';

import crossIcon from '@assets/icons/cross.svg';
import arrowIcon from '@assets/icons/current_plan.svg';
import tickIcon from '@assets/icons/tick.svg';
import Button from '@components/atomic/Button';
import { Plan } from '@domains/auth/types';
import { useAppSelector } from '@hooks/store';

import { upgradeFreePlanPaymentRequest, upgradePlanPaymentRequest } from '../../api/subscription';

interface PlanCardProps {
    defaultPlan: boolean;
    data: Plan;
    toggle: () => void;
    isFree: boolean;
    isActive: boolean;
}

// eslint-disable-next-line react/function-component-definition
const PlanCard: React.FC<PlanCardProps> = ({ defaultPlan, data, toggle, isFree, isActive }) => {
    const navigate = useNavigate();
    const company = useAppSelector(state => state.company);
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: upgradePlanPaymentRequest,
        onSuccess: Data => {
            if (Data?.url) {
                // toggle();
                toast.success('Redirecting to confirmation page...');
                window.location.href = Data.url;
            }
            queryClient.invalidateQueries({ queryKey: ['subscriptionCards'] });
            queryClient.invalidateQueries({ queryKey: ['subscriptionInvoices'] });
            queryClient.invalidateQueries({ queryKey: ['serviceLimitations', company?._id] });
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Something went wrong';
            toast.error(message);
        },
    });
    const { mutate: FreeMutate } = useMutation({
        mutationFn: upgradeFreePlanPaymentRequest,
        onSuccess: Data => {
            if (Data?.session.url) {
                // toggle();
                toast.success('Redirecting to confirmation page...');
                window.location.href = Data.session.url;
            }
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Something went wrong';
            toast.error(message);
        },
    });
    const handleClick = (Plandata: Plan) => {
        // navigate(`/register?plan=${Plandata?._id}`);
        if (isFree) {
            // console.log('freeeeeeeeeeeee');

            FreeMutate({ planId: Plandata?._id, company: company?._id });
        } else {
            // console.log('Paidddddddddddddddd');
            mutate({ planId: Plandata?._id, company: company?._id });
        }

        toggle();
    };
    return (
        <div
            className={` ${defaultPlan ? 'bg-secondary' : 'bg-white'} relative max-w-96 h-full flex flex-col ${defaultPlan ? 'text-[#D2D2D2]' : 'text-black'} border  p-8`}
            style={{ borderRadius: '48px' }}
        >
            {defaultPlan ? (
                <div className="absolute top-[-33px] left-0 right-0 flex justify-center">
                    <ReactSVG
                        className={`svg-icon ${defaultPlan ? 'text-[#D2D2D2]' : 'text-black'}`}
                        src={arrowIcon}
                    />
                </div>
            ) : null}
            <h1
                className={` ${defaultPlan ? 'text-white' : 'text-black'} text-4xl py-1 font-semibold`}
            >
                AED {data?.offer_price}{' '}
                <span
                    className={` text-lg font-medium  ${defaultPlan ? 'text-[#D2D2D2]' : 'text-[#475467]'}`}
                >
                    {data?.offer_price && data?.price ? (
                        <span className=" line-through">{data.price}</span>
                    ) : null}
                    /{data?.duration === 'monthly' ? 'month' : 'year'}
                </span>
            </h1>
            <h3 className={`${defaultPlan ? 'text-white' : 'text-black'} font-semibold`}>
                {data?.title}
                {data?.offer_price && data?.price ? (
                    <span className="bg-[#ECFEED] text-success text-xs ms-1">
                        {`${(((data.price - data.offer_price) / data.price) * 100).toFixed(2)}% off`}
                    </span>
                ) : null}
            </h3>
            <p className=" text-sm mt-1 leading-relaxed">{data?.description}</p>
            <ul className="py-7 flex flex-1 flex-col gap-3">
                {data?.available_benefits.map((item: string, index: number) => (
                    <li key={index} className="flex gap-3">
                        <ReactSVG className="text-gray-500" src={tickIcon} />
                        {item}
                    </li>
                ))}
                {data?.unavailable_benefits.map((item: string, index: number) => (
                    <li key={index} className="flex gap-3">
                        <ReactSVG
                            className={`svg-icon ${defaultPlan ? 'text-[#D2D2D2]' : 'text-black'}`}
                            src={crossIcon}
                        />
                        {item}
                    </li>
                ))}
            </ul>
            <Button
                className={`${defaultPlan && isActive ? 'hidden' : 'bg-GoZupees-blue text-white'} w-full`}
                onClick={() => handleClick(data)}
            >
                Continue
            </Button>
        </div>
    );
};

export default PlanCard;
