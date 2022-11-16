import { forwardRef, ReactNode } from 'react';
import {
    createPolymorphicComponent,
    Button as MButton,
    ButtonProps as MButtonProps,
    useMantineTheme
} from '@mantine/core';

interface ButtonProps extends Omit<MButtonProps, 'variant'> {
    children: ReactNode;
    variant?: 'default' | 'link' | 'filled' | undefined;
}

const _Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
    let colorHex: string;
    if (props.color) {
        const color = props.color.split('.')[0];
        const shade = parseInt(props.color.split('.')[1]);
        colorHex = useMantineTheme().colors[color][6];
        if (shade) {
            colorHex = useMantineTheme().colors[color][shade];
        }
    } else {
        // default color
        props.color = 'gray.3';
        colorHex = useMantineTheme().colors.gray[3];
    }
    const darkenColorHex = useMantineTheme().fn.darken(colorHex, 0.08);
    return (
        <MButton
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            variant={props.variant ? props.variant : 'default'}
            // className={'tw-drop-shadow-md'}
            color={props.color}
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
