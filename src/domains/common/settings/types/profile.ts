import { Company } from '@domains/user/dashboard/types';

export type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
    created_at: string;
    image?: string;
    zoho_org_id?: boolean;
    wafeq_key?: boolean;
    companies?: Company[];
};

export type UpdateUserRequest = {
    id: string;
    data: User;
};

export type UpdateProfileRequest = {
    name: string;
};

export type updatePasswordRequest = {
    new_password: string;
    old_password: string;
};
