import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteError from '@/routers/RouteError';
import TodoApp from '@/pages/TodoApp';
import { Calendar, ConfigProvider } from '@douyinfe/semi-ui';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import CalendarView from '@/components/Calendar';

export default function MainRouter() {
    const router = createBrowserRouter([
        // todo: the routes now are shit
        // seperate them
        {
            path: '/',
            element: <CalendarView />,
            errorElement: <RouteError />
            // children
        }
    ]);

    return <RouterProvider router={router} />;
}
