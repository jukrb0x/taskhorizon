import { cls } from '@/utils';
import { MutableRefObject, useEffect } from 'react';
import { useResizer } from '@/hooks/use-resizer';
import { useMergedRef } from '@mantine/hooks';

const ResizeBar = cls.div`tw-w-1.5 tw-h-full tw-cursor-col-resize
                          tw-bg-gray-500/30 hover:tw-opacity-100 tw-opacity-50 tw-ease-out tw-duration-200`;

export const Resizer = ({ innerRef }: { innerRef?: MutableRefObject<HTMLDivElement | null> }) => {
    const { ref: resizerRef } = useResizer();

    let ref: any; // ok for now...
    if (innerRef) {
        ref = useMergedRef(resizerRef, innerRef);
    } else {
        ref = resizerRef;
    }

    const addActiveClass = () => {
        if (ref.current) {
            ref.current.classList.add('tw-opacity-100');
        }
    };
    const removeActiveClass = () => {
        if (ref.current) {
            ref.current.classList.remove('tw-opacity-100');
        }
    };

    // listen to global mouseup to remove active class
    useEffect(() => {
        document.addEventListener('mouseup', removeActiveClass);
        return () => {
            document.addEventListener('mouseup', removeActiveClass);
        };
    }, [removeActiveClass]);

    return <ResizeBar ref={ref} onMouseDown={addActiveClass}></ResizeBar>;
};
