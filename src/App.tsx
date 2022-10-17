import { Button, Layout } from '@douyinfe/semi-ui';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteError from './components/RouteError';
import TodoApp from './pages/TodoApp';

// layout
//  |
// page -> component
//            |-> script, style, template

// which practice would be best.
// HOC, functional, class-object ?

function App() {
    const { Header, Footer, Content, Sider } = Layout;

    const router = createBrowserRouter([
        // fixme: the routes now are shit
        {
            path: '/',
            element: <TodoApp />,
            errorElement: <RouteError />
            // children
        }
    ]);

    return (
        <div>
            {/*fixme: refactor wireframe*/}
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
