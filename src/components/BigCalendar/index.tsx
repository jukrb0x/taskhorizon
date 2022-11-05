import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/sass/styles.scss';

const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(Calendar);

export default function BigCalendar() {
    return (
        <>
            <DnDCalendar
                localizer={localizer}
                events={[]}
                draggableAccessor={(event) => true}
                resizable
                selectable
                dayLayoutAlgorithm="no-overlap"
                defaultView={'week'}
            />
        </>
    );
}
