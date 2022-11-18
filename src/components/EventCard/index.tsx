import { useMemo, useState } from 'react';
import { IconDelete } from '@douyinfe/semi-icons';
import { Checkbox, Button as MButton, TextInput, Textarea } from '@mantine/core';
import { Button } from '@/components/Button';
import * as dateFns from 'date-fns';
import { DatetimePicker } from './DatetimePicker';
import { CalendarEvent, EventIdGenerator } from '@/store/event-store';
import { useEventStore } from '@/store';
import { useFloating } from '@floating-ui/react-dom';

interface EventCardProps {
    defaultEvent?: CalendarEvent;
}

const EventCard = (props: EventCardProps) => {
    const defaultEvent = props.defaultEvent;

    // states
    const [title, setTitle] = useState<string>(defaultEvent?.title || '');
    const [startTime, setStartTime] = useState<Date>(defaultEvent?.start || new Date());
    const [startDate, setStartDate] = useState<Date>(defaultEvent?.start || new Date());
    const [endTime, setEndTime] = useState<Date>(defaultEvent?.end || new Date());
    const [endDate, setEndDate] = useState<Date>(defaultEvent?.end || new Date());
    const [description, setDescription] = useState<string>(defaultEvent?.desc || '');
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

    // methods
    const handleStartChange = (date: Date | null, time: Date | any) => {
        if (!date) date = new Date();
        setStartTime(time);
        setStartDate(date);
    };

    const handleEndChange = (date: Date | null, time: Date | any) => {
        if (!date) date = new Date();
        setEndTime(time);
        setEndDate(date);
    };

    const canCreateEvent = title.trim() != '' && startDate != null && endDate != null;
    const { addEvent } = useEventStore();
    const createEvent = () => {
        if (!canCreateEvent) return;
        const event: CalendarEvent = {
            id: EventIdGenerator(),
            title: title.trim(),
            desc: description,
            start: start,
            end: end,
            allDay: false,
            linkedTodos: []
        };
        addEvent(event);
    };

    return (
        <>
            <div className="tw-h-auto tw-w-72 tw-p-2 tw-rounded-2xl tw-bg-white tw-drop-shadow-lg">
                <div className={'tw-flex tw-row-auto tw-items-center tw-py-1.5'}>
                    <Checkbox
                        size={'sm'}
                        className={'tw-flex tw-justify-center'}
                        // todo: fix later
                        data-autofocus={false}
                        autoFocus={false}
                        // this is not ok, we need only the first paint (auto focus on first element)
                        // onFocus={(e) => {
                        //     e.target.blur();
                        // }}
                    />
                    <TextInput
                        autoFocus={false} // todo: only for new event
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
                            onChange={(date, time) => handleStartChange(date, time)}
                        />

                        <DatetimePicker
                            label={'End'}
                            time={endTime}
                            date={endDate}
                            onChange={(date, time) => handleEndChange(date, time)}
                        />
                    </div>

                    <Textarea
                        variant={'filled'}
                        placeholder={'Description'}
                        radius={'md'}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div
                        className={'tw-flex tw-justify-end'}
                        // style={{ display: defaultEvent ? 'none' : '' }}
                    >
                        {/* todo:
                                update event
                                delete event
                         */}
                        <MButton.Group>
                            <Button
                                disabled={!canCreateEvent}
                                onClick={createEvent}
                                variant={'filled'}
                                color={'green'}
                            >
                                Create
                            </Button>
                            {/*
                                todo: should be a dropdown with delete option
                            */}
                            <Button
                                disabled
                                color={'red'}
                                variant={'outline'}
                                className={'tw-px-1.5'}
                            >
                                <IconDelete />
                            </Button>
                        </MButton.Group>
                    </div>
                </div>
            </div>
        </>
    );
};

export { EventCard };
