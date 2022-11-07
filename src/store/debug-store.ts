import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface DebugStoreState {
    debugPanelStyle: 'side' | 'bottom';
    toggleDebugPanelStyle: () => void;
}

const DebugStore: StateCreator<DebugStoreState> = (set) => ({
    debugPanelStyle: 'bottom',
    toggleDebugPanelStyle: () =>
        set((state) => ({ debugPanelStyle: state.debugPanelStyle === 'side' ? 'bottom' : 'side' }))
});

const useDebugStore = create<DebugStoreState>()(
    devtools(persist(DebugStore, { name: 'debug-store' }), {
        enabled: import.meta.env.MODE === 'development'
    })
);

export default useDebugStore;
