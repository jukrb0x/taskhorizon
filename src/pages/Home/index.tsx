import { useCallback, useRef, useState } from 'react';
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

    // useEventListener('mouseup', () => {
    //     setIsResizing(false);
    // });

    const DragRegionOffsetWrapper = cls.div`tw-h-5 tw-bg-red-100`;
    const dragRegionRef = useRef(null);
    const windowWrapperRef = useRef(null);
    const dragRegionSize = useSize(dragRegionRef);
    const windowSize = useSize(windowWrapperRef);

    return (
        <div className={'tw-select-none tw-h-screen'} ref={windowWrapperRef}>
            <DragRegionOffsetWrapper ref={dragRegionRef} />
            <SemiConfigProvider locale={en_GB}>
                <Layout
                    hasSider
                    style={{ height: (windowSize?.height || 1) - (dragRegionSize?.height || 0) }}
                >
                    <Sider
                        className={'tw-min-[300px] tw-max-[600px] tw-p-[15px]'}
                        style={{ width: siderWidth }}
                        ref={siderRef}
                    >
                        <TodoApp />
                    </Sider>
                    <Resizer
                        onMouseDown={() => setIsResizing(true)}
                        onMouseUp={() => setIsResizing(false)}
                    />
                    <Layout>
                        <Header className={'tw-font-bold tw-text-center'}>
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
