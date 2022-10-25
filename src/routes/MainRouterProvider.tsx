import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import RouteError from '@/routes/RouteError';
import SemiCalendar from '@/components/SemiCalendar';
import Calendar from '@/components/Calendar';
import MainLayout from '@/components/MainLayout';
import { routes } from './routes';

export default function MainRouterProvider() {
    const router = createBrowserRouter(routes);
    // tips: can use createRoutesFromElements(JSX.Element) => Route[]

    return <RouterProvider router={router} />;
}
