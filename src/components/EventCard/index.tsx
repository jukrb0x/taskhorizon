import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Checkbox,
    Button as MButton,
    TextInput,
    Textarea,
    ActionIcon,
    Text,
    Tooltip,
    Menu,
    Transition
} from '@mantine/core';
import { Button } from '@/components/Button';
import * as dateFns from 'date-fns';
import { DatetimePicker } from './DatetimePicker';
import { CalendarEvent, EventIdGenerator } from '@/store/event-store';
import { useEventStore } from '@/store';
import { IconChevronDown, IconDots, IconTrash } from '@tabler/icons';

type EventCardMode = 'edit' | 'create';

interface EventCardProps {
    value?: CalendarEvent;
    onEventCreated?: () => void;
    onDismissed?: () => void;
    mode?: EventCardMode;
}

// todo: this component is too much nested, need decompose
const EventCard = (props: EventCardProps) => {
    const defaultEvent = props.value;

    // ----- STORE -----
    const { addEvent, setEvent, removeEvent } = useEventStore();

    // ----- STATES -----
    const [title, setTitle] = useState<string>(defaultEvent?.title || '');
    const [allDay, setAllDay] = useState<boolean>(defaultEvent?.allDay || false); // todo: cannot set allDay if the day range is more than 1
    const [description, setDescription] = useState<string>(defaultEvent?.desc || '');
    const [completed, setCompleted] = useState<boolean>(defaultEvent?.completed || false);
    const [startTime, setStartTime] = useState<Date>(defaultEvent?.start || new Date());
    const [startDate, setStartDate] = useState<Date>(defaultEvent?.start || new Date());
    const [endTime, setEndTime] = useState<Date>(defaultEvent?.end || new Date());
    const [endDate, setEndDate] = useState<Date>(defaultEvent?.end || new Date());
    const start = useMemo(
        () =>
            dateFns.setHours(
                dateFns.setMinutes(startDate, startTime.getMinutes()),
                startTime.getHours()
            ),
        [startDate, startTime]
    );
    const end = useMemo(
        () =>
            dateFns.setHours(dateFns.setMinutes(endDate, endTime.getMinutes()), endTime.getHours()),
        [endDate, endTime]
    );

    // determine if the default event is changed
    const isEdited = useMemo(() => {
        if (props.mode != 'edit' || !defaultEvent?.id) return false; // ensure event exists
        return (
            defaultEvent.title != title ||
            defaultEvent.desc != description ||
            defaultEvent.completed != completed ||
            defaultEvent.start.toISOString() != start.toISOString() ||
            defaultEvent.end.toISOString() != end.toISOString() ||
            defaultEvent.allDay != allDay
        );
    }, [defaultEvent, title, description, completed, start, end, allDay]);
    const isValidEvent = title.trim() != '' && startDate != null && endDate != null;

    // ----- COMPONENT METHODS -----
    const handleStartChange = (date: Date, time: Date) => {
        if (!date) date = new Date();
        setStartTime(time);
        setStartDate(date);
    };

    const handleEndChange = (date: Date, time: Date) => {
        if (!date) date = new Date();
        setEndTime(time);
        setEndDate(date);
    };

    const createEvent = () => {
        if (!isValidEvent) return;
        const event: CalendarEvent = {
            id: 'new event id will be generated',
            completed: completed,
            title: title.trim(),
            desc: description,
            start: start,
            end: end,
            allDay: allDay,
            linkedTodos: []
        };
        addEvent(event);
        props.onEventCreated && props.onEventCreated();
    };

    const updateEvent = () => {
        if (!isEdited || !defaultEvent || !isValidEvent) return;
        const event: CalendarEvent = {
            id: defaultEvent.id, // do not change id
            completed: completed,
            title: title.trim(),
            desc: description,
            start: start,
            end: end,
            allDay: allDay,
            linkedTodos: []
        };
        setEvent(defaultEvent.id, event);
        props.onDismissed && props.onDismissed();
    };

    const deleteEvent = () => {
        if (props.mode !== 'edit' || !defaultEvent) return;
        removeEvent(defaultEvent.id);
        props.onDismissed && props.onDismissed();
    };

    return (
        <>
            <div className="tw-h-auto tw-w-72 tw-p-2 tw-rounded-2xl tw-bg-white tw-space-y-1.5 tw-drop-shadow-lg tw-shadow tw-z-50 tw-select-none">
                <div className={'tw-flex tw-row-auto tw-items-center tw-px-0.5'}>
                    <input // this will prevent autofocus on the checkbox
                        style={{ display: 'none' }}
                    />
                    <Checkbox
                        size={'sm'}
                        className={'tw-flex tw-justify-center'}
                        checked={completed}
                        onChange={(e) => setCompleted(e.currentTarget.checked)}
                        data-autofocus={false}
                        autoFocus={false}
                    />
                    <TextInput // todo: use div instead of input, no wrap
                        autoFocus={!title} // todo: only for new event
                        variant={'unstyled'}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={'New Event'}
                        size={'xs'}
                        className={'tw-px-1'}
                        styles={(theme) => ({
                            root: {
                                input: {
                                    fontSize: theme.fontSizes.lg,
                                    fontWeight: 700
                                }
                            }
                        })}
                    />
                </div>

                <div className={'tw-row-auto tw-space-y-1.5'}>
                    <div className={'tw-flex tw-row-auto tw-space-x-1.5'}>
                        <DatetimePicker
                            label={'Start'}
                            time={startTime}
                            date={startDate}
                            onChange={(date, time) => handleStartChange(date as Date, time as Date)}
                        />

                        <DatetimePicker
                            label={'End'}
                            time={endTime}
                            date={endDate}
                            onChange={(date, time) => handleEndChange(date as Date, time as Date)}
                        />
                    </div>

                    <Textarea
                        variant={'filled'}
                        placeholder={'Description'}
                        radius={'md'}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div
                    className={'tw-flex tw-place-content-between tw-place-content-center tw-px-0.5'}
                >
                    <div className={'tw-flex tw-items-center'}>
                        <Tooltip label={'All day'} position={'bottom'} withArrow>
                            <ActionIcon
                                color={allDay ? 'blue.5' : 'gray.5'}
                                onClick={() => setAllDay(!allDay)}
                            >
                                <Text fz={'xs'} fw={700}>
                                    24h
                                </Text>
                            </ActionIcon>
                        </Tooltip>
                    </div>
                    <div
                        className={'tw-flex tw-justify-end tw-items-center'}
                        // style={{ display: defaultEvent ? 'none' : '' }}
                    >
                        {props.mode === 'create' && (
                            <Button
                                disabled={!isValidEvent}
                                onClick={createEvent}
                                variant={'filled'}
                                color={'green'}
                                className={'tw-px-2'}
                                size={'xs'}
                            >
                                Create
                            </Button>
                        )}
                        {props.mode === 'edit' && (
                            <>
                                <Transition
                                    mounted={isEdited}
                                    transition={'slide-left'}
                                    duration={150}
                                >
                                    {(styles) => (
                                        <div style={{ ...styles }}>
                                            <MButton.Group>
                                                <Button
                                                    disabled={!isEdited || !isValidEvent}
                                                    onClick={updateEvent}
                                                    variant={'filled'}
                                                    color={'green'}
                                                    className={'tw-px-2'}
                                                    size={'xs'}
                                                >
                                                    Update
                                                </Button>
                                                <Menu transition={'scale-y'}>
                                                    <Menu.Target>
                                                        <Button
                                                            // disabled
                                                            color={'green'}
                                                            variant={'filled'}
                                                            className={
                                                                'tw-px-1 tw-drop-shadow-none'
                                                            }
                                                            size={'xs'}
                                                        >
                                                            <IconChevronDown size={17} />
                                                        </Button>
                                                    </Menu.Target>
                                                    <Menu.Dropdown>
                                                        <Menu.Item
                                                            color="red"
                                                            icon={<IconTrash size={14} />}
                                                            onClick={() => deleteEvent()}
                                                        >
                                                            Delete
                                                        </Menu.Item>
                                                    </Menu.Dropdown>
                                                </Menu>
                                            </MButton.Group>
                                        </div>
                                    )}
                                </Transition>
                                <Transition
                                    mounted={!isEdited}
                                    transition={'slide-left'}
                                    duration={50}
                                >
                                    {(styles) => (
                                        <div style={{ ...styles }}>
                                            <Menu transition={'scale-y'}>
                                                <Menu.Target>
                                                    <ActionIcon>
                                                        <IconDots size={17} />
                                                    </ActionIcon>
                                                </Menu.Target>
                                                <Menu.Dropdown>
                                                    <Menu.Item
                                                        color="red"
                                                        icon={<IconTrash size={14} />}
                                                        onClick={() => deleteEvent()}
                                                    >
                                                        Delete
                                                    </Menu.Item>
                                                </Menu.Dropdown>
                                            </Menu>
                                        </div>
                                    )}
                                </Transition>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export { EventCard };
export type { EventCardMode };
