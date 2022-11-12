import { Calendar, luxonLocalizer, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
// import luxon from 'luxon';
import './styles/default/styles.scss';
import './styles/default/dragAndDrop.scss';
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
            />
        </>
    );
}
