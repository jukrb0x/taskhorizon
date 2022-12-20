import { AuthAPI, http, refillHttpInterceptor } from '@/apis';
import useSWR, { useSWRConfig } from 'swr';
import useUserStore from '@/store/user-store';

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
    const { mutate: globalMutate } = useSWRConfig();
    const { data, error, isLoading, mutate } = useSWR<Response>('/user', fetcher, {
        onSuccess: (data) => {
            if (data) {
                useUserStore.setState({ ...data.user });
            }
        },
        onError: async () => {
            // TODO: currently, if server is down, client will be shut down too
            //       this is not expected behavior, we want a better recovery solution
            useUserStore.setState({ uid: -1, username: '', email: '', token: '' });
            await mutate(undefined, { revalidate: true });
        }
    });
    const { uid, username, email } = useUserStore();

    function checkStoreUserStale(data: Response) {
        if (
            data &&
            (data.user.uid !== uid || data.user.username !== username || data.user.email !== email)
        ) {
            mutate().catch((err) => {
                console.log(err);
            });
        }
    }

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
