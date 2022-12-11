import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserStoreState {
    uid: number; // -1: local user
    username: string;
    email: string;
    setUsername: (username: string) => void;
    getUsername: () => string;
    token: string;
    logout: () => void;
}

const UserStore: StateCreator<UserStoreState> = (set, get) => ({
    uid: -1,
    username: '',
    email: '',
    setUsername: (username: string) => set(() => ({ username })),
    getUsername: () => {
        if (get().username === '') {
            // initialize Lester as default user
            set(() => ({
                uid: -1,
                username: 'LongJohnTeabag',
                email: 't34b4g99@eyefind.info'
            }));
        }
        return get().username;
    },
    token: '',
    logout: () => {
        set(() => ({
            uid: -1,
            username: '',
            email: '',
            token: ''
        }));
    }
});

const useUserStore = create<UserStoreState>()(
    devtools(persist(UserStore, { name: 'user-store' }), {
        enabled: import.meta.env.MODE === 'development'
    })
);

export default useUserStore;
