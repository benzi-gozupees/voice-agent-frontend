import axiosInstance from '@src/services/axiosInstance';

import { AllStatsResponse } from '../types';

export const allStats = async () =>
    axiosInstance
        .get<AllStatsResponse>('/user/admin/dashboard/stats')
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const getUserCharts = async (payload: { from: string; to: string }) =>
    axiosInstance
        .get<any>(`/user/admin/users/charts`, { params: payload })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const allAlerts = async () =>
    axiosInstance
        .get<any>('/user/admin/dashboard/alerts')
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const allSupportStats = async () =>
    axiosInstance
        .get('/messaging/admin/complaints/stats')
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
