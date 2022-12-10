import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from '@douyinfe/semi-ui';
import Resizer from '@/components/Resizer';
import TodoApp from '@/components/Todo';
import { cls } from '@/utils';
import useAppConfigStore from '@/store/config-store';
import { useResizer } from '@/hooks/use-resizer';
import { useTauriExtension } from '@/hooks/use-tauri-extension';
import { DndContext } from '@dnd-kit/core';
import { Button } from '@/components/Button';
import { Divider, Space } from '@mantine/core';
import { Spacer } from '@/components/Spacer';
import { Profile } from '@/components/Settings';

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
                        className={'tw-min-[300px] tw-max-[600px] tw-p-[15px]'}
                        style={{ width: `${sidebarWidth}px` }}
                    >
                        {isTauri && <DragRegionOffsetWrapper />}
                        <div className={'tw-flex tw-flex-col tw-h-full'}>
                            <TodoApp />
                            <Spacer />
                            <div className={'tw-bottom-0'}>
                                <Profile />
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
