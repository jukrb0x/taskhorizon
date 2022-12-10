import { Transition } from '@mantine/core';
import { ReactNode, useEffect, useState } from 'react';
import { MantineTransition } from '@mantine/core/lib/Transition/transitions';

export const OpeningTransition = ({
    transition = 'fade',
    duration = 500,
    children
}: {
    transition?: MantineTransition;
    duration?: number;
    children: ReactNode;
}) => {
    const [opened, setOpened] = useState(false);
    useEffect(() => {
        if (!opened) setOpened(true);
    }, [opened]);

    return (
        <Transition transition={transition} mounted={opened} duration={duration}>
            {(transitionStyles) => <div style={transitionStyles}>{children}</div>}
        </Transition>
    );
};
