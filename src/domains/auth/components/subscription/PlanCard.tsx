/* eslint-disable no-unsafe-optional-chaining */

import React from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import arrowIcon from '@assets/icons/arrow_pointer.svg';
import crossIcon from '@assets/icons/cross.svg';
import tickIcon from '@assets/icons/tick.svg';
import Button from '@components/atomic/Button';
import Skeleton from '@components/atomic/Skeleton';

import { Plan } from '../../types';

interface PlanCardProps {
    defaultPlan: boolean;
    data: Plan;
    isLoading: boolean;
}

// eslint-disable-next-line react/function-component-definition
const PlanCard: React.FC<PlanCardProps> = ({ defaultPlan, data, isLoading }) => {
    const [searchParams] = useSearchParams();
    const partnerId = searchParams.get('partner');
    const referralCode = searchParams.get('referral_code');

    const navigate = useNavigate();
    const handleClick = (Plandata: Plan) => {
        navigate(
            `/register?plan=${Plandata?._id}${
                partnerId ? `&partner=${partnerId}` : ''
            }${referralCode ? `&referral_code=${referralCode}` : ''}`
        );
    };

    if (isLoading) return <Skeleton className="h-[200px] flex-1" />;

    return (
        <div
            className={`${defaultPlan ? 'bg-secondary' : 'bg-white'} relative max-w-96 flex flex-col ${defaultPlan ? 'text-[#D2D2D2]' : 'text-black'} shadow-lg  p-8`}
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
                    /month
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
                className={`${defaultPlan ? 'bg-white' : 'bg-GoZupees-blue text-white hover:text-white'} w-full`}
                onClick={() => handleClick(data)}
            >
                Continue
            </Button>
        </div>
    );
};

export default PlanCard;
