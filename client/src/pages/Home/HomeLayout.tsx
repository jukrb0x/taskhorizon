import { AppSider, Button, Resizer } from '@/components';
import { TodoApp } from '@/components';
import { useUser } from '@/hooks';
import { useTauriExtension } from '@/hooks/use-tauri-extension';
import useAppConfigStore from '@/store/config-store';
import useUserStore from '@/store/user-store';
import { DndContext } from '@dnd-kit/core';
import { Layout } from '@douyinfe/semi-ui';
import { Divider, LoadingOverlay, Menu, Transition } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const HomeLayout = () => {
    const { Header, Content, Sider } = Layout;
    const navigate = useNavigate();
    const { user, loggedOut, isLoading } = useUser();
    const { token } = useUserStore();
    const { toggleSettings } = useAppConfigStore();

    useEffect(() => {
        if (loggedOut) {
            navigate('/auth');
        }
    }, [user, loggedOut, isLoading]);

    // hotkeys to toggle app settings
    // fixme: tauri keydown events trigger twice
    useHotkeys([
        // Ctrl + , Cmd + ,
        [
            'mod+,',
            () => {
                toggleSettings();
            }
        ]
    ]);

    const { sideAppWidth, showSideApp } = useAppConfigStore();

    return (
        <>
            {!user && isLoading && <LoadingOverlay visible />}
            <DndContext>
                <div className={'tw-select-none tw-h-screen tw-flex tw-flex-row'}>
                    <AppSider />
                    <Layout hasSider className={'tw-h-screen'}>
                        <Transition
                            mounted={showSideApp}
                            transition="slide-right"
                            duration={150}
                            timingFunction="ease"
                        >
                            {(styles) => (
                                <div className={'tw-flex'} style={styles}>
                                    <Sider
                                        className={'tw-min-[300px] tw-max-[600px]'}
                                        style={{ width: `${sideAppWidth}px` }}
                                    >
                                        <div className={'tw-flex tw-flex-col tw-h-full tw-flex-1'}>
                                            <TodoApp
                                                TodoListClassName={'tw-px-3.5 tw-flex-grow'}
                                                TodoInputClassName={'tw-px-3.5'}
                                            />
                                            <div className={'tw-bottom-0'}>
                                                <Divider color={'gray.2'} />
                                                <div
                                                    className={
                                                        'tw-px-4 tw-py-2 tw-text-gray-300 tw-cursor-default tw-text-sm'
                                                    }
                                                >
                                                    TaskHorizon Preview Version{' '}
                                                    {import.meta.env.VITE_APP_VERSION}
                                                </div>
                                            </div>
                                        </div>
                                    </Sider>
                                    <Resizer />
                                </div>
                            )}
                        </Transition>
                        <Layout
                            className={'tw-relative hide-scrollbar'}
                            style={{ left: `calc(${sideAppWidth})` }}
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
                                <div className={'tw-h-full'}>
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
