import { http } from '@/apis/http';
import useUserStore from '@/store/user-store';

const login = async (username: string, password: string) => {
    return await http.post('/auth/login', { username, password });
};

const signup = async (username: string, email: string, password: string) => {
    return await http.post('/auth/signup', { username, email, password });
};

const logout = () => {
    useUserStore().logout();
};

export { login, logout, signup };
