import axiosInstance from '@src/services/axiosInstance';

import {
AssistantResponse   
} from '../types';

export const getAssistants = async () =>
    axiosInstance
        .get<AssistantResponse>('/assistant')
        .then(res => res.data)
        .catch(err => {
            throw err;
        });



