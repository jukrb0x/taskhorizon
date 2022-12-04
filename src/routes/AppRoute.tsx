import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import BigCalendar from '@/components/Calendar';
import NotFound from '@/routes/components/NotFound';
import CalendarApp from '@/pages/Calendar';
import { Playground } from '@/pages/Calendar/playground';
import TodoApp from '@/components/Todo';

export default function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route index element={<Navigate to={'/calendar'} />} />
                <Route path="/calendar" element={<CalendarApp />}>
                    <Route index element={<BigCalendar />} />
                    <Route path={'playground'} element={<Playground />} />
                </Route>
            </Route>
            <Route path="/test" element={<TodoApp />} />
            <Route path={'*'} element={<NotFound />} />
        </Routes>
    );
}
