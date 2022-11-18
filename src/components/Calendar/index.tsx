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
    FloatingOverlay,
    autoUpdate,
    ClientRectObject
} from '@floating-ui/react-dom-interactions';
import { useMouse } from '@mantine/hooks';

const localizer = momentLocalizer(moment); // todo: use luxon, later when we need multi-timezone support, moment.js is not good enough

const DnDCalendar = withDragAndDrop(Calendar);

// todo: make a wrapper for Floating Event Card
export default function BigCalendar() {
    const { eventList } = useEventStore();
    const [popEvent, setPopEvent] = useState<CalendarEvent>();

    // todo: get bounds of event for floating event card

    const handleSelectEvent = (event: CalendarEvent, base: SyntheticEvent) => {
        setSelectable(false);
        console.log(base.target);
        // const newEvent: CalendarEvent = {
        //     completed: event.completed,
        //     allDay: event.allDay,
        //     start: event.start,
        //     end: event.end,
        //     id: event.id,
        //     title: event.title,
        //     desc: event.desc
        // };
        setPopEvent(event);

        const { x, y, top, right, left, bottom, height, width } =
            base.currentTarget.getBoundingClientRect();
        reference({
            getBoundingClientRect(): ClientRectObject {
                return { x, y, top, right, left, bottom, height, width };
            }
        });
        setVisible(true);
    };

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        console.table(slotInfo.bounds);
        setSelectable(false);
        const newEvent: CalendarEvent = {
            completed: false,
            allDay: false,
            start: slotInfo.start,
            end: slotInfo.end,
            id: '',
            title: ''
        };
        setPopEvent(newEvent);

        reference({
            getBoundingClientRect(): ClientRectObject {
                let x, y, top, left, right, bottom;
                x = y = top = left = right = bottom = 0;
                // todo: make it floating base on the calendar box
                if (slotInfo.box) {
                    right = x = slotInfo.box.x;
                    top = y = slotInfo.box.y;
                    left = x - 10;
                    bottom = y - 10;
                } else if (slotInfo.bounds) {
                    x = slotInfo.bounds.x;
                    y = slotInfo.bounds.y;
                    top = slotInfo.bounds.top;
                    bottom = slotInfo.bounds.bottom;
                    left = slotInfo.bounds.left;
                    right = slotInfo.bounds.right;
                }
                return {
                    x,
                    y,
                    top,
                    right,
                    left,
                    bottom,
                    width: 0,
                    height: 0
                };
            }
        });

        setVisible(true);
    };

    // floating event card
    const [visible, setVisible] = useState(false);

    const { x, y, reference, floating, strategy, refs, update, context } = useFloating({
        open: visible,
        onOpenChange: setVisible,
        middleware: [offset({ mainAxis: 7, alignmentAxis: 0 }), flip(), shift()],
        placement: 'right-start'
    });

    useEffect(() => {
        if (visible && refs.reference.current && refs.floating.current) {
            return autoUpdate(refs.reference.current, refs.floating.current, update);
        }
    }, [visible, update, refs.reference, refs.floating]);

    const { getFloatingProps } = useInteractions([
        useRole(context, { role: 'dialog' }),
        useDismiss(context)
    ]);

    // prevent selecting anything until popover is dismissed
    const [selectable, setSelectable] = useState(true);
    useEffect(() => {
        document.addEventListener('mouseup', () => {
            setSelectable(true);
        });
        return () => {
            document.removeEventListener('mouseup', () => {
                setSelectable(true);
            });
        };
    }, [visible, selectable]);

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
                                        top: y ?? 0,
                                        left: x ?? 0
                                    }
                                })}
                            >
                                <EventCard defaultEvent={popEvent} />
                            </div>
                        </FloatingFocusManager>
                    </FloatingOverlay>
                )}
            </FloatingPortal>
            {/* Month View is buggy */}
            <DnDCalendar
                step={15}
                timeslots={4}
                // ref={ref}
                localizer={localizer}
                events={eventList}
                draggableAccessor={(event) => true} // todo
                resizable
                selectable={selectable}
                dayLayoutAlgorithm="no-overlap"
                defaultView={'week'}
                onEventResize={(event) => {
                    console.log('onEventResize', event);
                }}
                onSelectEvent={(e, b) => {
                    handleSelectEvent(e as CalendarEvent, b);
                }}
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
