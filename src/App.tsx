import './index.scss';
import { invoke, tauri } from '@tauri-apps/api';
import { useEffect } from 'react';
import AppRouterWrapper from '@/routes/AppRouterWrapper';
import { BrowserRouter, HashRouter, MemoryRouter } from 'react-router-dom';
import DebugPanelWrapper from '@/routes/components/DebugPanel';
import styled from 'styled-components';
import { Simulate } from 'react-dom/test-utils';
import drag = Simulate.drag;

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

    const TauriWindowDragRegion = styled.div.attrs(() => ({
        'data-tauri-drag-region': true,
        className: 'tw-w-full tw-h-10 tw-absolute'
    }))``;

    return (
        <BrowserRouter>
            <TauriWindowDragRegion />
            <AppRouterWrapper />
            {import.meta.env.MODE === 'development' && <DebugTools />}
        </BrowserRouter>
    );
}

export default App;
