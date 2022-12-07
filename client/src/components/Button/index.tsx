import { Button, ButtonProps } from './Button';
import { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface StylishButtonProps extends ButtonProps {
    children: ReactNode;
    preset?: 'green' | 'red' | 'gray';
    shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none' | undefined;
    [x: string]: any; // to accept any other props
}

const StylishButton = (props: StylishButtonProps) => {
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

export { Button /*StylishButton*/ };
