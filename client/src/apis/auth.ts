import { http } from '@/apis/http';
import { useUser } from '@/hooks';
import { useEventStore, useTodoStore } from '@/store';
import useUserStore from '@/store/user-store';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

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

const login = async (username: string, password: string) => {
    return await http.post<LoginResponse>('/user/login', { username, password });
};

const signup = async (username: string, email: string, password: string) => {
    return await http.post<SignupResponse>('/user/signup', { username, email, password });
};

/**
 * @description Local logout
 */
const logout = async () => {
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

export const AuthAPI = {
    login,
    signup,
    logout
};

if (import.meta.hot) import.meta.hot.acceptExports('default');
