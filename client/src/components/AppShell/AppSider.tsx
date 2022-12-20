import { Settings } from '@/components';
import { useTauriExtension } from '@/hooks';
import useAppConfigStore from '@/store/config-store';
import { ActionIcon, Divider, Group, Menu, Avatar, Text } from '@mantine/core';
import {
    IconCalendar,
    IconCheckbox,
    IconChevronRight,
    IconSettings,
    IconUserCircle
} from '@tabler/icons';
import clsx from 'clsx';
import { useState } from 'react';

const UserActionIcon = ({ onClick }: { onClick: () => void }) => {
    return (
        <>
            <Menu trigger={'hover'} openDelay={200} position={'right-end'}>
                <Menu.Target>
                    <ActionIcon size={'xl'} onClick={onClick}>
                        <IconUserCircle />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={onClick}>
                        <Group>
                            <Avatar
                                src={
                                    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80'
                                }
                                radius="xl"
                            />

                            <div style={{ flex: 1 }}>
                                <Text size="sm" weight={500}>
                                    Harriette Spoonlicker
                                </Text>

                                <Text color="dimmed" size="xs">
                                    asdad@sd.com
                                </Text>
                            </div>

                            {<IconChevronRight size={16} />}
                        </Group>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item icon={<IconSettings size={14} />} onClick={onClick}>
                        Settings
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
};

export const AppSider = () => {
    const isTauri = useTauriExtension();
    const { showSideApp, toggleSideApp } = useAppConfigStore();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const { showSettings, toggleSettings } = useAppConfigStore();
    return (
        <>
            <Settings opened={showSettings} onClose={() => toggleSettings()} />
            <div
                data-tauri-drag-region
                className={clsx(
                    'tw-h-full tw-flex tw-flex-col tw-w-[70px] tw-overflow-hidden',
                    'tw-items-center tw-py-3 tw-flex-shrink-0 tw-bg-[#eee]/60'
                )}
            >
                <div data-tauri-drag-region className={'tw-space-y-1 tw-grow'}>
                    {isTauri && <div className={'tw-h-4'} />}
                    <ActionIcon size={'xl'}>
                        <IconCalendar />
                    </ActionIcon>
                    <ActionIcon
                        size={'xl'}
                        variant={showSideApp ? 'light' : 'subtle'}
                        onClick={() => toggleSideApp()}
                    >
                        <IconCheckbox />
                    </ActionIcon>
                </div>

                <div className={'tw-space-y-1'}>
                    <UserActionIcon onClick={() => toggleSettings()} />
                </div>
            </div>
            <Divider orientation={'vertical'} color={'gray.2'} />
        </>
    );
};
