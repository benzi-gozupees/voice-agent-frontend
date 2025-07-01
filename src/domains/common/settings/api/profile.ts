import axiosInstance from '@src/services/axiosInstance';

import { UpdateProfileRequest, UpdateUserRequest, updatePasswordRequest } from '../types/profile';

export const getProfile: any = async (role: string) =>
    axiosInstance
        .get(`/user/${role}/profile`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const updateProfile = async (role: string, payload: UpdateProfileRequest) =>
    axiosInstance
        .patch(`/user/${role}/profile`, payload)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const updatePassword = async (role: string, payload: updatePasswordRequest) =>
    axiosInstance
        .patch(`/user/${role}/profile/password`, payload)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const updateProfileImage = async (role: string, payload: FormData) =>
    axiosInstance
        .patch(`/user/${role}/profile/image`, payload)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getAccountantById = async (id: string) =>
    axiosInstance
        .get<any>(`/user/accountant/profile/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const updateAccountant = async ({ id, data }: UpdateUserRequest) =>
    axiosInstance
        .put(`/user/accountant/profile/${id}`, data)
        .then(res => res)
        .catch(err => {
            throw err;
        });
