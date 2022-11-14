import './index.scss';
import { invoke } from '@tauri-apps/api';
import { useEffect } from 'react';
import AppRouterWrapper from '@/routes/AppRouterWrapper';
import { BrowserRouter } from 'react-router-dom';
import DebugPanelWrapper from '@/routes/components/DebugPanel';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const isTauri = () => window.__TAURI__;

function DebugTools() {
    return <DebugPanelWrapper />;
}

// draggable title bar
const TauriWindowDragRegion = styled.div.attrs(() => ({
    'data-tauri-drag-region': true,
    className:
        'tw-w-full tw-h-8 tw-absolute tw-z-50' +
        // debug
        ' tw-bg-gray-500/30 tw-text-center tw-font-mono tw-opacity-50 tw-text-orange-500'
}))`
    // debug
    &::after {
        content: 'Tauri Window Rrag Region';
    }
`;

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
            <TauriWindowDragRegion />
            <DndProvider backend={HTML5Backend}>
                <AppRouterWrapper />
            </DndProvider>
            {import.meta.env.MODE === 'development' && <DebugTools />}
        </BrowserRouter>
    );
}

export default App;
