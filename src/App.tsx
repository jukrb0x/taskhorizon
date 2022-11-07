import './index.scss';
import { invoke } from '@tauri-apps/api';
import { useEffect } from 'react';
import AppRouterWrapper from '@/routes/AppRouterWrapper';
import { BrowserRouter, HashRouter, MemoryRouter } from 'react-router-dom';
import DebugPanelWrapper from '@/routes/components/DebugPanel';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const isTauri = () => window.__TAURI__;

function DebugTools() {
    return <DebugPanelWrapper />;
}

function App() {
    // test demo
    if (false && isTauri()) {
        useEffect(() => {
            // invoke Tauri to show up the window
            invoke('app_ready');
        }, []);
    }

    return (
        <BrowserRouter>
            <AppRouterWrapper />
            <DebugTools />
        </BrowserRouter>
    );
}

export default App;
