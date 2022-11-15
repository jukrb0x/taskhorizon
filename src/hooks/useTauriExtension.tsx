import { useEffect, useState } from 'react';

const useTauriExtension = () => {
    const [isTauri, setIsTauri] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (window.__TAURI__) {
            setIsTauri(true);
        }
    }, []);

    return isTauri;
};

export { useTauriExtension };
