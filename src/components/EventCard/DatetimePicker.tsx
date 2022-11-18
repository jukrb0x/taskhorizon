import { DatePicker, TimeInput } from '@mantine/dates';
import { TimePicker } from '@douyinfe/semi-ui';
import { TextInput } from '@mantine/core';
import * as dateFns from 'date-fns';
import { ChangeEvent } from 'react';

interface DatetimePickerProps {
    label: string;
    date: Date | null;
    time: Date | any;
    onChange: (date: Date | null, time: string | Date | string[] | Date[]) => void;
}

// todo: merge date and time into one prop
const DatetimePicker = (props: DatetimePickerProps) => {
    const handleTimeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const time = e.target.value;
        const [hours, minutes] = time.split(':').map((t) => parseInt(t));
        // test if time is valid
        // fixme: buggy but prevent crash, improve it later
        const isValid = hours && minutes && hours < 24 && minutes < 60;
        if (isValid) {
            const newTime = new Date();
            newTime.setHours(hours);
            newTime.setMinutes(minutes);
            props.onChange(props.date, newTime);
        }
    };
    return (
        <div className={'tw-flex-col tw-rounded-[8px] tw-bg-gray-100 tw-p-1.5'}>
            <div className={'tw-font-bold tw-text-gray-400 tw-px-0.5 tw-text-sm'}>
                {props.label}
            </div>
            <TimePicker
                // style={{ display: 'block' }}
                // onOpenChange={(open) => { console.log("op", open); }}
                showClear={false}
                minuteStep={15}
                value={props.time}
                onChange={(time) => props.onChange(props.date, time)}
                format={'HH:mm'}
                triggerRender={() => (
                    <TextInput
                        onChange={(e) => {
                            handleTimeInputChange(e);
                        }}
                        value={dateFns.format(props.time, 'HH:mm')}
                        variant={'filled'}
                        styles={(theme) => ({
                            root: {
                                // height: 0,
                                input: {
                                    fontSize: theme.fontSizes.md,
                                    fontWeight: 700
                                }
                            },
                            controls: {
                                height: '100%'
                            },
                            input: {
                                height: '100%',
                                minHeight: '100%',
                                lineHeight: '100%',
                                padding: '0 0.5px',
                                // border: 'none',
                                '&:focus': {
                                    // borderColor: theme.colors.gray[5]
                                }
                            }
                        })}
                    />
                )}
            />
            <DatePicker
                value={props.date}
                onChange={(date) => props.onChange(date, props.time)}
                placeholder={'start date'}
                inputFormat={'MMM DD YYYY'}
                clearable={false}
                variant={'filled'}
                size={'xs'}
                styles={(theme) => ({
                    root: {
                        input: {
                            fontSize: theme.fontSizes.sm,
                            fontWeight: 700,
                            color: theme.colors.gray[6]
                        }
                    },
                    controls: {
                        height: '100%'
                    },
                    input: {
                        height: '100%',
                        minHeight: '100%',
                        lineHeight: '100%',
                        padding: '0 2px'
                    }
                })}
            />
        </div>
    );
};

export { DatetimePicker };
