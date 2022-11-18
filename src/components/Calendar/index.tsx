import { Calendar, luxonLocalizer, momentLocalizer, SlotInfo } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
// import luxon from 'luxon';
import './styles/default/styles.scss';
import './styles/default/dragAndDrop.scss';
import { useEventStore } from '@/store';
import { CalendarEvent } from '@/store/event-store';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { EventCard } from '@/components/EventCard';
import { Button } from '@/components/Button';
import {
    flip,
    offset,
    shift,
    useFloating,
    FloatingPortal,
    FloatingFocusManager,
    useInteractions,
    useRole,
    useDismiss,
    useTypeahead,
    useListNavigation,
    FloatingOverlay,
    autoUpdate
} from '@floating-ui/react-dom-interactions';
import { useViewportSize } from '@mantine/hooks';

const localizer = momentLocalizer(moment); // todo: use luxon, later when we need multi-timezone support, moment.js is not good enough

const DnDCalendar = withDragAndDrop(Calendar);

export default function BigCalendar() {
    const { eventList } = useEventStore();
    const [newEvent, setNewEvent] = useState<CalendarEvent>();

    // todo: get bounds of event for floating event card
    const handleSelectEvent = (event: CalendarEvent, base: SyntheticEvent) => {
        console.log(base.target);
        const newEvent: CalendarEvent = {
            completed: event.completed,
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

    const handleSelectSlot = (slotInfo: SlotInfo, b: SyntheticEvent) => {
        if (visible) {
            // b.preventDefault() // fixme: chrome, should dismiss before next selecting
            // setVisible(false);
            // return;
        }
        const newEvent: CalendarEvent = {
            completed: false,
            allDay: false,
            start: slotInfo.start,
            end: slotInfo.end,
            id: '',
            title: ''
        };
        setNewEvent(newEvent);
        setVisible(true);
    };

    const calendarRef = useRef(null);

    // floating event card
    const [visible, setVisible] = useState(false);
    const { x, y, reference, floating, strategy, refs, update, context } = useFloating({
        open: visible,
        onOpenChange: setVisible,
        middleware: [offset({ mainAxis: 5, alignmentAxis: 4 }), flip(), shift()],
        placement: 'right-start'
    });

    useEffect(() => {
        if (visible && refs.reference.current && refs.floating.current) {
            return autoUpdate(refs.reference.current, refs.floating.current, update);
        }
    }, [open, update, refs.reference, refs.floating]);

    const { getFloatingProps } = useInteractions([
        // useRole(context, { role: "menu" }),
        useDismiss(context)
    ]);

    const { height, width } = useViewportSize();
    return (
        <>
            <FloatingPortal>
                {visible && (
                    <FloatingOverlay lockScroll>
                        <FloatingFocusManager context={context}>
                            <div
                                {...getFloatingProps({
                                    className: '',
                                    ref: floating,
                                    style: {
                                        position: strategy,
                                        top: y ?? height / 2,
                                        left: x ?? width / 2
                                    }
                                })}
                            >
                                <EventCard defaultEvent={newEvent} />
                            </div>
                        </FloatingFocusManager>
                    </FloatingOverlay>
                )}
            </FloatingPortal>

            <DnDCalendar
                step={15}
                timeslots={4}
                ref={calendarRef}
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
                onSelectEvent={(e, b) => {
                    handleSelectEvent(e as CalendarEvent, b);
                }}
                onSelectSlot={(e, b) => handleSelectSlot(e, b)}
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
