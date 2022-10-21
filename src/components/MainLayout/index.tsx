import { Button, Layout } from '@douyinfe/semi-ui';
import MainRouter from '@/routers/MainRouter';
import TodoApp from '@/pages/TodoApp';
import Resizer from '@/components/Resizer';
import { useState } from 'react';
import './index.scss';

export default function MainLayout() {
    const { Header, Footer, Content, Sider } = Layout;
    const [siderWidth, setSiderWidth] = useState(300);

    return (
        <Layout hasSider className={'layout-wrapper'}>
            <Sider>
                <TodoApp />
            </Sider>
            <Resizer /> {/* resize sider */}
            <Layout>
                <Header className={'header'}>Header</Header>
                <Content>
                    <MainRouter />
                </Content>
            </Layout>
        </Layout>
    );
}
