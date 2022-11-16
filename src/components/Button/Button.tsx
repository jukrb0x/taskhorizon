import { forwardRef, ReactNode } from 'react';
import {
    createPolymorphicComponent,
    Button as MButton,
    ButtonProps as MButtonProps,
    useMantineTheme
} from '@mantine/core';
import clsx from 'clsx';

export interface ButtonProps extends MButtonProps {
    children: ReactNode;
    shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none' | undefined;
}

const _Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
    let { color, shadow } = props;
    if (!color) color = 'gray.3';
    if (!shadow) shadow = 'none';
    const colorName = color.split('.')[0];
    const shade = parseInt(color.split('.')[1]) || 6;
    const colorHex = useMantineTheme().colors[colorName][shade];
    const darkenColorHex =
        props.variant !== 'outline' ? useMantineTheme().fn.darken(colorHex, 0.04) : '';
    return (
        <MButton
            variant={props.variant || 'default'}
            className={clsx(`tw-drop-shadow-${shadow}`, props.className)}
            color={color}
            styles={() => ({
                root: {
                    borderColor: colorHex,
                    '&:hover': {
                        backgroundColor: darkenColorHex,
                        borderColor: darkenColorHex
                    }
                }
            })}
            ref={ref}
            {...props}
        >
            {children}
        </MButton>
    );
});

_Button.displayName = 'Button';
export const Button = createPolymorphicComponent<'button', ButtonProps>(_Button);
