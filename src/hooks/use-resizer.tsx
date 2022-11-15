import { useEffect, useRef, useState } from 'react';

export const useResizer = () => {
    const [isResizing, setIsResizing] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current?.addEventListener('mousedown', () => {
                console.log('resizing');
                setIsResizing(true);
            });
            ref.current?.addEventListener('mouseup', () => {
                console.log('not resizing');
                setIsResizing(false);
            });
            return () => {
                ref.current?.removeEventListener('mousedown', () => {
                    console.log('resizing (cleanup)');
                    setIsResizing(true);
                });
                ref.current?.removeEventListener('mouseup', () => {
                    console.log('not resizing (cleanup)');
                    setIsResizing(false);
                });
            };
        }
    }, ['mousedown', 'mouseup']);
    return { isResizing, ref };
};
