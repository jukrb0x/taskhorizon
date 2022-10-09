import { Button, Layout } from '@douyinfe/semi-ui';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import RouteError from './components/RouteError';
import TodoApp from './pages/TodoApp';

function App() {
    const { Header, Footer, Content, Sider } = Layout;

    const router = createBrowserRouter([
        {
            path: '/',
            element: <TodoApp />,
            errorElement: <RouteError />
            // children
        }
        // todo: adding routes here
    ]);

    return (
        <div>
            <Layout className={'basic-outer'}>
                <Sider className={'basic-left-sider'}>
                    Sider
                    <Button>ToDo</Button>
                </Sider>
                <Layout className={'basic-right'}>
                    <Header className={'basic-header'}>Header</Header>
                    <Content className={'basic-content'}>
                        <RouterProvider router={router} />
                    </Content>
                    <Footer className={'basic-footer'}>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
