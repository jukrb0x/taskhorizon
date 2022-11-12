import { cls } from '@/utils';
import { MouseEventHandler } from 'react';

export default function Resizer({
    onMouseDown,
    onMouseUp
}: {
    onMouseDown: MouseEventHandler;
    onMouseUp: MouseEventHandler;
}) {
    const ResizeBar = cls.div`tw-w-1.5 tw-h-full tw-cursor-col-resize
     tw-z-50 tw-bg-gray-500/30 tw-opacity-50 hover:tw-opacity-100 tw-transition tw-ease-out tw-duration-300`;
    return <ResizeBar onMouseDown={onMouseDown} onMouseUp={onMouseUp} />;
}
