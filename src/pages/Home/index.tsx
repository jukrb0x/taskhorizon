import { Outlet } from 'react-router-dom';
import { Layout } from '@douyinfe/semi-ui';
import Resizer from '@/components/Resizer';
import TodoApp from '@/components/Todo';
import { cls } from '@/utils';
import useAppConfigStore from '@/store/config-store';
import { useResizer } from '@/hooks/use-resizer';
import { useTauriExtension } from '@/hooks/use-tauri-extension';

const DragRegionOffsetWrapper = cls.div`tw-h-5`;

export default function Home() {
    const isTauri = useTauriExtension();
    const { Header, Content, Sider } = Layout;

    const { sidebarWidth } = useAppConfigStore();
    return (
        <div className={'tw-select-none tw-h-screen'} /* ref={moveRef}*/>
            <Layout hasSider className={'tw-h-screen'}>
                <Sider
                    className={'tw-min-[300px] tw-max-[600px] tw-p-[15px]'}
                    style={{ width: `${sidebarWidth}px` }}
                >
                    {isTauri && <DragRegionOffsetWrapper />}
                    <TodoApp />
                </Sider>
                <Resizer />
                <Layout className={'tw-relative'} style={{ left: `calc(${sidebarWidth})` }}>
                    <Header className={'tw-font-bold tw-text-center tw-z-30 tw-bg-amber-100'}>
                        Header
                    </Header>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}
