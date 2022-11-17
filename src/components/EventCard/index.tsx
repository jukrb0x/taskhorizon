import { useEffect, useState } from 'react';
import { Checkbox, Group, TextInput, Textarea, Select } from '@mantine/core';
import { Button } from '@/components/Button';
import { DatePicker, TimeInput } from '@mantine/dates';
import { Input, TimePicker } from '@douyinfe/semi-ui';
import * as dateFns from 'date-fns';
import { DatetimePicker } from './DatetimePicker';
import { CalendarEvent } from '@/store/event-store';

interface EventCardProps {
    defaultEvent?: CalendarEvent;
}

const EventCard = (props: EventCardProps) => {
    const defaultEvent = props.defaultEvent;
    console.log('de', defaultEvent);

    const [title, setTitle] = useState<string>(defaultEvent?.title || '');
    const [startTime, setStartTime] = useState<Date | any>(defaultEvent?.start || new Date());
    const [startDate, setStartDate] = useState<Date | null>(defaultEvent?.start || new Date());
    const [endTime, setEndTime] = useState<Date | any>(defaultEvent?.end || new Date());
    const [endDate, setEndDate] = useState<Date | null>(defaultEvent?.end || new Date());
    const [description, setDescription] = useState<string>(defaultEvent?.desc || '');

    const handleStartChange = (date: Date | null, time: Date | any) => {
        setStartTime(time);
        setStartDate(date);
    };

    const handleEndChange = (date: Date | null, time: Date | any) => {
        setEndTime(time);
        setEndDate(date);
    };

    return (
        <>
            <div className="tw-h-80 tw-w-96 tw-p-2 tw-rounded-2xl tw-bg-white tw-drop-shadow-lg">
                <div className={'tw-flex tw-row-auto tw-items-center tw-py-1.5'}>
                    <Checkbox size={'sm'} className={'tw-flex tw-justify-center'} />
                    <TextInput
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
                </div>
            </div>
        </>
    );
};

export { EventCard };
