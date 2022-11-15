import './index.scss';
import { invoke } from '@tauri-apps/api';
import { useEffect } from 'react';
import AppRouterWrapper from '@/routes/AppRouterWrapper';
import { BrowserRouter } from 'react-router-dom';
import DebugPanelWrapper from '@/routes/components/DebugPanel';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MantineProvider } from '@mantine/core';
import { useTauriExtension } from '@/hooks/useTauriExtension';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

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
    const isTauri = useTauriExtension();
    useEffect(() => {
        if (false && isTauri) {
            // test demo
            invoke('app_ready'); // invoke Tauri to show up the window
        }
    }, [isTauri]);

    return (
        <BrowserRouter>
            <TauriWindowDragRegion />
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <DndProvider backend={HTML5Backend}>
                    <AppRouterWrapper />
                </DndProvider>
            </MantineProvider>
            {import.meta.env.MODE === 'development' && <DebugTools />}
        </BrowserRouter>
    );
}

export default App;
