import { Login, Signup, BigCalendar } from '@/components';
import { AuthLayout } from '@/pages/Auth';
import { HomeLayout } from '@/pages/Home';
import { LandingLayout } from '@/pages/Landing';
import { Playground } from '@/pages/Playground/Playground';
import { NotFound } from '@/routes/components/NotFound';
import { Navigate, Route, Routes } from 'react-router-dom';

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
