import RouteError from '@/routes/RouteError';
import SemiCalendar from '@/components/SemiCalendar';
import Calendar from '@/components/Calendar';
import MainLayout from '@/components/MainLayout';
import { Navigate, RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <RouteError />,
        children: [
            {
                // default redirection
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
