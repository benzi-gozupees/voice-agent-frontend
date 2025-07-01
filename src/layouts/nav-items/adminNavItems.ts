import cfoActive from '@assets/icons/briefcase-filled.svg?react';
import cfo from '@assets/icons/briefcase.svg?react';
import dashboard from '@assets/icons/dashboard.svg?react';
import dashboardActive from '@assets/icons/dashboard_filled.svg?react';
import notification from '@assets/icons/notification-bing.svg?react';
import notificationActive from '@assets/icons/notification-filled.svg?react';
import subscription from '@assets/icons/subscription.svg?react';
import subscriptionActive from '@assets/icons/subscription_filled.svg?react';
import taxActive from '@assets/icons/tax-filled.svg?react';
import tax from '@assets/icons/tax.svg?react';
import time from '@assets/icons/time.svg?react';
import timeActive from '@assets/icons/time_filled.svg?react';
import usersActive from '@assets/icons/users-filled.svg?react';
import users from '@assets/icons/users.svg?react';

type Nav = {
    id: string;
    title: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    activeIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
    index: string;
    routes: string[];
    showAlways?: boolean;
};

const adminNavItems: Nav[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: dashboard,
        activeIcon: dashboardActive,
        index: '/admin/dashboard',
        routes: ['/admin/dashboard'],
        showAlways: true,
    },
    {
        id: 'users',
        title: 'Users',
        icon: users,
        activeIcon: usersActive,
        index: '/admin/users',
        routes: ['/admin/users'],
    },
    {
        id: 'services',
        title: 'CFO Services',
        icon: cfo,
        activeIcon: cfoActive,
        index: '/admin/services',
        routes: ['/admin/services'],
    },
    {
        id: 'subscription',
        title: 'Subscription',
        icon: subscription,
        activeIcon: subscriptionActive,
        index: '/admin/subscription/plans',
        routes: ['/admin/subscription/plans', '/admin/subscription/coupons'],
    },
    {
        id: 'notifications',
        title: 'Notifications',
        icon: notification,
        activeIcon: notificationActive,
        index: '/admin/notifications',
        routes: ['/admin/notifications'],
    },
    {
        id: 'settlements',
        title: 'Settlements',
        icon: tax,
        activeIcon: taxActive,
        index: '/admin/settlements',
        routes: ['/admin/settlements'],
    },
    {
        id: 'reminders',
        title: 'Reminders',
        icon: time,
        activeIcon: timeActive,
        index: '/admin/reminders',
        routes: ['/admin/reminders'],
    },
    {
        id: 'roles',
        title: 'Roles',
        icon: users,
        activeIcon: usersActive,
        index: '/admin/roles',
        routes: ['/admin/roles'],
    },
    {
        id: 'support',
        title: 'Support',
        icon: subscription,
        activeIcon: subscriptionActive,
        index: '/admin/support',
        routes: ['/admin/support'],
    },
];

export default adminNavItems;
