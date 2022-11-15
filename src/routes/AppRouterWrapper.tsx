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
import TuiCalendar from '@/components/Experimental/ToastCalendar';
import SemiCalendar from '@/components/Experimental/SemiCalendar';
import NotFound from '@/routes/components/NotFound';
import CalendarApp from '@/pages/Calendar';

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route index element={<Navigate to={'/calendar'} />} />
                <Route path="/calendar" element={<CalendarApp />}>
                    {/* calendar demos */}
                    <Route index element={<BigCalendar />} />
                    <Route path="big-cal" element={<BigCalendar />} />
                    <Route path="semi-cal" element={<SemiCalendar />} />
                    <Route path="tui-cal" element={<TuiCalendar />} />
                </Route>
            </Route>
            <Route path={'*'} element={<NotFound />} />
        </Routes>
    );
}
