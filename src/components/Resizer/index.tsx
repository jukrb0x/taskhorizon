import { cls } from '@/utils';
import { ForwardedRef, MouseEventHandler, useEffect } from 'react';
import { Simulate } from 'react-dom/test-utils';
import input = Simulate.input;

export default function Resizer({
    innerRef,
    isResizing,
    onMouseDown,
    onMouseUp
}: {
    innerRef?: ForwardedRef<any>;
    isResizing: boolean;
    onMouseDown?: MouseEventHandler;
    onMouseUp?: MouseEventHandler;
}) {
    // const ref = useRef<HTMLDivElement>(null);

    // const [resizerPos, setResizerPos] = useState({ x: 350, y: 0 });
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
    return (
        <ResizeBar
            ref={innerRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            style={{ opacity: '100%' }}
        ></ResizeBar>
    );
}
