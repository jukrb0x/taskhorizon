import { http, refillHttpInterceptor } from '@/apis';
import useSWR from 'swr';
import useUserStore from '@/store/user-store';
import { useEffect } from 'react';

const fetcher = (url: string) => {
    http.interceptors.response.clear(); // clear all notification
    return http.get(url).then((res) => res.data);
};

interface Response {
    user: {
        uid: number;
        username: string;
        email: string;
    };
}

export const useUser = () => {
    const { data, error, isLoading, mutate } = useSWR<Response>('/user', fetcher);
    const { uid, username, email } = useUserStore();

    useEffect(() => {
        // check if user data stale
        if (
            data &&
            (data.user.uid !== uid || data.user.username !== username || data.user.email !== email)
        ) {
            mutate().catch((err) => {
                console.log(err);
            });
        }
    }, [data, uid, username, email]);

    const loggedOut = error && !data;

    refillHttpInterceptor(); // refill notification

    return {
        user: data?.user,
        isLoading: isLoading,
        error,
        loggedOut,
        mutate
    };
};
