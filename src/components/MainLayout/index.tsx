import { Button, Layout } from '@douyinfe/semi-ui';
import MainRouter from '@/routers/MainRouter';
import TodoApp from '@/pages/TodoApp';

export default function MainLayout() {
    const { Header, Footer, Content, Sider } = Layout;

    return (
        <Layout>
            <Sider>
                <TodoApp />
            </Sider>
            <Layout>
                <Header>Header</Header>
                <Content>
                    <MainRouter />
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
}
