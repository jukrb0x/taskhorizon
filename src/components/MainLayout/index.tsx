import { Button, ConfigProvider, Layout } from '@douyinfe/semi-ui';
import MainRouter from '@/routers/MainRouter';
import TodoApp from '@/pages/TodoApp';
import Resizer from '@/components/Resizer';
import { useState } from 'react';
import './index.scss';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';

export default function MainLayout() {
    const { Header, Footer, Content, Sider } = Layout;
    const [siderWidth, setSiderWidth] = useState(300);

    return (
        <ConfigProvider locale={en_GB}>
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
        </ConfigProvider>
    );
}
