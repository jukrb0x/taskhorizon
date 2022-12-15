import { useCallback, useEffect, useRef, useState } from 'react';
import { math } from '@/utils/math';
import useAppConfigStore from '@/store/config-store';

export const useResizer = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { setSidebarWidth } = useAppConfigStore(); // todo: (low priority) return the width instead of setting it to store
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = useCallback(() => {
        setIsResizing(true);
    }, [setIsResizing]);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, [setIsResizing]);

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isResizing) {
                setSidebarWidth(math(e.clientX, 300, 600));
            }
        },
        [isResizing, setSidebarWidth]
    );

    useEffect(() => {
        ref.current?.addEventListener('mousedown', startResizing);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', stopResizing);

        return () => {
            ref.current?.removeEventListener('mousedown', startResizing);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', stopResizing);
        };
    }, [startResizing, onMouseMove, stopResizing]);
    return { ref };
};
