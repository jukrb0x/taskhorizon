import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppConfig {
    showSideApp: boolean;
    sideAppWidth: number;
    setSideAppWidth: (width: number) => void;
    toggleSideApp: () => void;
    showSettings: boolean;
    toggleSettings: () => void;
}

const AppConfigStore: StateCreator<AppConfig> = (set) => ({
    showSideApp: true,
    sideAppWidth: 350,
    setSideAppWidth: (width: number) => set(() => ({ sideAppWidth: width })),
    toggleSideApp: () => set((state) => ({ showSideApp: !state.showSideApp })),
    showSettings: false,
    toggleSettings: () => set((state) => ({ showSettings: !state.showSettings }))
});
const useAppConfigStore = create<AppConfig>()(
    devtools(
        persist(AppConfigStore, {
            name: 'app-config',
            partialize: (state) => {
                const { showSettings, ...rest } = state;
                return {
                    ...rest
                };
            }
        }),
        {
            enabled: import.meta.env.MODE === 'development'
        }
    )
);

export default useAppConfigStore;
