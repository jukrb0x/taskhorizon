import { ChangeEvent, useCallback, useMemo, useState } from 'react';
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
import { Button } from '@/components';
import * as dateFns from 'date-fns';
import { DatetimePicker } from './DatetimePicker';
import { CalendarEvent } from '@/store/event-store';
import { useEventStore } from '@/store';
import { IconChevronDown, IconDots, IconTrash } from '@tabler/icons';
import { useEventListener } from '@mantine/hooks';

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
    const { addEvent, setEvent, removeEvent, toggleCompleted } = useEventStore();

    // ----- STATES -----
    const [title, setTitle] = useState<string>(defaultEvent?.title || '');
    const [allDay, setAllDay] = useState<boolean>(defaultEvent?.allDay || false); // todo: cannot set allDay if the day range is more than 1
    const [description, setDescription] = useState<string>(defaultEvent?.desc || '');
    const [completed, setCompleted] = useState<boolean>(defaultEvent?.completed || false);
    const [startTime, setStartTime] = useState<Date>(defaultEvent?.start || new Date());
    const [startDate, setStartDate] = useState<Date>(defaultEvent?.start || new Date());
    const [endTime, setEndTime] = useState<Date>(defaultEvent?.end || new Date());
    const [endDate, setEndDate] = useState<Date>(defaultEvent?.end || new Date());
    const [linkedTodos, setLinkedTodos] = useState<string[]>(defaultEvent?.linkedTodos || []);
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

    const handleCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (props.mode == 'create') {
            setCompleted(e.currentTarget.checked);
        } else if (props.mode == 'edit') {
            setCompleted(e.currentTarget.checked);
            defaultEvent && toggleCompleted(defaultEvent?.id);
        }
    }, []);

    const createEvent = useCallback(() => {
        if (!isValidEvent) return;
        const event: CalendarEvent = {
            id: 'new event id will be generated',
            completed: completed,
            title: title.trim(),
            desc: description,
            start: start,
            end: end,
            allDay: allDay,
            linkedTodos: linkedTodos
        };
        addEvent(event);
        props.onEventCreated && props.onEventCreated();
    }, [addEvent, completed, title, description, start, end, allDay, linkedTodos]);

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
            linkedTodos: linkedTodos
        };
        setEvent(defaultEvent.id, event);
        props.onDismissed && props.onDismissed();
    };

    const deleteEvent = () => {
        if (props.mode !== 'edit' || !defaultEvent) return;
        removeEvent(defaultEvent.id);
        props.onDismissed && props.onDismissed();
    };

    // keyboard bindings
    const ref = useEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (props.mode === 'create') {
                createEvent();
            } else if (props.mode === 'edit') {
                updateEvent();
            }
        } else if (e.key === 'Backspace') {
            if (props.mode === 'edit' && document.activeElement === document.body) {
                deleteEvent();
            }
        }
    });
    ref.current = document.body;

    // ----- RENDER -----
    return (
        <>
            <div className="tw-h-auto tw-w-72 tw-p-2 tw-rounded-2xl tw-bg-white tw-space-y-1.5 tw-drop-shadow-lg tw-shadow tw-z-50 tw-select-none">
                <div className={'tw-flex tw-row-auto tw-px-0.5'}>
                    <input // this will prevent autofocus on the checkbox
                        style={{ display: 'none' }}
                    />
                    <Checkbox
                        size={'sm'}
                        className={'tw-text-2xl'}
                        checked={completed}
                        onChange={handleCheckboxChange}
                        data-autofocus={false}
                        autoFocus={false}
                    />
                    <Textarea // todo: use div instead of input, no wrap
                        autoFocus={!title} // todo: only for new event
                        variant={'unstyled'}
                        value={title}
                        autosize
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={'New Event'}
                        // size={'xs'}
                        className={'tw-px-1 tw-py-1 tw-flex-grow'}
                        styles={(theme) => ({
                            input: {
                                fontSize: theme.fontSizes.lg,
                                fontWeight: 700,
                                paddingTop: '0!important',
                                paddingBottom: '0!important',
                                lineHeight: '1.5rem',
                                overflow: 'hidden',
                                minHeight: 'auto'
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
                    className={
                        'tw-flex tw-place-content-between tw-place-content-center tw-px-0.5 tw-h-8'
                    }
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
                    <div className={'tw-flex tw-justify-end tw-items-center'}>
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
                                    duration={200}
                                >
                                    {(styles) => (
                                        <div style={{ ...styles }} className={'tw-absolute'}>
                                            <MButton.Group>
                                                <Button
                                                    disabled={!isValidEvent}
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
                                    duration={100}
                                >
                                    {(styles) => (
                                        <div style={{ ...styles }} className={'tw-absolute'}>
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
