import AppRouterProvider from '@/routes/AppRouterProvider';
import './index.scss';
import { invoke } from '@tauri-apps/api';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        // invoke Tauri to show up the window
        invoke('app_ready'), [];
    });

    return (
        <>
            <AppRouterProvider />
        </>
    );
}

export default App;
