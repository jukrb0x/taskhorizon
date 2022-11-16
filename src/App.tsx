import './index.scss';
import { invoke } from '@tauri-apps/api';
import { useEffect } from 'react';
import AppRouter from '@/routes/AppRouter';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import DebugPanelWrapper from '@/routes/components/DebugPanel';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MantineProvider } from '@mantine/core';
import { useTauriExtension } from '@/hooks/use-tauri-extension';
import { ConfigProvider as SemiConfigProvider } from '@douyinfe/semi-ui';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';

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

const mantineTheme = {
    fontFamily: 'Inter, sans-serif',
    defaultRadius: 'md'
};

function App() {
    const isTauri = useTauriExtension();
    useEffect(() => {
        if (false && isTauri) {
            // test demo
            invoke('app_ready'); // invoke Tauri to show up the window
        }
    }, [isTauri]);

    return (
        <HashRouter>
            {isTauri && <TauriWindowDragRegion />}
            <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
                <SemiConfigProvider locale={en_GB}>
                    <DndProvider backend={HTML5Backend}>
                        <AppRouter />
                    </DndProvider>
                    {import.meta.env.MODE === 'development' && <DebugTools />}
                </SemiConfigProvider>
            </MantineProvider>
        </HashRouter>
    );
}

export default App;
