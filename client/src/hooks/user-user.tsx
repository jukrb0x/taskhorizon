import { http } from '@/apis';
import useSWR from 'swr';
import useUserStore from '@/store/user-store';
import { useEffect } from 'react';

http.interceptors.response.clear();
const fetcher = (url: string) => http.get(url).then((res) => res.data);

interface Response {
    user: {
        uid: number;
        username: string;
        email: string;
    };
}

export const useUser = () => {
    const { data, error, isLoading, mutate } = useSWR<Response>('/auth/user', fetcher);
    // console.log(error.response.status);

    const loggedOut = error && !data;

    return {
        user: data,
        isLoading: isLoading,
        error,
        loggedOut,
        mutate
    };
};
