import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface Params {
    [key: string]: any;
}

class WafeqApiClient {
    private apiKey: string;

    private axiosInstance: AxiosInstance;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.axiosInstance = axios.create({
            baseURL: 'https://api.wafeq.com/v1/',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Api-Key ${this.apiKey}`,
            },
        });
    }

    async post<T>(endpoint: string, data: T): Promise<AxiosResponse<T>> {
        try {
            const response = await this.axiosInstance.post<T>(endpoint, data);

            return response;
        } catch (error: any) {
            if (error.response) {
                throw new Error(`${JSON.stringify(error.response.data)}`);
            } else {
                throw new Error(`Error: ${error.message}`);
            }
        }
    }

    async put<T>(endpoint: string, data: T): Promise<AxiosResponse<T>> {
        try {
            const response = await this.axiosInstance.put<T>(endpoint, data);

            return response;
        } catch (error: any) {
            if (error.response) {
                throw new Error(`${JSON.stringify(error.response.data)}`);
            } else {
                throw new Error(`Error: ${error.message}`);
            }
        }
    }

    async get<T>(endpoint: string, params?: Params): Promise<AxiosResponse<T>> {
        try {
            const response = await this.axiosInstance.get<T>(endpoint, { params });

            return response;
        } catch (error: any) {
            if (error.response) {
                throw new Error(`Error: ${error.response.status} ${error.response.statusText}`);
            } else {
                throw new Error(`Error: ${error.message}`);
            }
        }
    }

    // Add other methods like put, delete as needed with appropriate typings
}

export default WafeqApiClient;
