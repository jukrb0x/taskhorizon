import './index.scss';
import { invoke } from '@tauri-apps/api';
import { useEffect } from 'react';
import AppRoute from '@/routes/AppRoute';
import { BrowserRouter, HashRouter, MemoryRouter } from 'react-router-dom';
import DebugPanelWrapper from '@/routes/components/DebugPanel';
import styled from 'styled-components';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
import { MantineProvider } from '@mantine/core';
import { useTauriExtension } from '@/hooks/use-tauri-extension';
import { ConfigProvider as SemiConfigProvider } from '@douyinfe/semi-ui';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import { NotificationsProvider } from '@mantine/notifications';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

function DebugTools() {
    return <DebugPanelWrapper />;
}

// draggable title bar
const TauriWindowDragRegion = styled.div.attrs(() => ({
    'data-tauri-drag-region': true,
    'className':
        'tw-w-full tw-h-7 tw-absolute tw-z-[999]' +
        // debug start
        ' tw-bg-gray-500/30 tw-text-start tw-font-mono tw-text-gray-500'
    // debug end
}))`
    // debug start
    &::after {
        content: 'DEBUG Tauri Window Rrag Region';
    }

    // debug end
`;

const mantineTheme = {
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

    // disable context menu in desktop app
    isTauri && document.addEventListener('contextmenu', (event) => event.preventDefault());

    return (
        <BrowserRouter>
            {isTauri && <TauriWindowDragRegion />}
            <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
                <NotificationsProvider>
                    <SemiConfigProvider locale={en_GB}>
                        <AppRoute />
                        {import.meta.env.MODE === 'development' && <DebugTools />}
                    </SemiConfigProvider>
                </NotificationsProvider>
            </MantineProvider>
        </BrowserRouter>
    );
}

export default App;
