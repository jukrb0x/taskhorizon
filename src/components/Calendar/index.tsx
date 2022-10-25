import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { useRef } from 'react';
import { Button } from '@douyinfe/semi-ui';
import ToastUIReactCalendar from '@toast-ui/react-calendar';
import Controller from './Controller';

export default function MyCalendar() {
    const calRef = useRef<ToastUIReactCalendar>(null);

    function handleNext() {
        const cal = calRef?.current?.getInstance();
        cal?.next();
    }

    function handlePrev() {
        const cal = calRef?.current?.getInstance();
        cal?.prev();
    }

    return (
        <div style={{ height: '100%' }}>
            <Controller handlePrev={handlePrev} handleNext={handleNext} />
            {/*<Button onClick={() => handlePrev()}>Prev</Button>*/}
            {/*<Button onClick={() => handleNext()}>Next</Button>*/}
            <Calendar
                ref={calRef}
                usageStatistics={false}
                view={'week'}
                week={{ taskView: false, eventView: true }}
            />
        </div>
    );
}
