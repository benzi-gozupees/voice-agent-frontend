export type AllNotificationsRequest = {
    page: number;
    limit: number;
    search: string;
    status: string;
    company?: string;
};

export type Link = {
    url: string;
    title: string;
};

interface Notification {
    _id: string;
    title: string;
    message: string;
    created_at: string;
    updated_at: string;
    links?: Link[];
    type: string;
}

export type AllNotificationsResponse = {
    notifications: Notification[];
    total: number;
    total_unread: number;
};
