import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserStoreState {
    username: string;
    email: string;
    setUsername: (username: string) => void;
    getUsername: () => string;
}

const UserStore: StateCreator<UserStoreState> = (set, get) => ({
    username: '',
    email: '',
    setUsername: (username: string) => set(() => ({ username })),
    getUsername: () => {
        if (get().username === '') {
            // initialize Lester as default user
            set(() => ({
                username: 'LongJohnTeabag',
                email: 't34b4g99@eyefind.info'
            }));
        }
        return get().username;
    }
});

const useUserStore = create<UserStoreState>()(
    devtools(persist(UserStore, { name: 'user-store' }), {
        enabled: import.meta.env.MODE === 'development'
    })
);

export default useUserStore;
