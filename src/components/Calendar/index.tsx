import { Calendar, luxonLocalizer, momentLocalizer, SlotInfo } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
// import luxon from 'luxon';
import './styles/default/styles.scss';
import './styles/default/dragAndDrop.scss';
import { useEventStore } from '@/store';
import { CalendarEvent } from '@/store/event-store';
import { SyntheticEvent, useEffect, useState } from 'react';
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

const localizer = momentLocalizer(moment); // todo: use luxon, later when we need multi-timezone support, moment.js is not good enough

const DnDCalendar = withDragAndDrop(Calendar);

// todo: make a wrapper for Floating Event Card
export default function BigCalendar() {
    const { eventList } = useEventStore();
    const [popEvent, setPopEvent] = useState<CalendarEvent>();

    // todo: get bounds of event for floating event card

    const handleSelectEvent = (event: CalendarEvent, base: SyntheticEvent) => {
        setSelectable(false);
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
        setSelectable(false);
        // todo: make it unselectable (freeze selection)

        // let x = 0;
        // let y = 0;
        // let top = 0;
        // let left = 0;
        // let right = 0;
        // let bottom = 0;
        // let height = 0;
        // let width = 0;

        const bounds = document // todo: better not to search in the whole document
            .getElementsByClassName('rbc-slot-selection')[0]
            .getBoundingClientRect();
        const x = bounds.x;
        const y = bounds.y;
        const top = bounds.top;
        const left = bounds.left;
        const right = bounds.right;
        const bottom = bounds.bottom;
        const height = bounds.height;
        const width = bounds.width;
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
                // todo: make it floating base on the calendar box
                return {
                    x,
                    y,
                    top,
                    right,
                    left,
                    bottom,
                    width,
                    height
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
