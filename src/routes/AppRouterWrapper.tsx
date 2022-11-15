import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import BigCalendar from '@/components/BigCalendar';
import NotFound from '@/routes/components/NotFound';
import CalendarApp from '@/pages/Calendar';

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route index element={<Navigate to={'/calendar'} />} />
                <Route path="/calendar" element={<CalendarApp />}>
                    <Route index element={<BigCalendar />} />
                </Route>
            </Route>
            <Route path={'*'} element={<NotFound />} />
        </Routes>
    );
}
