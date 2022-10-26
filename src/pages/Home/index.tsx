import { Button, ConfigProvider, Layout, Space } from '@douyinfe/semi-ui';
import Resizer from '@/components/Resizer';
import { useState } from 'react';
import './index.scss';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import TodoList from '@/components/TodoBeta/TodoList';
import { Link, NavLink, Outlet } from 'react-router-dom';
import DebugPanel from '@/routes/components/DebugPanel';

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
                <Resizer /> {/* resize <Sider /> */}
                <Layout>
                    <Header>Header</Header>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            {isDebug ? <DebugPanel /> : null}
        </ConfigProvider>
    );
}
