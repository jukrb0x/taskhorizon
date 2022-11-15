import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from '@douyinfe/semi-ui';
import Resizer from '@/components/Resizer';
import TodoApp from '@/components/Tasking';
import EventCardModal from '@/components/BigCalendar/EventCardModal';
import { cls } from '@/utils';
import { useEventListener, useMove, useViewportSize } from '@mantine/hooks';
import useAppConfigStore from '@/store/config-store';

export default function Home() {
    const { Header, Content, Sider } = Layout;

    const { sidebarWidth, setSidebarWidth } = useAppConfigStore();
    const [isResizing, setIsResizing] = useState(false);
    const { width: viewportWidth } = useViewportSize();
    const { ref: moveRef } = useMove(({ x }) => {
        const px = Math.floor(x * viewportWidth);
        if (!isResizing || px < 300 || px > 600) return;
        setSidebarWidth(px);
    });
    const resizerRef = useEventListener('mousedown', () => setIsResizing(true));

    const DragRegionOffsetWrapper = cls.div`tw-h-5`;
    const dragRegionRef = useRef<HTMLDivElement>(null);
    const [dragRegionHeight, setDragRegionHeight] = useState(0);
    useEffect(() => {
        dragRegionRef.current && setDragRegionHeight(dragRegionRef.current.clientHeight);
    }, []);

    return (
        <div className={'tw-select-none tw-h-screen'} ref={moveRef}>
            <Layout hasSider className={'tw-h-screen'}>
                <Sider
                    className={'tw-min-[300px] tw-max-[600px] tw-p-[15px]'}
                    style={{ width: `${sidebarWidth}px` }}
                >
                    <DragRegionOffsetWrapper />
                    <TodoApp />
                </Sider>
                <Resizer innerRef={resizerRef} isResizing={isResizing} />
                <Layout className={'tw-relative'} style={{ left: `calc(${sidebarWidth})` }}>
                    <Header className={'tw-font-bold tw-text-center tw-z-30'}>
                        Header
                        <EventCardModal />
                    </Header>
                    <Content>
                        {/* fixme: router outlet here which is not clear, too far separate with the React Router itself*/}
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}
