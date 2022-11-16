import { Button, ButtonProps } from './Button';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface StyledButtonProps extends ButtonProps {
    children: ReactNode;
    preset?: 'green' | 'red' | 'gray';
    shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none' | undefined;
}

const StylishButton = (props: StyledButtonProps) => {
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

export { Button, StylishButton };
