import { currencyOptions } from '@src/constants/currency';

const checkCurrency = (currencyCode: string) =>
    currencyOptions.some((option: (typeof currencyOptions)[0]) => option.value === currencyCode);

export const formatCurrency = (
    value?: number,
    currency = 'AED',
    showFractions = true,
    defaultValue?: number
) => {
    defaultValue ||= 0;
    if (!checkCurrency(currency)) currency = 'AED';
    if (!value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            maximumFractionDigits: showFractions && defaultValue > 0 ? 2 : 0,
        }).format(defaultValue);
    }
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: showFractions && value > 0 ? 2 : 0,
    }).format(value);
};
