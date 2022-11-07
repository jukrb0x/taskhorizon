import {
    BrowserRouter,
    HashRouter,
    MemoryRouter,
    Navigate,
    Route,
    RouterProvider,
    Routes
} from 'react-router-dom';
import Home from '@/pages/Home';
import BigCalendar from '@/components/BigCalendar';
import TuiCalendar from '@/components/experimental/ToastCalendar';
import SemiCalendar from '@/components/experimental/SemiCalendar';
import NotFound from '@/routes/components/NotFound';

function AppRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<Navigate to={'/component/big-cal'} />} />
                    <Route path="/component/big-cal" element={<BigCalendar />} />
                    <Route path="/component/semi-cal" element={<SemiCalendar />} />
                    <Route path={'/component/tui-cal'} element={<TuiCalendar />} />
                </Route>
                <Route path={'*'} element={<NotFound />} />
            </Routes>
        </>
    );
}

export default function AppRouterWrapper() {
    return (
        <>
            <HashRouter>
                <AppRoute />
            </HashRouter>
        </>
    );
}
