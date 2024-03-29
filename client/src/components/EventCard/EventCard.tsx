import {
    ActionIcon,
    Checkbox,
    Button as MButton,
    Menu,
    Text,
    TextInput,
    Textarea,
    Tooltip,
    Transition
} from '@mantine/core';
import { useEventListener } from '@mantine/hooks';
import { IconChevronDown, IconDots, IconTrash } from '@tabler/icons';
import clsx from 'clsx';
import * as dateFns from 'date-fns';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { Button, DatetimePicker } from '@/components';
import { useEvent } from '@/hooks';
import { useEventStore } from '@/store';
import { CalendarEvent, EventIdGenerator } from '@/store/event-store';

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
    const { addEvent, setEvent, removeEvent, toggleCompleted } = useEvent();

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

    // start and end datetime are automatically calculated
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
            defaultEvent.title !== title ||
            defaultEvent.desc !== description ||
            defaultEvent.start.toISOString() !== start.toISOString() ||
            defaultEvent.end.toISOString() !== end.toISOString() ||
            defaultEvent.allDay !== allDay
        );
    }, [defaultEvent, title, description, completed, start, end, allDay]);
    const isValidEvent = title.trim() != '' && startDate != null && endDate != null;

    // -----
    // COMPONENT METHODS
    // -----
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

    const createEvent = useCallback(async () => {
        if (!isValidEvent) return;
        const event: CalendarEvent = {
            id: EventIdGenerator(),
            completed: completed,
            title: title.trim(),
            desc: description,
            start: start,
            end: end,
            allDay: allDay,
            linkedTodos: linkedTodos
        };
        await addEvent(event);
        props.onEventCreated && props.onEventCreated();
    }, [addEvent, completed, title, description, start, end, allDay, linkedTodos]);

    const updateEvent = useCallback(async () => {
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
        await setEvent(defaultEvent.id, event);
        props.onDismissed && props.onDismissed();
    }, [setEvent, completed, title, description, start, end, allDay, linkedTodos]);

    const deleteEvent = async () => {
        if (props.mode !== 'edit' || !defaultEvent) return;
        await removeEvent(defaultEvent.id); // where lag happens
        props.onDismissed && props.onDismissed();
    };

    // -------
    // keyboard bindings
    // -------
    const ref = useEventListener('keydown', async (e) => {
        // new line
        if (e.shiftKey && e.key == 'Enter') {
            return;
        }
        // save action
        if (e.key === 'Enter') {
            e.preventDefault();
            if (props.mode === 'create') {
                await createEvent();
            } else if (props.mode === 'edit') {
                await updateEvent();
            }
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
            if (props.mode === 'edit' && document.activeElement === document.body) {
                await deleteEvent();
            }
        }
    });
    ref.current = document.body;

    // -----
    // RENDER
    // -----
    return (
        <>
            <div
                className={clsx(
                    'tw-h-auto tw-w-72 tw-p-2 tw-rounded-2xl tw-bg-white tw-space-y-1.5 tw-drop-shadow-xl tw-shadow-gray-600 tw-select-none',
                    'tw-z-50'
                )}
            >
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
                        autoFocus={!title}
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
