import { DateValue } from '@internationalized/date';
import { DatePickerProps, DatePicker as NextDatePicker } from '@nextui-org/react';
import { Field, FieldProps, useFormikContext } from 'formik';

import ArrowDownIcon from '@assets/icons/arrow-down.svg?react';
import CalendarIcon from '@assets/icons/calendar.svg?react';

interface CustomDatePickerProps extends DatePickerProps {
    name?: string;
    disableFutureDates?: boolean;
    disabledDates?: Date[]; // New prop for disabled dates
    disablePastDates?: boolean;
}

const styles = {
    inputWrapper: 'h-[60px] border border-divider',
    label: 'font-medium',
};

// Convert DateValue to a standard Date object
const dateValueToDate = (dateValue: DateValue): Date =>
    new Date(dateValue.year, dateValue.month - 1, dateValue.day);

function stripTime(date: Date): Date {
    const strippedDate = new Date(date);
    strippedDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
    return strippedDate;
}

export default function DatePicker({
    name,
    disableFutureDates,
    disabledDates,
    disablePastDates,
    ...props
}: CustomDatePickerProps) {
    const formik = useFormikContext();

    const isDateUnavailable = (date: DateValue) => {
        const dateObj = dateValueToDate(date);
        const strippedDate = stripTime(dateObj);

        // Disable future dates if the prop is set
        if (disableFutureDates && strippedDate > stripTime(new Date())) {
            return true;
        }

        // Disable past dates if the prop is set
        if (disablePastDates && strippedDate < stripTime(new Date())) {
            return true;
        }

        // Check if the date is in the list of disabled dates
        if (
            disabledDates?.some(
                disabledDate =>
                    stripTime(disabledDate).toDateString() === strippedDate.toDateString()
            )
        ) {
            return true;
        }

        return false;
    };

    if (!name) {
        return (
            <NextDatePicker
                {...props}
                dateInputClassNames={styles}
                isDateUnavailable={isDateUnavailable}
                labelPlacement="outside"
                radius="md"
                size="md"
                variant="bordered"
            />
        );
    }
    if (!formik && name)
        return (
            <span className="text-danger">
                DatePicker with name must be wrapped in a Formik component
            </span>
        );
    return (
        <Field name={name}>
            {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => {
                const error = touched[name] && errors[name];
                return (
                    <NextDatePicker
                        {...field}
                        hideTimeZone
                        showMonthAndYearPickers
                        calendarProps={{}}
                        dateInputClassNames={{
                            base: 'gap-1',
                            inputWrapper: `h-[42px] border border-divider px-4 mt-0 pt-0`,
                            label: 'font-medium',
                        }}
                        errorMessage={error as string}
                        isDateUnavailable={isDateUnavailable}
                        isInvalid={!!error}
                        labelPlacement="outside"
                        radius="md"
                        selectorIcon={<ArrowDownIcon />}
                        size="md"
                        startContent={<CalendarIcon />}
                        timeInputProps={{}}
                        variant="bordered"
                        onChange={val => {
                            setFieldValue(name, val);
                        }}
                        {...props}
                    />
                );
            }}
        </Field>
    );
}
