import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteError from '@/routers/RouteError';
import CalendarView from '@/components/Calendar';
import Calendar from '@/components/WIP/Calendar';
import MainLayout from '@/components/MainLayout';

export default function MainRouter() {
    const router = createBrowserRouter([
        // todo: the routes now are shit
        // seperate them
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <RouteError />,
            children: [
                {
                    path: '/component/cal',
                    element: <Calendar />
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}
