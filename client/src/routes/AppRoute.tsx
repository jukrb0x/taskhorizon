import { Navigate, Route, Routes } from 'react-router-dom';
import HomeLayout from '@/pages/Home';
import BigCalendar from '@/components/Calendar';
import NotFound from '@/routes/components/NotFound';
import { Playground } from '@/pages/Calendar/playground';
import TodoApp from '@/components/Todo';
import StartLayout from '@/pages/Auth';

export default function AppRoute() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Navigate to={'/login'} />} />
                <Route path="login" element={<StartLayout />} />

                <Route path="calendar" element={<HomeLayout />}>
                    <Route index element={<BigCalendar />} />
                    <Route path="playground" element={<Playground />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
