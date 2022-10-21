import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteError from '@/routers/RouteError';
import TodoApp from '@/pages/TodoApp';
import { Calendar, ConfigProvider } from '@douyinfe/semi-ui';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import img from '~/public/876-536x354.jpg';

const dailyEventStyle = {
    borderRadius: '3px',
    boxSizing: 'border-box',
    border: 'var(--semi-color-primary) 1px solid',
    padding: '10px',
    backgroundColor: 'var(--semi-color-primary-light-default)',
    height: '100%',
    overflow: 'hidden'
};
const allDayStyle = {
    borderRadius: '3px',
    boxSizing: 'border-box',
    border: 'var(--semi-color-bg-1) 1px solid',
    padding: '2px 4px',
    backgroundColor: 'var(--semi-color-primary-light-active)',
    height: '100%',
    overflow: 'hidden'
};
const dailyStyle = false ? allDayStyle : dailyEventStyle;
const events = [
    {
        key: '0',
        start: new Date(2019, 5, 25, 14, 45, 0),
        end: new Date(2019, 6, 26, 6, 18, 0),
        children: <div style={dailyStyle}>TEST June 25th 14:45 ~ July 26th 6:18</div>
    },
    {
        key: '1',
        start: new Date(2019, 6, 18, 10, 0, 0),
        end: new Date(2019, 6, 30, 8, 0, 0),
        children: <div style={allDayStyle}>July 18th 10:00 ~ July 30th 8:00</div>
    },
    {
        key: '2',
        start: new Date(2019, 6, 19, 20, 0, 0),
        end: new Date(2019, 6, 23, 14, 0, 0),
        children: <div style={allDayStyle}>July 19th 20:00 ~ July 23rd 14:00</div>
    },
    {
        key: '3',
        start: new Date(2019, 6, 21, 6, 0, 0),
        end: new Date(2019, 6, 25, 6, 0, 0),
        children: <div style={allDayStyle}>July 21st 6:00 ~ July 25th 6:00</div>
    },
    {
        key: '4',
        allDay: true,
        start: new Date(2019, 6, 22, 8, 0, 0),
        children: <div style={allDayStyle}>July 22 full day</div>
    },
    {
        key: '5',
        start: new Date(2019, 6, 22, 9, 0, 0),
        end: new Date(2019, 6, 23, 23, 0, 0),
        children: <div style={allDayStyle}>July 22nd 9:00 ~ July 23rd 23:00</div>
    },
    {
        key: '6',
        start: new Date(2019, 6, 23, 8, 32, 0),
        children: <div style={dailyStyle}>TEST July 23 8:32</div>
    },
    {
        key: '7',
        start: new Date(2019, 6, 23, 14, 30, 0),
        end: new Date(2019, 6, 23, 20, 0, 0),
        children: <div style={dailyStyle}>July 23 14:30-20:00</div>
    },
    {
        key: '8',
        start: new Date(2019, 6, 25, 8, 0, 0),
        end: new Date(2019, 6, 27, 6, 0, 0),
        children: <div style={allDayStyle}>July 25th 8:00 ~ July 27th 6:00</div>
    },
    {
        key: '9',
        start: new Date(2019, 6, 26, 10, 0, 0),
        end: new Date(2019, 6, 27, 16, 0, 0),
        children: <div style={allDayStyle}>July 26th 10:00 ~ July 27th 16:00</div>
    },
    {
        key: '10',
        start: new Date(2019, 6, 21, 10, 0, 0),
        end: new Date(2019, 6, 21, 12, 0, 0),
        children: (
            <div style={allDayStyle}>
                <img src={img} />
            </div>
        )
    }
];

function Placeholder() {
    return (
        <>
            <ConfigProvider locale={en_GB}>
                <Calendar
                    mode={'week'}
                    events={events}
                    displayValue={new Date(2019, 6, 23, 8, 32, 0)}
                    range={[new Date(2019, 6, 23), new Date(2019, 6, 26)]}
                />
            </ConfigProvider>
        </>
    );
}

export default function MainRouter() {
    const router = createBrowserRouter([
        // todo: the routes now are shit
        // seperate them
        {
            path: '/',
            element: <Placeholder />,
            errorElement: <RouteError />
            // children
        }
    ]);

    return <RouterProvider router={router} />;
}
