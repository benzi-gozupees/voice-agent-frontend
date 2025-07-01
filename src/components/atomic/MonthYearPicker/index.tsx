import type { DateValue } from '@react-types/calendar';

import { useState } from 'react';

import { parseDate } from '@internationalized/date';
import { Calendar } from '@nextui-org/react';
import { format } from 'date-fns';
import { useDebouncedCallback } from 'use-debounce';

const DEBOUNCE_TIME = 100;

type MonthYearPickerProps = {
    value?: Date;
    onChange: (date: Date) => void;
    onClose?: () => void;
};

export default function MonthYearPicker({ value, onChange, onClose }: MonthYearPickerProps) {
    value ||= new Date();
    const today = format(value, 'yyyy-MM-dd');
    const [date, setDate] = useState<DateValue>(parseDate(today));

    const debouncedOnChange = useDebouncedCallback(newDate => {
        const val = new Date(newDate.toString());
        onChange(val);
    }, DEBOUNCE_TIME);

    return (
        <Calendar
            isHeaderExpanded
            showMonthAndYearPickers
            aria-label="Month and Year Picker"
            classNames={{
                base: 'bg-light shadow-none rounded-3xl',
                headerWrapper: 'hidden',
                pickerItem: 'text-secondary h-10 min-h-10 font-medium text-md',
                pickerHighlight: 'border-y rounded-none bg-transparent h-10',
            }}
            color="primary"
            focusedValue={date}
            showShadow={false}
            onFocusChange={newDate => {
                setDate(newDate);
                debouncedOnChange(newDate);
            }}
        />
    );
}
