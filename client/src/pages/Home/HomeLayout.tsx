import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from '@douyinfe/semi-ui';
import { Resizer } from '@/components';
import { TodoApp } from '@/components';
import { cls } from '@/utils';
import useAppConfigStore from '@/store/config-store';
import { useTauriExtension } from '@/hooks/use-tauri-extension';
import { DndContext } from '@dnd-kit/core';
import { Spacer } from '@/components';
import { Profile } from '@/components';
import { Divider } from '@mantine/core';

const DragRegionOffsetWrapper = cls.div`tw-h-5`;

export const HomeLayout = () => {
    const isTauri = useTauriExtension();
    const { Header, Content, Sider } = Layout;

    const { sidebarWidth } = useAppConfigStore();

    // todo: auth login
    if (false) {
        return <Navigate to="/login" />;
    }

    return (
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
                                TodoListClassName={'tw-px-3.5'}
                                TodoInputClassName={'tw-px-3.5 tw-pt-3.5'}
                            />
                            <Spacer />
                            <div className={'tw-bottom-0'}>
                                <Divider />
                                <div className={'tw-p-3.5'}>
                                    <Profile />
                                </div>
                            </div>
                        </div>
                    </Sider>
                    <Resizer />
                    <Layout className={'tw-relative'} style={{ left: `calc(${sidebarWidth})` }}>
                        <Header className={'tw-font-bold tw-text-center tw-z-30 tw-bg-amber-100'}>
                            Header
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
    );
};
