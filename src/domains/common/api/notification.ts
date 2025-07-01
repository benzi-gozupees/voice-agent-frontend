import { AllNotificationsRequest, AllNotificationsResponse } from '@customTypes/notification';
import axiosInstance from '@src/services/axiosInstance';

export const allNotifications = async (role: string, payload: AllNotificationsRequest) =>
    axiosInstance
        .get<AllNotificationsResponse>(`/messaging/${role}/notifications`, {
            params: payload,
        })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const updateLastseen = async (role: string, date: string) =>
    axiosInstance
        .post(`/messaging/${role}/notifications/last-seen`, { last_seen: date })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });

export const markNotificationRead = async (role: string, id: string, notification_ids?: string[]) =>
    axiosInstance
        .patch(`/messaging/${role}/notifications/${id}/read`, { notification_ids })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
