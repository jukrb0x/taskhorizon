import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import { useEventStore } from '@/store';

const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(Calendar);

export default function BigCalendar() {
    const { eventList } = useEventStore();
    return (
        <>
            <DnDCalendar
                localizer={localizer}
                events={eventList}
                draggableAccessor={(event) => true}
                resizable
                selectable
                dayLayoutAlgorithm="no-overlap"
                defaultView={'week'}
                className={'tw-p-2'}
            />
        </>
    );
}
