import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react-dom-interactions';
import { useState } from 'react';

const Popover = () => {
    // floating card
    const [open, setOpen] = useState(false);
    const { x, y, reference, floating, strategy } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: 'right',
        strategy: 'fixed',
        middleware: [offset(10), flip(), shift()],
        whileElementsMounted: autoUpdate
    });
    return <>a</>;
};
export { Popover };
