import { cls } from '@/utils';
import { MouseEventHandler, useCallback, useEffect, useRef } from 'react';
import { useEventListener } from 'ahooks';

export default function Resizer({
    onMouseDown,
    onMouseUp
}: {
    onMouseDown: MouseEventHandler;
    onMouseUp: MouseEventHandler;
}) {
    const ref = useRef<HTMLDivElement>(null);

    // useEventListener(
    //     'mousedown',
    //     useCallback(() => {
    //         if (ref.current) {
    //             // set opacity
    //             ref.current.style.opacity = '100%';
    //         }
    //     }, []),
    //     { target: ref }
    // );

    // todo: not good, rewrite it
    // the left component and right component should base on this

    const ResizeBar = cls.div`tw-w-1.5 tw-h-full tw-cursor-col-resize
     tw-z-50 tw-bg-gray-500/30 tw-opacity-50 hover:tw-opacity-100 tw-ease-out tw-duration-200`;
    return <ResizeBar ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp}></ResizeBar>;
}
