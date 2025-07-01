import cfo from '@assets/icons/briefcase.svg?react';
import dashboard from '@assets/icons/dashboard.svg?react';
import expense from '@assets/icons/expense.svg?react';
import invoice from '@assets/icons/invoice.svg?react';
import meeting from '@assets/icons/messaging.svg?react';
import settings from '@assets/icons/settings.svg?react';
import task from '@assets/icons/task.svg?react';
import tax from '@assets/icons/tax.svg?react';

export default [
    {
        icon: dashboard,
        page: 'Dashboard',
        route: '/dashboard',
        keywords: ['overview', 'summary', 'performance', 'dashboard'],
        subRoutes: [
            { name: 'Statistics', route: '/dashboard#statistics' },
            { name: 'Expenses', route: '/dashboard#expenses' },
            { name: 'Revenue', route: '/dashboard#revenue' },
        ],
    },
    {
        icon: task,
        page: 'Tasks',
        route: '/tasks',
        keywords: ['tasks', 'pending'],
        subRoutes: [{ name: 'All Tasks', route: '/checklist#all' }],
    },
    {
        icon: expense,
        page: 'Expenses',
        route: '/expenses',
        keywords: ['expense', 'add expense', 'bills'],
        subRoutes: [
            { name: 'Add Expense', route: '/expenses#new' },
            { name: 'View all Expenses', route: '/expenses#all' },
        ],
    },
    {
        icon: invoice,
        page: 'Invoices',
        route: '/invoices',
        keywords: ['invoice', 'add invoice', 'customer'],
        subRoutes: [
            { name: 'Add Invoice', route: '/invoices#new' },
            { name: 'View all Invoices', route: '/invoices#all' },
            { name: 'Invoices Customers', route: '/invoices/customers' },
        ],
    },
    {
        icon: tax,
        page: 'Tax Filing',
        route: '/tax-filing/recent',
        keywords: ['tax', 'tax filing', 'previous', 'recent'],
        subRoutes: [
            { name: 'Tax Filing', route: '/tax-filing/recent' },
            // { name: 'Previous Filing', route: '/tax-filing/previous' },
        ],
    },
    {
        icon: cfo,
        page: 'CFO Services',
        route: '/cfo-services',
        keywords: ['cfo', 'cfo services', 'request', 'my request'],
        subRoutes: [
            { name: 'View all services', route: '/cfo-services' },
            { name: 'My requests', route: '/cfo-services/my-requests' },
        ],
    },
    {
        icon: meeting,
        page: 'Meetings',
        route: '/meetings/schedule',
        keywords: ['meeting', 'book meetings', 'schedule', 'calendar'],
        subRoutes: [
            { name: 'View all meetings', route: '/meetings/schedule#all' },
            { name: 'My Schedules', route: '/meetings/schedule' },
            { name: 'My Calendar', route: '/meetings/calendar' },
        ],
    },
    {
        icon: settings,
        page: 'Account Settings',
        route: '/settings/profile',
        keywords: ['profile', 'change profile', 'plans', 'edit profile', 'subscription'],
        subRoutes: [
            { name: 'My Profile', route: '/settings/profile' },
            { name: 'Change Password', route: '/settings/change-password' },
            { name: 'My Plans', route: '/settings/my-plans' },
            { name: 'Softwares', route: '/settings/softwares' },
        ],
    },
];
