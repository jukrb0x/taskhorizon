import { useState } from 'react';
import { Button, Checkbox, DatePicker, Input, TextArea } from '@douyinfe/semi-ui';
import { CalendarEvent, EventIdGenerator } from '@/store/event-store';
import { IconCalendar } from '@douyinfe/semi-icons/lib/es/icons';
import { useEventStore } from '@/store';

interface EventCardModalProps {
    onEventCreated?: () => void;
    defaultEvent?: CalendarEvent;
}

// todo: demo version
const EventCreator = (props: EventCardModalProps) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [start, setStart] = useState<Date | any>(props.defaultEvent?.start);
    const [end, setEnd] = useState<Date | any>(props.defaultEvent?.end || start);
    const [allDay, setAllDay] = useState<boolean>(props.defaultEvent?.allDay || false);
    const { addEvent } = useEventStore();

    const canCreateEvent = title.trim() != '' && start != null && end != null;

    const handleCreate = () => {
        createEvent();
        props.onEventCreated && props.onEventCreated();
    };
    const createEvent = () => {
        if (!canCreateEvent) return;
        const event: CalendarEvent = {
            id: EventIdGenerator(),
            title: title.trim(),
            desc: description,
            start: start,
            end: end,
            allDay: allDay,
            linkedTodos: []
        };
        addEvent(event);
    };

    return (
        <div className={'tw-space-y-4 tw-mb-5'}>
            <Input
                value={title}
                showClear={true}
                placeholder={'Event Title'}
                prefix={<IconCalendar />}
                onChange={(val) => setTitle(val)}
            />
            <TextArea
                value={description}
                maxCount={100}
                showClear={true}
                placeholder={'Event Description'}
                onChange={(val) => setDescription(val)}
            />
            <div className={'tw-flex tw-content-between tw-space-x-2'}>
                <DatePicker
                    value={start}
                    placeholder={'Starts'}
                    showClear
                    format="yyyy-MM-dd HH:mm"
                    type={'dateTime'}
                    onChange={(val) => setStart(val)}
                />
                <DatePicker
                    value={end}
                    placeholder={'Ends'}
                    showClear
                    type={'dateTime'}
                    onChange={(val) => setEnd(val)}
                />
                <Checkbox
                    className={'tw-flex-nowrap tw-items-center'}
                    checked={allDay}
                    onChange={(e) =>
                        setAllDay(e.target.checked == undefined ? false : e.target.checked)
                    }
                >
                    24h
                </Checkbox>
            </div>
            <div className={'tw-flex tw-justify-end'}>
                <Button disabled={!canCreateEvent} onClick={() => handleCreate()}>
                    Create
                </Button>
            </div>
        </div>
    );
};

export { EventCreator };
