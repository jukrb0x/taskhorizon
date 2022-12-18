import { ActionIcon, Divider, Group, Menu, Avatar, Text } from '@mantine/core';
import {
    IconCalendar,
    IconCheckbox,
    IconChevronRight,
    IconSettings,
    IconUserCircle
} from '@tabler/icons';
import clsx from 'clsx';
import { useTauriExtension } from '@/hooks';
import useAppConfigStore from '@/store/config-store';
import { Settings } from '@/components';
import { useState } from 'react';
import exp from 'constants';

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
    const { showSidebar, toggleSidebar } = useAppConfigStore();
    const [settingsOpen, setSettingsOpen] = useState(false);
    return (
        <>
            <Settings opened={settingsOpen} onClose={() => setSettingsOpen(false)} />
            <div
                data-tauri-drag-region
                className={clsx(
                    'tw-h-full tw-flex tw-flex-col tw-w-[70px] tw-overflow-hidden',
                    'tw-items-center tw-py-3 tw-flex-shrink-0 tw-bg-gray-100/30'
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
