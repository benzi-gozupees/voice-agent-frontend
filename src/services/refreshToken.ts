import axios from 'axios';

import { SERVER_URL } from '@src/config-global';
import { store } from '@store/store';

// eslint-disable-next-line arrow-body-style
export const updateRefreshToken = () => {
    const { refresh_token } = store.getState().auth;
    const response = axios.post(`${SERVER_URL}/user/auth/refresh-token`, {
        refresh_token,
    });

    return response;
};
