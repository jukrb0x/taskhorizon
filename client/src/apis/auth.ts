import { http } from '@/apis/http';
import useUserStore from '@/store/user-store';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';
import { showNotification } from '@mantine/notifications';
import { useUser } from '@/hooks';
import { useEventStore, useTodoStore } from '@/store';

interface LoginResponse {
    user: {
        username: string;
        email: string;
        uid: number;
    };
    token: string;
}

interface SignupResponse {
    id: number;
    email: string;
    username: string;
}

export const cleanAllCache = async () => {
    useUserStore.getState().logout();
    useTodoStore.setState({ todoList: [] });
    useEventStore.setState({ eventList: [] });
    await mutate(() => true, undefined, { revalidate: false });
};

export class AuthAPI {
    static login = async (username: string, password: string) => {
        return await http.post<LoginResponse>('/user/login', { username, password });
    };

    static signup = async (username: string, email: string, password: string) => {
        return await http.post<SignupResponse>('/user/signup', { username, email, password });
    };

    /**
     * @description Local logout
     */
    static logout = async () => {
        // unload all data
        showNotification({
            title: 'You have been logged out',
            message: 'Please log in again to continue'
        });
        setTimeout(async () => {
            window.location.href = '/';
            await cleanAllCache();
        }, 800);
    };
}
