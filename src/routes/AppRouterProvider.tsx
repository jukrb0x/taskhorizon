import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

export default function AppRouterProvider() {
    const router = createBrowserRouter(routes);
    // tips: can use createRoutesFromElements(JSX.Element) => Route[]
    // todo: use tsx template to create routes bcuz we cannot see the actual <App />
    return <RouterProvider router={router} />;
}
