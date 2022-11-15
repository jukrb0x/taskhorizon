import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { createRef, useEffect, useRef } from 'react';
import { Button, Notification } from '@douyinfe/semi-ui';
import ToastUIReactCalendar from '@toast-ui/react-calendar';
import Controller from './Controller';
import { CalendarEvent } from './data-structure';

const calendars = [{ id: 'default', name: 'Calendar' }];
export default function TuiCalendar() {
    const calRef = useRef<ToastUIReactCalendar>(null);
    const events: CalendarEvent[] = [
        {
            id: '1',
            calendarId: 'default',
            title: 'Lunch',
            category: 'time',
            start: '2022-10-25T12:00:00',
            end: '2022-10-25T13:30:00'
        },
        {
            id: '2',
            calendarId: 'default',
            title: 'Coffee Break',
            category: 'time',
            start: '2022-10-26T15:00:00',
            end: '2022-10-26T15:30:00'
        }
    ];

    function handleNext() {
        const cal = calRef?.current?.getInstance();
        cal?.next();
    }

    function handlePrev() {
        const cal = calRef?.current?.getInstance();
        cal?.prev();
    }
    const array = [
        { name: 'joe', age: 12 },
        { name: 'doe', age: 21 }
    ];
    // return new array only has names
    const names = array.map((item) => item.name);

    return (
        <div className={'tw-flex tw-flex-col tw-h-full tw-items-stretch'}>
            <div>
                <Controller handlePrev={handlePrev} handleNext={handleNext} />
            </div>
            <Calendar
                height={'100%'}
                usageStatistics={false} // ga-statistics of toast-ui
                ref={calRef}
                calendars={calendars}
                view={'week'}
                week={{ taskView: false, eventView: true }}
                events={events}
            />
        </div>
    );
}
