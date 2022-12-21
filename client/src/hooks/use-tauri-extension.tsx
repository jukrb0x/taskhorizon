import { open } from '@tauri-apps/api/shell';
import { useEffect, useState } from 'react';

const useTauriExtension = () => {
    const [isTauri, setIsTauri] = useState(false);

    // detect tauri on runtime
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (window.__TAURI__) {
            setIsTauri(true);
        }
    }, []);

    const openLink = async (url: string, isNewTab = true) => {
        isTauri ? await open(url) : window.open(url, isNewTab ? '_blank' : '_self');
    };

    return { isTauri, openLink };
};

export { useTauriExtension };
