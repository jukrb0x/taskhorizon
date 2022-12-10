import { Navigate, Route, Routes } from 'react-router-dom';
import { HomeLayout } from '@/pages/Home';
import BigCalendar from '@/components/Calendar';
import NotFound from '@/routes/components/NotFound';
import { Playground } from '@/pages/Calendar/playground';
import LandingLayout from '@/pages/Landing';
import AuthLayout from '@/pages/Auth';
import { Login, Signup } from '@/components/Auth';

export default function AppRoute() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<LandingLayout />} />
                <Route path="auth" element={<AuthLayout />}>
                    <Route index element={<Navigate to={'login'} />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>

                <Route path="calendar" element={<HomeLayout />}>
                    <Route index element={<BigCalendar />} />
                    <Route path="playground" element={<Playground />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
