import clsx from 'clsx';
import { ReactNode } from 'react';

import { Button, ButtonProps } from './Button';

interface StylishButtonProps extends ButtonProps {
    children: ReactNode;
    preset?: 'green' | 'red' | 'gray';
    shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none' | undefined;
    [x: string]: any; // to accept any other props
}

export const StylishButton = (props: StylishButtonProps) => {
    let { shadow } = props;
    if (!shadow) {
        shadow = 'none';
    }
    return (
        <Button
            variant={'filled'}
            color={props.preset || 'gray'}
            className={clsx(`tw-drop-shadow-${shadow}`, props.className)}
            {...props}
        >
            {props.children}
        </Button>
    );
};
