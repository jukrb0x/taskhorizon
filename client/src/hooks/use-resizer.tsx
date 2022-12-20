import useAppConfigStore from '@/store/config-store';
import { math } from '@/utils/math';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useResizer = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { setSideAppWidth } = useAppConfigStore(); // todo: (low priority) return the width instead of setting it to store
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
                setSideAppWidth(math(e.clientX - appSiderWidth, 300, 600));
            }
        },
        [isResizing, setSideAppWidth]
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
