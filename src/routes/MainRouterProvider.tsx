import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

export default function MainRouterProvider() {
    const router = createBrowserRouter(routes);
    // tips: can use createRoutesFromElements(JSX.Element) => Route[]
    return <RouterProvider router={router} />;
}
