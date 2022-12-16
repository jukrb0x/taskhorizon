import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type DebugPanelStyle = 'side' | 'modal';

interface DebugStoreState {
    debugPanelStyle: DebugPanelStyle;
    toggleDebugPanelStyle: () => void;
}

const DebugStore: StateCreator<DebugStoreState> = (set) => ({
    debugPanelStyle: 'modal',
    toggleDebugPanelStyle: () =>
        set((state) => ({ debugPanelStyle: state.debugPanelStyle === 'side' ? 'modal' : 'side' }))
});

export const useDebugStore = create<DebugStoreState>()(
    devtools(persist(DebugStore, { name: 'debug-store' }), {
        enabled: import.meta.env.MODE === 'development'
    })
);
