import RouteError from '@/routes/RouteError';
import SemiCalendar from '@/components/SemiCalendar';
import Calendar from '@/components/Calendar';
import MainLayout from '@/components/MainLayout';
import { Navigate } from 'react-router-dom';

export const routes = [
    // todo: the routes now are shit
    // separate them
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <RouteError />,
        children: [
            {
                path: '/',
                element: <Navigate to={'/home'} />
            },
            {
                path: '/home',
                element: <SemiCalendar />
            },
            {
                path: '/component/cal',
                element: <Calendar />
            }
        ]
    }
];
