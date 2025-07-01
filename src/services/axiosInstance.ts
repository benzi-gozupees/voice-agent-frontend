/* eslint-disable @typescript-eslint/dot-notation */
import axios from 'axios';

import { ErrorGenericResponse } from '@customTypes/general';
import { setAccessToken } from '@domains/auth/slices/auth';
import { SERVER_URL } from '@src/config-global';
import { store } from '@store/store';

// import handleLogout from './handleLogout';
import { updateRefreshToken } from './refreshToken';

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    // timeout: 15000,
    // signal: new AbortController().signal,
    withCredentials: true,
});

let isRefreshing = false;

async function getNewToken() {
    const response = await updateRefreshToken();
    const { data, status } = response;
    store.dispatch(
        setAccessToken({
            token: data?.data,
        })
    );
    return data?.data;
}

// Response interceptor to add the token to the request headers
axiosInstance.interceptors.request.use(
    async config => {
        try {
            const { token, refresh_token } = store.getState().auth;
            if (!token || !refresh_token) return config;
            config.headers['Authorization'] = `Bearer ${token}`;
            return config;
        } catch (err) {
            return Promise.reject(err);
        }
    },
    error => Promise.reject(error)
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
    response => {
        if (response.config.responseType === 'blob') return response;
        return response.data;
    },
    async error => {
        const originalRequest = error.config;
        const data: ErrorGenericResponse = error?.response?.data;
        if (data && data.response_code === '001' && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                if (!isRefreshing) {
                    isRefreshing = true;
                    const newToken = await getNewToken();
                    if (newToken) {
                        axiosInstance.defaults.headers.common['Authorization'] =
                            `Bearer ${newToken}`;
                        isRefreshing = false;
                        return await axiosInstance(originalRequest);
                    }
                    throw new Error('Failed to get new token');
                }
            } catch (err) {
                // handleLogout();
                isRefreshing = false;
                // toast.info('Session expired, Please login again');
            }
        } else if (data?.response_code === '002' || data?.response_code === '003') {
            // handleLogout();
            isRefreshing = false;
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
