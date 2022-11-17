import { DatePicker, TimeInput } from '@mantine/dates';
import { TimePicker } from '@douyinfe/semi-ui';

interface DatetimePickerProps {
    label: string;
    date: Date | null;
    time: Date | any;
    onChange: (date: Date | null, time: string | Date | string[] | Date[]) => void;
}

const DatetimePicker = (props: DatetimePickerProps) => {
    return (
        <div className={'tw-flex-col tw-rounded-[8px] tw-bg-gray-100 tw-p-1.5'}>
            <div className={'tw-font-bold tw-text-gray-400 tw-px-0.5 tw-text-sm'}>
                {props.label}
            </div>
            <TimePicker
                // style={{ display: 'block' }}
                // onOpenChange={(open) => { console.log("op", open); }}
                showClear={false}
                minuteStep={30}
                value={props.time}
                onChange={(time) => props.onChange(props.date, time)}
                format={'HH:mm'}
                triggerRender={() => (
                    <TimeInput
                        onChange={(time) => props.onChange(props.date, time)}
                        value={props.time}
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
                                    borderColor: theme.colors.gray[5]
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
