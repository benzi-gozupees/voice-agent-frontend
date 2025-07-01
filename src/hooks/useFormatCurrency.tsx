import { currencyOptions } from '@src/constants/currency';

import { useAppSelector } from './store';

const checkCurrency = (currencyCode: string) =>
    currencyOptions.some((option: (typeof currencyOptions)[0]) => option.value === currencyCode);
const useFormatCurrency = () => {
    let { currency } = useAppSelector(state => state.company);

    const formatCurrency = (value?: number, showFractions = true, defaultValue?: number) => {
        defaultValue ||= 0;
        if (!checkCurrency(currency)) currency = 'AED';
        const amount = value ?? defaultValue;

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            maximumFractionDigits: showFractions && amount > 0 ? 2 : 0,
        }).format(amount);
    };

    return formatCurrency;
};

export default useFormatCurrency;
