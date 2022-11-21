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
import { CSSTransition } from 'react-transition-group';
import './styles/animation.scss';

const localizer = momentLocalizer(moment); // todo: use luxon, later when we need multi-timezone support, moment.js is not good enough

const DnDCalendar = withDragAndDrop(Calendar);

// todo: (low priority) make a wrapper for Floating Event Card
//     not easy to do, they are deeply coupled.
export default function BigCalendar() {
    const { eventList } = useEventStore();
    const [popEvent, setPopEvent] = useState<CalendarEvent>();

    // Calendar Event Handlers
    const handleSelectEvent = (event: CalendarEvent, base: SyntheticEvent) => {
        setSelectable(false);
        setPopEvent(event);

        const { x, y, top, right, left, bottom, height, width } =
            base.currentTarget.getBoundingClientRect();
        popReference({
            getBoundingClientRect(): ClientRectObject {
                return { x, y, top, right, left, bottom, height, width };
            }
        });
        setVisible(true);
    }; /* handleSelectEvent */

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        setSelectable(false);
        // todo: make it unselectable (freeze selection)
        let bounds: DOMRect = new DOMRect();
        if (slotInfo.action === 'select') {
            // todo: better not to search in the whole document
            bounds = document
                .getElementsByClassName('rbc-slot-selection')[0]
                .getBoundingClientRect();
        } else if (slotInfo.action === 'click') {
            // todo: double click
            const els = document.getElementsByClassName(slotInfo.start.toISOString());
            for (let i = 0; i < els.length; i++) {
                if (els[i].closest('.rbc-day-slot')) {
                    // there are two elements has exact same class name but one is time gutter
                    bounds = els[i].getBoundingClientRect();
                }
            }
        }
        const x = bounds.x,
            y = bounds.y,
            top = bounds.top,
            left = bounds.left,
            right = bounds.right,
            bottom = bounds.bottom,
            height = bounds.height,
            width = bounds.width;
        const newEvent: CalendarEvent = {
            completed: false,
            allDay: false,
            start: slotInfo.start,
            end: slotInfo.end,
            title: ''
        };
        setPopEvent(newEvent);

        popReference({
            getBoundingClientRect(): ClientRectObject {
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
    }; /* handleSelectSlot */

    // floating event card
    const [visible, setVisible] = useState(false);

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

    const eventCardWrapperRef = useRef(null); // css transition ref
    return (
        <>
            <CSSTransition
                // todo: workaround animation, not perfect
                in={visible}
                nodeRef={eventCardWrapperRef}
                timeout={150}
                classNames="event-card-anim"
                onEnter={() => setVisible(true)}
                onExited={() => setVisible(false)}
            >
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
                                    <div ref={eventCardWrapperRef}>
                                        <EventCard
                                            defaultEvent={popEvent}
                                            onEventCreated={() => setVisible(false)}
                                        />
                                    </div>
                                </div>
                            </FloatingFocusManager>
                        </FloatingOverlay>
                    )}
                </FloatingPortal>
            </CSSTransition>

            {/*
            fixme: Month View is buggy, event card is overlapping 
                why not just disable month view
            */}
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
                slotPropGetter={(date) => ({ className: date.toISOString() })}
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
