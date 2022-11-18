import { Calendar, luxonLocalizer, momentLocalizer, SlotInfo, Event } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
// import luxon from 'luxon';
import './styles/default/styles.scss';
import './styles/default/dragAndDrop.scss';
import { useEventStore } from '@/store';
import { CalendarEvent } from '@/store/event-store';
import { EventCreator } from '@/components/EventCardOld/EventCreator';
import { useState } from 'react';
import { Modal, Typography } from '@douyinfe/semi-ui';
import { EventCard } from '@/components/EventCard';
import { Button } from '@/components/Button';

const localizer = momentLocalizer(moment); // todo: use luxon, later when we need multi-timezone support, moment.js is not good enough

const DnDCalendar = withDragAndDrop(Calendar);

export default function BigCalendar() {
    const { eventList } = useEventStore();
    const [visible, setVisible] = useState(false);
    const [newEvent, setNewEvent] = useState<CalendarEvent>();

    const handleSelectEvent = (event: CalendarEvent) => {
        const newEvent: CalendarEvent = {
            allDay: event.allDay,
            start: event.start,
            end: event.end,
            id: event.id,
            title: event.title,
            desc: event.desc
        };
        setNewEvent(newEvent);
        setVisible(true);
    };

    const { Title } = Typography;
    const handleSelectSlot = (slotInfo: SlotInfo) => {
        const newEvent: CalendarEvent = {
            allDay: false,
            start: slotInfo.start,
            end: slotInfo.end,
            id: '',
            title: ''
        };
        setNewEvent(newEvent);
        setVisible(true);
    };

    return (
        <>
            {/*       debug      */}
            <Modal
                header={
                    <Title heading={4} className={'tw-py-4'}>
                        Create New Event
                    </Title>
                }
                // visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <EventCreator onEventCreated={() => setVisible(false)} defaultEvent={newEvent} />
            </Modal>

            <Modal
                // visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <EventCard defaultEvent={newEvent} />
            </Modal>
            {visible && <EventCard defaultEvent={newEvent} />}

            <DnDCalendar
                localizer={localizer}
                events={eventList}
                draggableAccessor={(event) => true} // todo
                resizable
                selectable
                dayLayoutAlgorithm="no-overlap"
                defaultView={'week'}
                onEventResize={(event) => {
                    console.log('onEventResize', event);
                }}
                onSelectEvent={(e) => handleSelectEvent(e as CalendarEvent)}
                onSelectSlot={handleSelectSlot}
                onDragStart={(event) => {
                    console.log('onDragStart', event);
                }}
                onEventDrop={(event) => {
                    console.log('onEventDrop', event);
                }}
                onDragOver={(event) => {
                    console.log('onDragOver', event);
                }}
                onDropFromOutside={(event) => {
                    console.log('onDropFromOutside', event);
                }}
            />
        </>
    );
}
