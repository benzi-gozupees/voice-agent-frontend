// import { ChatProfile } from '@customTypes/chat';
// import axiosInstance from '@src/services/axiosInstance';

// type PostChatImageRequest = {
//     role: string;
//     file: File;
// };

// type PostChatMessageResponse = {
//     name: string;
//     mime_type: string;
//     url: string;
//     size: number;
//     extension: string;
// };

// type AzureTokenResponse = {
//     token: string;
//     user_id: string;
//     communication_user_id: string;
//     expires_on: string;
// };

// export const getAzureToken = async ({ role }: { role: string }) =>
//     axiosInstance
//         .get<AzureTokenResponse>(`/messaging/${role}/chats/azure-token`)
//         .then(res => res.data)
//         .catch(err => {
//             throw err;
//         });

// export const getChatProfiles = async ({ role }: { role: string }) =>
//     axiosInstance
//         .get<ChatProfile[]>(`/messaging/${role}/chats/profiles`)
//         .then(res => res.data)
//         .catch(err => {
//             throw err;
//         });

// export const postChatImage = async ({ role, file }: PostChatImageRequest) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     return axiosInstance
//         .post<PostChatMessageResponse>(`/messaging/${role}/chats/files`, formData)
//         .then(res => res.data)
//         .catch(err => {
//             throw err;
//         });
// };

// export const fetchMetadata = async ({ role, url }: any) =>
//     axiosInstance
//         .post(`/messaging/${role}/chats/url`, { url })
//         .then(res => res.data)
//         .catch(err => {
//             throw err;
//         });
