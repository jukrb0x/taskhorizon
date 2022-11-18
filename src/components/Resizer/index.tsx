import { cls } from '@/utils';
import { MouseEventHandler, MutableRefObject, RefObject, useEffect } from 'react';
import { Simulate } from 'react-dom/test-utils';
import input = Simulate.input;

const ResizeBar = cls.div`tw-w-1.5 tw-h-full tw-cursor-col-resize
                          tw-bg-gray-500/30 hover:tw-opacity-100 tw-opacity-50 tw-ease-out tw-duration-200`;

export default function Resizer({
    innerRef,
    active,
    onMouseDown,
    onMouseUp
}: {
    innerRef?: MutableRefObject<HTMLDivElement | null>;
    active: boolean;
    onMouseDown?: MouseEventHandler;
    onMouseUp?: MouseEventHandler;
}) {
    useEffect(() => {
        if (!innerRef?.current) return;
        if (active) {
            innerRef.current.classList.add('tw-opacity-100');
        } else {
            innerRef.current.classList.remove('tw-opacity-100');
        }
    }, [active]);

    return <ResizeBar ref={innerRef} onMouseDown={onMouseDown} onMouseUp={onMouseUp}></ResizeBar>;
}
