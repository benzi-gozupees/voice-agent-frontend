import { format } from 'date-fns';

export const formatDate = (date: string | number | Date, errMessage?: string): string => {
    if (!date) return errMessage || 'Date not provided';
    return format(new Date(date), 'EEE dd MMM, yyyy');
};

export const formatTime = (date: string | Date): string => {
    if (!date) return 'Invalid Time';
    return format(new Date(date), 'hh:mm a');
};
