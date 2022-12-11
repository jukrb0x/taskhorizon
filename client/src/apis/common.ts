import { http } from '@/apis/http';
import useUserStore from '@/store/user-store';

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

const logout = () => {
    useUserStore().logout();
};

export { login, logout, signup };
