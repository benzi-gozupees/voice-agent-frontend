export type AccessLevel = {
    is_super_admin: boolean;
    permissions: {
        route: string;
        parent: string;
        service: string;
        created_at: string;
    }[];
};

export type ServiceResponse = {
    services: string[];
    allow_all_services: boolean;
};
