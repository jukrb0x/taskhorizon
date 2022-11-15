import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppConfig {
    sidebarWidth: number;
    setSidebarWidth: (width: number) => void;
}

const AppConfigStore: StateCreator<AppConfig> = (set) => ({
    sidebarWidth: 350,
    setSidebarWidth: (width: number) => set(() => ({ sidebarWidth: width }))
});
const useAppConfigStore = create<AppConfig>()(
    devtools(persist(AppConfigStore, { name: 'app-config' }), {
        enabled: import.meta.env.MODE === 'development'
    })
);

export default useAppConfigStore;
