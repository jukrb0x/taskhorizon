import { http } from '@/apis/http';
import useUserStore from '@/store/user-store';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';
import { showNotification } from '@mantine/notifications';

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

const login = async (username: string, password: string) => {
    return await http.post<LoginResponse>('/auth/login', { username, password });
};

const signup = async (username: string, email: string, password: string) => {
    return await http.post<SignupResponse>('/auth/signup', { username, email, password });
};

const logout = async () => {
    useUserStore.getState().logout();
    const a = await mutate('/auth/user', null, { revalidate: true });
    showNotification({
        title: 'You have been logged out',
        message: 'Please log in again to continue'
    });
};

export { login, logout, signup };
