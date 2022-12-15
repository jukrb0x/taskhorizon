import { http, refillInterceptor } from '@/apis';
import useSWR from 'swr';
import useUserStore from '@/store/user-store';
import { useEffect } from 'react';

const fetcher = (url: string) => {
    http.interceptors.response.clear();
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

    const loggedOut = error && !data;

    refillInterceptor();

    return {
        user: data,
        isLoading: isLoading,
        error,
        loggedOut,
        mutate
    };
};
