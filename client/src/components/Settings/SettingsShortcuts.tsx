import { useTauriExtension } from '@/hooks';
import { Title } from '@mantine/core';

export const SettingsShortcuts = () => {
    const { openLink } = useTauriExtension();
    return (
        <>
            <div className={'tw-flex tw-flex-col tw-select-none tw-cursor-default'}>
                <Title order={2} mb={'sm'}>
                    Shortcuts
                </Title>
            </div>
        </>
    );
};
