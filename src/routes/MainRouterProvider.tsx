import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteError from '@/routes/RouteError';
import CalendarView from '@/components/Calendar';
import Calendar from '@/components/WIP/Calendar';
import MainLayout from '@/components/MainLayout';

export default function MainRouterProvider() {
    const router = createBrowserRouter([
        // todo: the routes now are shit
        // separate them
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
