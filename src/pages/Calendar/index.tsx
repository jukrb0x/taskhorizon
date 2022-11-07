import { Outlet } from 'react-router-dom';

export default function CalendarApp() {
    return (
        <div className={'tw-p-2'}>
            <Outlet />
        </div>
    );
}
