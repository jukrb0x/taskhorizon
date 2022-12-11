import { http } from '@/apis/http';
import useUserStore from '@/store/user-store';

const login = async (username: string, password: string) => {
    const res = await http.post('/auth/login', { username, password });
    const { data, token } = res.data;
    console.log('login: ', data, token);
};

const logout = () => {
    useUserStore().logout();
};

export { login, logout };
