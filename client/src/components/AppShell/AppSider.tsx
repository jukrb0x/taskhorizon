import { ActionIcon, Divider, Menu } from '@mantine/core';
import {
    IconCalendar,
    IconCheckbox,
    IconHome,
    IconMessageCircle,
    IconPackage,
    IconPeace,
    IconPhoto,
    IconSettings,
    IconUserCircle
} from '@tabler/icons';
import clsx from 'clsx';
import { useTauriExtension } from '@/hooks';
import useAppConfigStore from '@/store/config-store';
import { Button, Settings } from '@/components';
import { MouseEventHandler, useState } from 'react';

const UserActionIcon = ({ onClick }: { onClick: () => void }) => {
    return (
        <>
            <Menu trigger={'hover'} openDelay={200} position={'right-end'}>
                <Menu.Target>
                    <ActionIcon size={'xl'} onClick={() => onClick()}>
                        <IconUserCircle />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                    <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
                    <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
};

const AppSider = () => {
    const isTauri = useTauriExtension();
    const { showSidebar, toggleSidebar } = useAppConfigStore();
    const [settingsOpen, setSettingsOpen] = useState(false);
    return (
        <>
            <Settings opened={settingsOpen} onClose={() => setSettingsOpen(false)} />
            <div
                data-tauri-drag-region
                className={clsx(
                    'tw-h-full tw-flex tw-flex-col tw-w-[70px] tw-overflow-hidden',
                    'tw-items-center tw-py-3'
                )}
            >
                <div data-tauri-drag-region className={'tw-space-y-1 tw-grow'}>
                    {isTauri && <div className={'tw-h-4'} />}
                    <ActionIcon size={'xl'}>
                        <IconCalendar />
                    </ActionIcon>
                    <ActionIcon
                        size={'xl'}
                        variant={showSidebar ? 'light' : 'subtle'}
                        onClick={() => toggleSidebar()}
                    >
                        <IconCheckbox />
                    </ActionIcon>
                </div>

                <div className={'tw-space-y-1'}>
                    <UserActionIcon onClick={() => setSettingsOpen(true)} />
                </div>
            </div>
            <Divider orientation={'vertical'} color={'gray.2'} />
        </>
    );
};
export { AppSider };
