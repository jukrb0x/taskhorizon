import { useEffect, useState } from 'react';

const useTauriExtension = () => {
    const [isTauri, setIsTauri] = useState(false);

    useEffect(() => {
        if (window.__TAURI__) {
            setIsTauri(true);
        }
    }, []);

    return isTauri;
};

export { useTauriExtension };
