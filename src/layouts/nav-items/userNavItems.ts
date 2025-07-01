import bank from '@assets/icons/bank-2.svg?react';
import bankActive from '@assets/icons/bank-filled-2.svg?react';
import cfoActive from '@assets/icons/briefcase-filled.svg?react';
import cfo from '@assets/icons/briefcase.svg?react';
import dashboard from '@assets/icons/dashboard.svg?react';
import dashboardActive from '@assets/icons/dashboard_filled.svg?react';
import expenseActive from '@assets/icons/dollar-filled.svg?react';
import payments from '@assets/icons/dollar-square-2.svg?react';
import paymentsActive from '@assets/icons/dollar-square-filled.svg?react';
import expense from '@assets/icons/expense.svg?react';
import invoiceActive from '@assets/icons/invoice-filled.svg?react';
import invoice from '@assets/icons/invoice.svg?react';
import reports from '@assets/icons/report.svg?react';
import reportsActive from '@assets/icons/reports-filled.svg?react';
import taskActive from '@assets/icons/task-filled.svg?react';
import task from '@assets/icons/task.svg?react';
import taxActive from '@assets/icons/tax-filled.svg?react';
import tax from '@assets/icons/tax.svg?react';
import usersActive from '@assets/icons/users-filled.svg?react';
import users from '@assets/icons/users.svg?react';


export type NavItem = {
    id: string;
    title: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    activeIcon: React.FC<React.SVGProps<SVGSVGElement>>;
    index: string;
    routes: string[];
    showAlways?: boolean;
};

const userNavItems: NavItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: dashboard,
        activeIcon: dashboardActive,
        index: '/dashboard',
        routes: ['/dashboard'],
        showAlways: true,
    },
    {
        id: 'assistants',
        title: 'Assistants',
        icon: users,
        activeIcon: usersActive,
        index: '/assistant',
        routes: ['/assistant'],
        showAlways: true,
    },
    // {
    //     id: 'appointments',
    //     title: 'Appointments',
    //     icon: reports,
    //     activeIcon: reports,
    //     index: '/appointments',
    //     routes: ['/appointments'],
    //     showAlways: true,
    // },
    // {
    //     id: 'callLogs',
    //     title: 'Call Logs',
    //     icon: reports,
    //     activeIcon: reportsActive,
    //     index: '/call-logs',
    //     routes: ['/call-logs'],
    //     showAlways: true,
    // },
    //     {
    //     id: 'calendar',
    //     title: 'Calendar',
    //     icon: task,
    //     activeIcon: taskActive,
    //     index: '/calendar',
    //     routes: ['/calendar'],
    //     showAlways: true,
    // },
    //         {
    //     id: 'account',
    //     title: 'Account',
    //     icon: invoice,
    //     activeIcon: invoiceActive,
    //     index: '/account',
    //     routes: ['/account'],
    //     showAlways: true,
    // },
    // {
    //     title: 'Meetings',
    //     icon: meeting,
    //     activeIcon: meetingActive,
    //     index: '/meetings/schedule',
    //     routes: ['/meetings/schedule', '/meetings/calendar', '/meetings/schedule/:id'],
    // },
];

export default userNavItems;
