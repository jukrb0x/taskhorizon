import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { useEffect, useRef } from 'react';
import { Button, Notification } from '@douyinfe/semi-ui';
import ToastUIReactCalendar from '@toast-ui/react-calendar';
import Controller from './Controller';
import { EventObject } from '@toast-ui/calendar';

const calendars = [{ id: 'default', name: 'Calendar' }];
export default function MyCalendar() {
    const calRef = useRef<ToastUIReactCalendar>(null);
    const events: EventObject[] = [
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
