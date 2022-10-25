import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteError from '@/routes/RouteError';
import SemiCalendar from '@/components/SemiCalendar';
import Calendar from '@/components/Calendar';
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
                    path: '/',
                    element: <SemiCalendar />
                },
                {
                    path: '/component/cal',
                    element: <Calendar />
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}
