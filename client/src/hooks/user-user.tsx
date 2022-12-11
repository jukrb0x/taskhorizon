import { http } from '@/apis';
import useSWR from 'swr';

const fetcher = (url: string) => http.get(url).then((res) => res.data);

export const useUser = () => {
    const { data, error, isLoading } = useSWR('/auth/user', fetcher);

    const loggedIn = !error && data;

    return {
        user: data,
        isLoading: isLoading,
        isError: error,
        loggedIn
    };
};
