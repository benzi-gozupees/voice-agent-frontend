export enum UserRole {
    USER = 'TENANT',
    PARTNER = 'PARTNER',
    ADMIN = 'ADMIN',
    ACCOUNTANT = 'ACCOUNTANT',
}

export type SuccessGenericResponse<T> = {
    status: boolean;
    message: string;
    response_code: string;
    data: T;
};

export type ErrorGenericResponse = {
    status: boolean;
    message: string;
    response_code: string;
    data: {};
};

export type DropDown = {
    label: string;
    value: string;
}[];

export interface ServicesListResponse {
    data: {
        serviceCategory: string;
        hasAccess: boolean;
        services: Service[];
    }[];
}

export interface Service {
    service: string;
    serviceCategory: string;
    hasAccess: boolean;
    services: SubService[];
}

export interface SubService {
    serviceProvider: string;
    serviceType: string;
    service: string;
    hasAccess: boolean;
}

export interface FileUrl {
    url: string;
    _id: string;
    name: string;
    size: number;
    type: string;
    extension: string;
}
