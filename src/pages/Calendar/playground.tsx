import { useState } from 'react';
import { Checkbox, Group, TextInput, Textarea, Select } from '@mantine/core';
import { Button } from '@/components/Button';
import { DatePicker, TimeInput } from '@mantine/dates';
import { Input, TimePicker } from '@douyinfe/semi-ui';
import * as dateFns from 'date-fns';

const EventCard = () => {
    const [title, setTitle] = useState<string>('');
    const [startTime, setStartTime] = useState<Date | any>(new Date());
    const [endTime, setEndTime] = useState<Date | any>(new Date());
    return (
        <>
            <div className="tw-h-80 tw-w-96 tw-p-2 tw-rounded-2xl tw-bg-white tw-drop-shadow-lg">
                <div className={'tw-flex tw-row-auto tw-items-center tw-space-x-1 tw-pb-1'}>
                    <Checkbox size={'sm'} className={'tw-flex tw-justify-center'} />
                    <TextInput
                        variant={'unstyled'}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={'New Event'}
                        size={'xs'}
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
                <div className={'tw-flex tw-row-auto tw-space-x-4'}>
                    <div className={'tw-flex-col tw-rounded-lg tw-bg-gray-100 tw-p-1.5'}>
                        <div className={'tw-font-bold tw-text-gray-300 tw-px-0.5 tw-text-sm'}>
                            Start
                        </div>
                        <TimePicker
                            // style={{ display: 'block' }}
                            // onOpenChange={(open) => { console.log("op", open); }}
                            showClear={false}
                            minuteStep={30}
                            value={startTime}
                            onChange={(time) => setStartTime(time)}
                            format={'HH:mm'}
                            triggerRender={() => (
                                <TimeInput
                                    onChange={(time) => setStartTime(time)}
                                    value={startTime}
                                    variant={'filled'}
                                    // size={'xs'}
                                    styles={(theme) => ({
                                        root: {
                                            input: {
                                                fontSize: theme.fontSizes.md,
                                                fontWeight: 700
                                            }
                                        },
                                        input: {
                                            padding: '0 0.5px',
                                            '&:focus': {
                                                borderColor: theme.colors.gray[5]
                                            }
                                        },
                                        controls: {
                                            // height: 0
                                        }
                                    })}
                                />
                            )}
                        />
                        <DatePicker
                            placeholder={'start date'}
                            inputFormat={'MMM DD YYYY'}
                            clearable={false}
                            variant={'filled'}
                            size={'xs'}
                            styles={(theme) => ({
                                root: {
                                    input: {
                                        fontSize: theme.fontSizes.sm,
                                        fontWeight: 700
                                    }
                                },
                                input: {
                                    padding: '0 2px'
                                    // '&:focus': {
                                    //     borderColor: theme.colors.gray[5]
                                    // }
                                }
                            })}
                        />
                    </div>
                    <div>
                        <DatePicker
                            placeholder={'end date'}
                            inputFormat={'MMM DD YYYY'}
                            clearable={false}
                            variant={'filled'}
                            size={'xs'}
                        />
                        <TimePicker
                            style={{ display: 'block' }}
                            showClear={false}
                            minuteStep={30}
                            value={endTime}
                            onChange={(time) => setEndTime(time)}
                            format={'HH:mm'}
                            triggerRender={() => (
                                <TimeInput onChange={(time) => setEndTime(time)} value={endTime} />
                            )}
                        />
                    </div>
                </div>

                <div>
                    <Textarea variant={'filled'} placeholder={'Description'} radius={'md'} />
                </div>
                {/*<div className=" tw-h-1/3 tw-w-full tw-rounded-t-2xl tw-bg-gray-100">
    </div>
    */}
            </div>
        </>
    );
};

export const Playground = () => {
    const [isShowing, setIsShowing] = useState(false);
    return (
        <div className={'tw-space-x-2 tw-space-y-2'}>
            <Button variant={'default'} onClick={() => setIsShowing(!isShowing)}>
                Show
            </Button>
            <Button variant={'filled'}>OK</Button>
            <Button variant={'filled'} color={'red'} shadow={'md'}>
                Red
            </Button>
            <Button variant={'filled'} color={'green'} className={'tw-p-2'}>
                Green
            </Button>

            <EventCard />
        </div>
    );
};
