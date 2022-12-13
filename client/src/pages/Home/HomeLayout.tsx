import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Layout } from '@douyinfe/semi-ui';
import { Button, Resizer } from '@/components';
import { TodoApp } from '@/components';
import { cls } from '@/utils';
import useAppConfigStore from '@/store/config-store';
import { useTauriExtension } from '@/hooks/use-tauri-extension';
import { DndContext } from '@dnd-kit/core';
import { Spacer } from '@/components';
import { Profile } from '@/components';
import { Divider, LoadingOverlay, Menu } from '@mantine/core';
import { useUser } from '@/hooks';
import { useEffect, useState } from 'react';
import { logout } from '@/apis';
import { mutate } from 'swr';
import useUserStore from '@/store/user-store';
import { IconMessageCircle, IconPhoto, IconSearch, IconSettings } from '@tabler/icons';

const DragRegionOffsetWrapper = cls.div`tw-h-5`;

export const HomeLayout = () => {
    const isTauri = useTauriExtension();
    const { Header, Content, Sider } = Layout;
    const navigate = useNavigate();
    const { user, loggedOut, isLoading } = useUser();
    const { token } = useUserStore();
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        if (loggedOut) {
            navigate('/auth/login');
        }
    }, [loggedOut]);

    const { sidebarWidth } = useAppConfigStore();

    return (
        <>
            {!user && isLoading && <LoadingOverlay visible />}
            <DndContext>
                <div className={'tw-select-none tw-h-screen'}>
                    <Layout hasSider className={'tw-h-screen'}>
                        <Sider
                            className={'tw-min-[300px] tw-max-[600px] '}
                            style={{ width: `${sidebarWidth}px` }}
                        >
                            <div className={'tw-flex tw-flex-col tw-h-full'}>
                                {isTauri && <DragRegionOffsetWrapper />}
                                <TodoApp
                                    TodoListClassName={'tw-px-3.5 tw-flex-grow'}
                                    TodoInputClassName={'tw-px-3.5 tw-pt-3.5'}
                                />
                                <div className={'tw-bottom-0'}>
                                    <Divider />
                                    <Profile
                                        opened={settingsOpen}
                                        onClose={() => setSettingsOpen(false)}
                                    />
                                    <div className={'tw-p-3.5'}>
                                        <Menu trigger={'hover'}>
                                            <Menu.Target>
                                                <Button onClick={() => setSettingsOpen(true)}>
                                                    asd
                                                </Button>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Label>Application</Menu.Label>
                                                <Menu.Item icon={<IconSettings size={14} />}>
                                                    Settings
                                                </Menu.Item>
                                                <Menu.Item icon={<IconMessageCircle size={14} />}>
                                                    Messages
                                                </Menu.Item>
                                                <Menu.Item icon={<IconPhoto size={14} />}>
                                                    Gallery
                                                </Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </Sider>
                        <Resizer />
                        <Layout className={'tw-relative'} style={{ left: `calc(${sidebarWidth})` }}>
                            <Header
                                className={
                                    'tw-font-bold tw-text-center tw-z-30 tw-bg-amber-100 tw-opacity-50 tw-h-7 tw-font-mono'
                                }
                            >
                                PREVIEW - HEADER PLACEHOLDER
                            </Header>
                            <Content>
                                <div className={'tw-p-2 tw-h-full'}>
                                    <Outlet />
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </DndContext>
        </>
    );
};
