import { Button, Layout } from '@douyinfe/semi-ui';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import RouteError from "./components/RouteError";
import { window } from "@tauri-apps/api";


function App() {
    const { Header, Footer, Content, Sider } = Layout;

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            errorElement: <RouteError />,
        }
    ])

    return (
        <div>
            <Layout className={ "basic-outer" }>
                <Sider className={ "basic-left-sider" }>
                    Sider
                    <Button onClick={ () => {

                    } }>ToDo</Button>
                </Sider>
                <Layout className={ "basic-right" }>
                    <Header className={ "basic-header" }>Header</Header>
                    <Content className={ "basic-content" }>
                        <RouterProvider router={ router }/>
                    </Content>
                    <Footer className={ "basic-footer" }>Footer</Footer>
                </Layout>
            </Layout>


        </div>
    );
}

export default App;
