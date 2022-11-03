import AppRouterProvider from '@/routes/AppRouterProvider';
import './index.scss';
import { invoke } from '@tauri-apps/api';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const isTauri = () => window.__TAURI__;

function App() {
    // test demo
    if (false && isTauri()) {
        useEffect(() => {
            // invoke Tauri to show up the window
            invoke('app_ready');
        }, []);
    }

    return (
        <>
            <AppRouterProvider />
        </>
    );
}

export default App;
