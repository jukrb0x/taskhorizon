import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ConfigProvider, Layout } from '@douyinfe/semi-ui';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import Resizer from '@/components/Resizer';
import DebugPanel from '@/routes/components/DebugPanel';
import TodoList from '@/components/Tasking/TodoList';
import './index.scss';

export default function Home() {
    const { Header, Footer, Content, Sider } = Layout;
    const [siderWidth, setSiderWidth] = useState(300);

    const isDebug = import.meta.env.MODE === 'development';

    return (
        <ConfigProvider locale={en_GB}>
            <Layout hasSider className={'main-layout-wrapper'}>
                <Sider className={'sider'}>
                    <TodoList />
                </Sider>
                <Resizer /> {/* todo: resize <Sider /> */}
                <Layout>
                    <Header>Header</Header>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            {
                /* debug panel only display with development mode*/
                isDebug ? <DebugPanel /> : null
            }
        </ConfigProvider>
    );
}
