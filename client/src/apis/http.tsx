import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import useUserStore from '@/store/user-store';
import userStore from '@/store/user-store';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';

const http = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/rest`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + useUserStore.getState().token
    }
});

const beforeRequest = (config: AxiosRequestConfig) => {
    const token = userStore.getState().token;
    token && config.headers && (config.headers.Authorization = 'Bearer ' + token);
    return config;
};

const responseSuccess = async (response: AxiosResponse) => {
    return await response.data;
};

interface BadRequest extends Error {
    name: string;
    message: string;
    status: number;
    errors: [];
}

const responseFailed = async (error: AxiosError<BadRequest>) => {
    const { response, code, message } = error;
    const notificationPayload = {
        title: code,
        message: message,
        color: 'red',
        icon: <IconX size={18} />
    };
    let errorMessageToThrow = 'Error';
    if (!window.navigator.onLine) {
        notificationPayload.title = 'Your are offline.';
        notificationPayload.message = 'Please check your network connection.';
        errorMessageToThrow = 'Your network is offline';
    } else if (response) {
        // notificationPayload.title = `Error ${response.status} ${response.statusText}`;
        notificationPayload.title = 'Something went wrong...';
        notificationPayload.message = response.data.message
            ? response.data.message
            : response.statusText;
        errorMessageToThrow = 'Error: ' + response.status + ' ' + response.statusText;
    }
    showNotification(notificationPayload);
    throw new Error(errorMessageToThrow);
};

http.interceptors.request.use(beforeRequest);
http.interceptors.response.use(responseSuccess, responseFailed);

export { http };
