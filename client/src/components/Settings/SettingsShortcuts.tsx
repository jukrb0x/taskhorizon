import { Alert, Divider, Group, Kbd, Text, Title } from '@mantine/core';

import { useTauriExtension } from '@/hooks';

interface KeyBindingProps {
    name: string;
    kbd: string | string[][];
}

const KeyBindings = (props: KeyBindingProps) => {
    return (
        <>
            <Group position={'apart'}>
                <Text weight={600}>{props.name}</Text>
                <div>
                    {Array.isArray(props.kbd) ? (
                        // kbd is a 2d array
                        props.kbd.map((combine, index) => (
                            <span key={index} className={'tw-space-x-1'}>
                                {combine.map((key, index) => (
                                    <Kbd key={index}>{key}</Kbd>
                                ))}
                                {index !== props.kbd.length - 1 && ' / '}
                            </span>
                        ))
                    ) : (
                        // single keystroke
                        <Kbd>{props.kbd}</Kbd>
                    )}
                </div>
            </Group>
            <Divider my={15} />
        </>
    );
};

const keyBindingsList: KeyBindingProps[] = [
    {
        name: 'Toggle settings',
        kbd: [
            ['Ctrl', ','],
            ['⌘', ',']
        ]
    },
    {
        name: 'Toggle todo sidecar',
        kbd: 'unset'
    },
    {
        name: 'Save event/todo',
        kbd: 'Enter'
    },
    {
        name: 'Delete event',
        kbd: [['BackSpace'], ['Delete']]
    },
    {
        name: 'Previous week/day',
        kbd: 'unset'
    },
    {
        name: 'Next week/day',
        kbd: 'unset'
    },
    {
        name: 'New todo',
        kbd: 'unset'
    }
];

export const SettingsShortcuts = () => {
    const { openLink } = useTauriExtension();
    return (
        <>
            <div className={'tw-flex tw-flex-col tw-select-none tw-cursor-default'}>
                <Title order={2} mb={'sm'}>
                    Shortcuts
                </Title>
                <div className={'tw-max-w-[550px] tw-min-w-[300px]'}>
                    <Alert title="Coming soon..." color="blue" mb={20}>
                        Some keyboard shortcuts are available in the app but not yet listed here.
                    </Alert>

                    {keyBindingsList.map((keyBinding, index) => (
                        <KeyBindings key={index} name={keyBinding.name} kbd={keyBinding.kbd} />
                    ))}
                </div>
            </div>
        </>
    );
};
