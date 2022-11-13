import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ConfigProvider as SemiConfigProvider, Layout } from '@douyinfe/semi-ui';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import Resizer from '@/components/Resizer';
import TodoApp from '@/components/Tasking';
import EventController from '@/components/BigCalendar/EventController';
import { cls } from '@/utils';
import { useEventListener, useSize } from 'ahooks';

export default function Home() {
    const { Header, Footer, Content, Sider } = Layout;
    const [siderWidth, setSiderWidth] = useState(350);
    const siderRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    // resize sidebar
    useEventListener(
        'mousemove',
        useCallback(
            ({ clientX }: MouseEvent) => {
                if (isResizing) {
                    if (clientX < 300 || clientX > 500) return;
                    setSiderWidth(clientX);
                }
            },
            [isResizing]
        )
    );

    useEventListener('mouseup', () => {
        setIsResizing(false);
    });

    const DragRegionOffsetWrapper = cls.div`tw-h-5`;
    const dragRegionRef = useRef<HTMLDivElement>(null);
    const [dragRegionHeight, setDragRegionHeight] = useState(0);
    useEffect(() => {
        dragRegionRef.current && setDragRegionHeight(dragRegionRef.current.clientHeight);
    }, []);

    return (
        <div className={'tw-select-none tw-h-screen'}>
            <SemiConfigProvider locale={en_GB}>
                <Layout
                    hasSider
                    className={'tw-h-screen'}
                    // style={{
                    //     height: `calc(100vh - ${dragRegionHeight || 0}px)`
                    // }}
                >
                    <Sider
                        className={'tw-min-[300px] tw-max-[600px] tw-p-[15px]'}
                        style={{ width: siderWidth }}
                        ref={siderRef}
                    >
                        <DragRegionOffsetWrapper />
                        <TodoApp />
                    </Sider>
                    <Resizer
                        onMouseDown={() => setIsResizing(true)}
                        onMouseUp={() => setIsResizing(false)}
                    />
                    <Layout>
                        <Header className={'tw-font-bold tw-text-center tw-z-30'}>
                            Header
                            <EventController />
                        </Header>
                        <Content>
                            {/* fixme: router outlet here which is not clear, too far separate with the React Router itself*/}
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </SemiConfigProvider>
        </div>
    );
}
