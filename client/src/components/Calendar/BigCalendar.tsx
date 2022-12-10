import { Calendar, luxonLocalizer, momentLocalizer, SlotInfo } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
// import luxon from 'luxon';
import './styles/default/styles.scss';
import './styles/default/dragAndDrop.scss';
import { useEventStore, useTodoStore } from '@/store';
import { CalendarEvent } from '@/store/event-store';
import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { EventCard, EventCardMode } from '@/components/EventCard';
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
import { CSSTransition } from 'react-transition-group';
import './styles/animation.scss';
import { useEventListener } from '@mantine/hooks';

const localizer = momentLocalizer(moment); // todo: use luxon, later when we need multi-timezone support, moment.js is not good enough

const DnDCalendar = withDragAndDrop(Calendar);
// todo: (low priority) make a wrapper for Floating Event Card
//     not easy to do, they are deeply coupled.
//     this function is too long, need to be refactored.
export const BigCalendar = () => {
    const { eventList, setEvent, addEvent, addLinkedTodo } = useEventStore();
    const { dragItem, clearDragItem, addLinkedEvent } = useTodoStore();
    // Floating Event Card (Pop-up)
    const [popEvent, setPopEvent] = useState<CalendarEvent>();
    const [popMode, setPopMode] = useState<EventCardMode>('create');
    const [popVisible, setPopVisible] = useState(false);

    const {
        x,
        y,
        reference: popReference,
        floating,
        strategy,
        refs,
        update,
        context
    } = useFloating({
        open: popVisible,
        onOpenChange: setPopVisible,
        middleware: [offset({ mainAxis: 7, alignmentAxis: 0 }), flip(), shift()],
        placement: 'right-start'
    });

    const setPopEventCard = useCallback(
        (event: CalendarEvent, mode: EventCardMode, popRect: ClientRectObject | DOMRect) => {
            setPopEvent(event);
            setPopMode(mode);
            popReference({
                getBoundingClientRect(): ClientRectObject {
                    return popRect;
                }
            });
        },
        [setPopEvent, setPopMode, popReference]
    );

    // auto update floating event card position
    useEffect(() => {
        if (popVisible && refs.reference.current && refs.floating.current) {
            return autoUpdate(refs.reference.current, refs.floating.current, update);
        }
    }, [popVisible, update, refs.reference, refs.floating]);

    const { getFloatingProps } = useInteractions([
        useRole(context, { role: 'dialog' }),
        useDismiss(context)
    ]);

    // prevent selecting anything until popover is dismissed
    const [selectable, setSelectable] = useState(true);
    const calendarRef = useEventListener('mouseup', () => {
        setSelectable(true);
    });

    // --- Calendar Handlers ---

    // handle dragged to-do to create Calendar event
    const createEventFromTodo = useCallback(
        (e: { start: Date; end: Date; allDay: boolean }) => {
            if (dragItem === null) return;
            const event: CalendarEvent = {
                id: 'new event id will be generated',
                title: dragItem.title.trim(),
                start: e.start,
                end: e.end,
                allDay: e.allDay,
                completed: dragItem.completed,
                linkedTodos: [dragItem.id]
            };
            const createdEventId = addEvent(event);
            addLinkedEvent(dragItem.id, createdEventId);
            clearDragItem();
        },
        [setPopVisible, setPopEventCard, dragItem, clearDragItem]
    );

    // cache dragged event
    const [draggedEvent, setDraggedEvent] = useState<CalendarEvent>();

    interface DraggedEvent {
        event: CalendarEvent;
        action: 'resize' | 'move';
        direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
    }

    const handleDragStart = useCallback(
        ({ event, action, direction }: DraggedEvent) => {
            setDraggedEvent(event);
        },
        [setDraggedEvent]
    );

    // move to reschedule event
    interface EventDropProps {
        event: CalendarEvent;
        start: Date;
        end: Date;
        isAllDay: boolean;
    }

    const handleEventDrop = useCallback(
        ({ event, start, end, isAllDay }: EventDropProps) => {
            const nextEvent: CalendarEvent = {
                ...event,
                start: start,
                end: end,
                allDay: isAllDay
            };
            setEvent(event.id, nextEvent);
        },
        [setEvent]
    ); /* handleEventDrop */

    // resize event to reschedule
    const handleEventResize = useCallback(
        ({ event, start, end }: { event: CalendarEvent; start: Date; end: Date }) => {
            event.start = start;
            event.end = end;
            setEvent(event.id, event);
        },
        [setEvent]
    ); /* handleEventResize */

    // select event to edit
    const handleSelectEvent = useCallback(
        (event: CalendarEvent, base: SyntheticEvent) => {
            setSelectable(false);
            setPopEventCard(event, 'edit', base.currentTarget.getBoundingClientRect());
            setPopVisible(true);
        },
        [setSelectable, setPopVisible]
    ); /* handleSelectEvent */

    // return the element of the time slot
    const getElementFromStartTime = useCallback((startTime: Date) => {
        const els = document.getElementsByClassName(startTime.toISOString());
        for (let i = 0; i < els.length; i++) {
            if (els[i].closest('.rbc-day-slot')) {
                // there are two elements has exact same class name but one is time gutter
                return els[i];
            }
        }
    }, []);
    // create event
    const handleSelectSlot = useCallback(
        (slotInfo: SlotInfo) => {
            setSelectable(false);
            // todo: (mid priority) make it unselectable (freeze selection)
            let bounds: DOMRect = new DOMRect();
            switch (slotInfo.action) {
            case 'select':
                bounds = document // todo: better not to search in the whole document
                    .getElementsByClassName('rbc-slot-selection')[0]
                    .getBoundingClientRect();
                break;
            case 'click':
                // const els = document.getElementsByClassName(slotInfo.start.toISOString());
                // for (let i = 0; i < els.length; i++) {
                //     if (els[i].closest('.rbc-day-slot')) {
                //         // there are two elements has exact same class name but one is time gutter
                //         bounds = els[i].getBoundingClientRect();
                //     }
                // }
                if (slotInfo) {
                    bounds =
                            getElementFromStartTime(slotInfo.start)?.getBoundingClientRect() ||
                            new DOMRect();
                }
                break;
            case 'doubleClick':
                return;
            }
            const newEvent: CalendarEvent = {
                id: 'new event id',
                completed: false,
                allDay: false,
                start: slotInfo.start,
                end: slotInfo.end,
                title: ''
            };
            setPopEventCard(newEvent, 'create', bounds);
            setPopVisible(true);
        },
        [setPopVisible, setSelectable, setPopEventCard]
    ); /* handleSelectSlot */

    const eventCardWrapperRef = useRef(null); // css transition ref

    return (
        <>
            <CSSTransition
                // todo: workaround animation, not perfect
                in={popVisible}
                nodeRef={eventCardWrapperRef}
                timeout={150}
                classNames="event-card-anim"
                onEnter={() => setPopVisible(true)}
                onExited={() => setPopVisible(false)}
            >
                <FloatingPortal>
                    {popVisible && (
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
                                    <div ref={eventCardWrapperRef}>
                                        <EventCard
                                            value={popEvent}
                                            onEventCreated={() => setPopVisible(false)}
                                            onDismissed={() => setPopVisible(false)}
                                            mode={popMode}
                                        />
                                    </div>
                                </div>
                            </FloatingFocusManager>
                        </FloatingOverlay>
                    )}
                </FloatingPortal>
            </CSSTransition>

            <div ref={calendarRef}>
                <DnDCalendar
                    defaultView={'week'}
                    views={['week', 'day']}
                    step={15}
                    timeslots={4}
                    localizer={localizer}
                    events={eventList}
                    draggableAccessor={(event) => true} // determine the event is draggable
                    resizable
                    selectable={selectable}
                    dayLayoutAlgorithm="no-overlap"
                    slotPropGetter={(date) => ({ className: date.toISOString() })}
                    onEventResize={(val) =>
                        handleEventResize(val as { event: CalendarEvent; start: Date; end: Date })
                    }
                    onSelectEvent={(e, b) => {
                        handleSelectEvent(e as CalendarEvent, b);
                    }}
                    onSelectSlot={handleSelectSlot}
                    onDragStart={(val) => handleDragStart(val as DraggedEvent)}
                    onEventDrop={(val) => handleEventDrop(val as EventDropProps)}
                    onDragOver={(event) => {
                        event.preventDefault();
                        console.log('onDragOver', event);
                    }}
                    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                    // @ts-ignore
                    onDropFromOutside={createEventFromTodo}
                    // toolbar={false} // todo: custom toolbar component
                    // dragFromOutsideItem={()=>true} todo: visual assistance
                />
            </div>
        </>
    );
};
