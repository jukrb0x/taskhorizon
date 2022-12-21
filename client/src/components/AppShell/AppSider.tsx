import { ActionIcon, Avatar, Divider, Group, Menu, Text } from '@mantine/core';
import {
    IconBrandGithub,
    IconCalendar,
    IconCheckbox,
    IconChevronRight,
    IconSettings,
    IconUserCircle
} from '@tabler/icons';
import clsx from 'clsx';
import { useState } from 'react';

import { Settings } from '@/components';
import { useTauriExtension, useUser } from '@/hooks';
import useAppConfigStore from '@/store/config-store';
import useUserStore from '@/store/user-store';

const UserActionIcon = (props: {
    username: string;
    email: string;
    avatarSrc?: string;
    onClick: () => void;
}) => {
    const { openLink } = useTauriExtension();
    return (
        <>
            <Menu trigger={'hover'} openDelay={200} position={'right-end'}>
                <Menu.Target>
                    <ActionIcon size={'xl'} onClick={props.onClick}>
                        <IconUserCircle />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={props.onClick}>
                        <Group>
                            <Avatar src={props.avatarSrc ? props.avatarSrc : ''} radius="xl" />

                            <div style={{ flex: 1 }}>
                                <Text size="sm" weight={500}>
                                    {props.username}
                                </Text>

                                <Text color="dimmed" size="xs">
                                    {props.email}
                                </Text>
                            </div>

                            {<IconChevronRight size={16} />}
                        </Group>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                        icon={<IconBrandGithub size={14} />}
                        onClick={async () => {
                            await openLink(import.meta.env.VITE_GITHUB_REPO_URL);
                        }}
                    >
                        GitHub
                    </Menu.Item>
                    <Menu.Item icon={<IconSettings size={14} />} onClick={props.onClick}>
                        Settings
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
};

export const AppSider = () => {
    const { isTauri } = useTauriExtension();
    const { showSideApp, toggleSideApp, showSettings, toggleSettings } = useAppConfigStore();
    const { username, email } = useUserStore();
    const [settingsOpen, setSettingsOpen] = useState(false);
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
                    <UserActionIcon
                        onClick={() => toggleSettings()}
                        username={username}
                        email={email}
                    />
                </div>
            </div>
            <Divider orientation={'vertical'} color={'gray.2'} />
        </>
    );
};
