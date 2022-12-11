import { http } from '@/apis';
import useSWR from 'swr';

const fetcher = (url: string) => http.get(url).then((res) => res.data());

export const useUser = () => {
    const { data, error, isLoading } = useSWR('/auth/user', fetcher);

    const loggedOut = error && error.status === 401;

    return {
        user: data,
        isLoading: isLoading,
        isError: error,
        loggedOut
    };
};
