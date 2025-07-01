import { CancelTokenSource } from 'axios';

import { Company } from '@domains/user/dashboard/types';

export type Expense = {
    _id: string;
    user: string;
    company: Company;
    type: string;
    category: string;
    currency: string;
    subcategory: string;
    amount: number;
    payment_method: string;
    date: string;
    file: any[];
    created_at: string;
    wafeq_expense_id: string;
    zoho_expense_id: string;
    merchant: string;
};

export type RawExpense = {
    _id: string;
    company: string;
    files: [
        {
            name: string;
            type: string;
            url: string;
            size: number;
            extension: string;
        },
    ];
    status: string;
    created_at: string;
    updated_at: string;
};
export type ExpenseResponse = {
    expenses: Expense[];
    total: number;
};

export type RawExpenseResponse = {
    expenses: RawExpense[];
    total: number;
};

export type ExpenseChart = {
    date: string;
    total: number;
};

export type ExpenseChartResponse = {
    expenses: ExpenseChart[];
    total: number;
};

export interface AddExpensePayload {
    company: string;
    amount: string;
    date: any;
    type: string;
    currency?: string;
    payment_method: string;
    category?: string;
    merchant: string;
    file: File[];
}

export interface EditExpensePayload {
    id: string;
    company: string;
    amount: string;
    category?: string;
    merchant: string;
    date: any;
    type: string;
    currency?: string;
    payment_method: string;
    file: File[];
}

export interface AddRawExpensePayload {
    company: string;
    file: File;
    progressCallback: (progress: number) => void;
    cancelToken?: CancelTokenSource;
}
