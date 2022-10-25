import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import RouteError from '@/routes/RouteError';
import SemiCalendar from '@/components/SemiCalendar';
import Calendar from '@/components/Calendar';
import MainLayout from '@/components/MainLayout';
import { routes } from './routes';

export default function MainRouterProvider() {
    const router = createBrowserRouter(routes);

    return <RouterProvider router={router} />;
}
