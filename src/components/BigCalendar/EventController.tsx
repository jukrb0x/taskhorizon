// fixme: this is shit
import {
    createRef,
    Dispatch,
    forwardRef,
    LegacyRef,
    SetStateAction,
    useImperativeHandle,
    useRef,
    useState
} from 'react';
import { Button, Checkbox, DatePicker, Input, List, Modal, TextArea } from '@douyinfe/semi-ui';
import Icon, { IconCalendar } from '@douyinfe/semi-icons/lib/es/icons';
import { CalendarEvent, EventIdGenerator } from '@/store/event-store';
import { useEventStore } from '@/store';

const EventCreator = (props: { onEventCreated: () => void }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [start, setStart] = useState<Date | any>();
    const [end, setEnd] = useState<Date | any>();
    const [allDay, setAllDay] = useState<boolean | undefined>(false);
    const { addEvent } = useEventStore();

    const canCreateEvent = title.trim() != '' && start != null && end != null;

    const handleCreate = () => {
        createEvent();
        props.onEventCreated();
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
            linkedTodos: ['test']
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
                    onChange={(e) => setAllDay(e.target.checked)}
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

const ModalWrapper = () => {
    const [visible, setVisible] = useState(false);

    const closeModal = () => {
        setVisible(false);
    };
    const showModal = () => {
        setVisible(true);
    };

    return (
        <>
            <Button onClick={showModal}>Add Event</Button>
            <Modal
                header={<h3>Create New Event</h3>}
                visible={visible}
                onOk={() => closeModal()}
                onCancel={() => closeModal()}
                footer={null} // todo: how to get the value from child directly?
            >
                <EventCreator onEventCreated={() => closeModal()} />
            </Modal>
        </>
    );
};

export default ModalWrapper;
