import { cls } from '@/utils';
import { MouseEventHandler, RefObject } from 'react';
import { Simulate } from 'react-dom/test-utils';

const ResizeBar = cls.div`tw-w-1.5 tw-h-full tw-cursor-col-resize
     tw-z-50 tw-bg-gray-500/30 tw-opacity-50 hover:tw-opacity-100 tw-ease-out tw-duration-200`;

export default function Resizer({
    innerRef,
    isResizing,
    onMouseDown,
    onMouseUp
}: {
    innerRef?: RefObject<HTMLDivElement>;
    isResizing: boolean;
    onMouseDown?: MouseEventHandler;
    onMouseUp?: MouseEventHandler;
}) {
    return (
        <ResizeBar
            ref={innerRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            style={{ opacity: '100%' }}
        ></ResizeBar>
    );
}
