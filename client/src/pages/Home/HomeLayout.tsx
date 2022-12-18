import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Layout } from '@douyinfe/semi-ui';
import { AppSider, Button, Resizer } from '@/components';
import { TodoApp } from '@/components';
import { cls } from '@/utils';
import useAppConfigStore from '@/store/config-store';
import { useTauriExtension } from '@/hooks/use-tauri-extension';
import { DndContext } from '@dnd-kit/core';
import { Profile } from '@/components';
import { Divider, LoadingOverlay, Menu } from '@mantine/core';
import { useUser } from '@/hooks';
import { useEffect, useState } from 'react';
import { AuthAPI, cleanAllCache } from '@/apis';
import useUserStore from '@/store/user-store';
import { IconMessageCircle, IconPhoto, IconSearch, IconSettings } from '@tabler/icons';

export const HomeLayout = () => {
    const isTauri = useTauriExtension();
    const { Header, Content, Sider } = Layout;
    const navigate = useNavigate();
    const { user, loggedOut, isLoading } = useUser();
    const { token } = useUserStore();
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        if (loggedOut) {
            navigate('/auth');
        }
    }, [user, loggedOut, isLoading]);

    const { sidebarWidth } = useAppConfigStore();

    return (
        <>
            {!user && isLoading && <LoadingOverlay visible />}
            <DndContext>
                <div className={'tw-select-none tw-h-screen tw-flex tw-flex-row'}>
                    <AppSider />
                    <Layout hasSider className={'tw-h-screen'}>
                        <Sider
                            className={'tw-min-[300px] tw-max-[600px]'}
                            style={{ width: `${sidebarWidth}px` }}
                        >
                            <div className={'tw-flex tw-flex-col tw-h-full tw-flex-1'}>
                                <TodoApp
                                    TodoListClassName={'tw-px-3.5 tw-flex-grow'}
                                    TodoInputClassName={'tw-px-3.5'}
                                />
                                <div className={'tw-bottom-0'}>
                                    <Divider color={'gray.2'} />
                                    <Profile
                                        opened={settingsOpen}
                                        onClose={() => setSettingsOpen(false)}
                                    />
                                    <div className={'tw-p-3.5'}>
                                        <Button onClick={() => AuthAPI.logout()}>Logout</Button>
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
                        <Layout
                            className={'tw-relative hide-scrollbar'}
                            style={{ left: `calc(${sidebarWidth})` }}
                        >
                            {true ? (
                                <Header></Header>
                            ) : (
                                <Header
                                    className={
                                        'tw-font-bold tw-text-center tw-z-30 tw-bg-amber-100 tw-opacity-50 tw-h-7 tw-font-mono'
                                    }
                                >
                                    PREVIEW - HEADER PLACEHOLDER
                                </Header>
                            )}
                            <Content>
                                <div className={'tw-h-full tw-overflow-y-hidden'}>
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
