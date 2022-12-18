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
        // FIXME: performance issue
        (e: MouseEvent) => {
            if (isResizing) {
                const appSiderWidth = 70; // in px
                setSidebarWidth(math(e.clientX - appSiderWidth, 300, 600));
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
