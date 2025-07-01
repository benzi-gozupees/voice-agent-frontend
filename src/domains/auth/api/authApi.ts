import paths from '@src/routes/paths';
import axiosInstance from '@src/services/axiosInstance';

import { DirectLoginRequest, LoginRequest, LoginResponse, RegisterRequest } from '../types';

export const register = async (data: RegisterRequest) =>
    axiosInstance
        .post(`/user/public/payment`, data)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const login = async (data: LoginRequest) =>
    axiosInstance
        .post<LoginResponse>(`/user/${paths.authPaths.jwt.login}`, data)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const directLogin = async ({ token, redirectURL, sessionId }: DirectLoginRequest) =>
    axiosInstance
        .post<LoginResponse>(
            `/user/auth/direct-login`,
            { token, redirect_url: redirectURL },
            {
                headers: {
                    Authorization: `Bearer ${sessionId}`,
                    'X-Token': token,
                },
            }
        )
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const autoLogin = async () =>
    axiosInstance
        .get<any>(`/user/auth/auto-login`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const logout = async () =>
    axiosInstance
        .post(`/user/${paths.authPaths.jwt.logout}`)
        .then(res => res)
        .catch(err => {
            throw err;
        });

export const allPartners = async (payload: any) =>
    axiosInstance
        .get(`/user/auth/partners`, {
            params: payload,
        })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const forgotPassword = async (payload: any) =>
    axiosInstance
        .post(`/user/auth/forgot-password`, {
            email: payload.email,
        })
        .then(res => res)
        .catch(err => {
            throw err;
        });

export const resendOTP = async (payload: any) =>
    axiosInstance
        .post(`/user/auth/resend-otp`, payload)
        .then(res => res)
        .catch(err => {
            throw err;
        });

export const verifyOTPAndResetPassword = async (payload: any) =>
    axiosInstance
        .post(`/user/auth/reset-password`, payload)
        .then(res => res)
        .catch(err => {
            throw err;
        });
