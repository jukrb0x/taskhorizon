import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppConfig {
    showSidebar: boolean;
    sidebarWidth: number;
    setSidebarWidth: (width: number) => void;
    toggleSidebar: () => void;
}

const AppConfigStore: StateCreator<AppConfig> = (set) => ({
    showSidebar: true,
    sidebarWidth: 350,
    setSidebarWidth: (width: number) => set(() => ({ sidebarWidth: width })),
    toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar }))
});
const useAppConfigStore = create<AppConfig>()(
    devtools(persist(AppConfigStore, { name: 'app-config' }), {
        enabled: import.meta.env.MODE === 'development'
    })
);

export default useAppConfigStore;
