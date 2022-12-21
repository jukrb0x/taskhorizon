// classy-components
// wonderful magic class utility
// reference: https://github.com/spacedriveapp/spacedrive/blob/main/packages/ui/src/utils.tsx
import clsx from 'clsx';
import React from 'react';

const restyle = <
    T extends
        | string
        | React.FunctionComponent<{ className: string }>
        | React.ComponentClass<{ className: string }>
>(
        element: T
    ) => {
    return (cls: () => string) => {
        const forwardRefExoticComponent = React.forwardRef(({ className, ...props }: any, ref) =>
            React.createElement(element, {
                ...props,
                className: clsx(cls(), className),
                ref
            })
        );
        forwardRefExoticComponent.displayName = undefined;
        return forwardRefExoticComponent;
    };
};

function classyComponentFactory(element: any) {
    return ([className]: TemplateStringsArray) => {
        return restyle(element)(() => className);
    };
}

type ClassnameFactory<T> = (s: TemplateStringsArray) => T;

type ComponentFactory = {
    [K in keyof JSX.IntrinsicElements]: ClassnameFactory<
        React.ForwardRefExoticComponent<JSX.IntrinsicElements[K]>
    >;
} & {
    <T>(c: T): ClassnameFactory<T>;
};

export const cls = new Proxy(
    (() => {
        return;
    }) as unknown as ComponentFactory,
    {
        get: (_, property: string) => classyComponentFactory(property),
        apply: (_, __, [el]: [React.ReactElement]) => classyComponentFactory(el)
    }
);
