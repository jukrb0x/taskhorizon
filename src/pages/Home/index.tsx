import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ConfigProvider as SemiConfigProvider, Layout } from '@douyinfe/semi-ui';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import Resizer from '@/components/Resizer';
import TodoApp from '@/components/Tasking';
import EventController from '@/components/BigCalendar/EventController';

export default function Home() {
    const { Header, Footer, Content, Sider } = Layout;
    const [siderWidth, setSiderWidth] = useState(300);

    return (
        <SemiConfigProvider locale={en_GB}>
            <Layout hasSider className={'tw-h-screen'}>
                <Sider className={'tw-min-[300px] tw-p-[15px]'}>
                    <TodoApp />
                </Sider>
                <Resizer /> {/* todo: resize <Sider /> */}
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
    );
}
