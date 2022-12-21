import { useTauriExtension } from '@/hooks';
import { Title } from '@mantine/core';

export const SettingsAbout = () => {
    const { openLink } = useTauriExtension();
    return (
        <>
            <div className={'tw-flex tw-flex-col tw-select-none tw-cursor-default'}>
                <Title order={2} mb={'sm'}>
                    About
                </Title>
            </div>
        </>
    );
};
