import { useEffect, useRef, useState } from 'react';

export const useResizer = () => {
    const [isResizing, setIsResizing] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current?.addEventListener('mousedown', () => {
                setIsResizing(true);
            });
            document.addEventListener(
                'mouseup',
                () => {
                    setIsResizing(false);
                },
                { once: true }
            );
        }
        return () => {
            ref.current?.removeEventListener('mousedown', () => {
                setIsResizing(true);
            });
            document.addEventListener(
                'mouseup',
                () => {
                    setIsResizing(false);
                },
                { once: true }
            );
        };
    }, [isResizing, setIsResizing]);
    return { isResizing, ref };
};
