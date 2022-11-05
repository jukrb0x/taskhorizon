// fixme: this is shit
import { Dispatch, forwardRef, SetStateAction, useImperativeHandle, useRef, useState } from 'react';
import { Button, DatePicker, Input, List, Modal, TextArea } from '@douyinfe/semi-ui';
import Icon, { IconCalendar } from '@douyinfe/semi-icons/lib/es/icons';
import { CalendarEvent, EventIdGenerator } from '@/store/event';
import { useEventStore } from '@/store';

// eslint-disable-next-line react/display-name
const EventCreator = forwardRef((props: { onInputChange: (canCreate: boolean) => void }, ref) => {
    const [canCreate, setCanCreate] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [start, setStart] = useState<Date | any>();
    const [end, setEnd] = useState<Date | any>();
    const { addEvent } = useEventStore();

    // fixme
    const check = (nextState: any, setter: (val: any) => void) => {
        // change state first
        setter(nextState);
        // validate state
        if (title.trim() == '' || !start || !end) {
            console.log('when false', title, start, end);
            setCanCreate(false);
        } else {
            setCanCreate(true);
        }
        props.onInputChange(canCreate);
        console.log('val: ', nextState, ' can: ', canCreate);
    };

    useImperativeHandle(ref, () => ({
        createEvent: () => {
            if (!canCreate) return;
            const event: CalendarEvent = {
                description: '',
                endAt: end,
                id: EventIdGenerator(),
                isAllDay: false,
                startAt: start,
                title: title.trim()
            };
            addEvent(event);
        }
    }));

    return (
        <div className={'tw-space-y-4'}>
            <Input
                value={title}
                showClear={true}
                placeholder={'Event Title'}
                prefix={<IconCalendar />}
                onChange={(val) => check(val.trim(), setTitle)}
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
                    type={'dateTime'}
                    onChange={(val) => check(val, setStart)}
                />
                <DatePicker
                    value={end}
                    placeholder={'Ends'}
                    showClear
                    type={'dateTime'}
                    onChange={(val) => check(val, setEnd)}
                />
            </div>
        </div>
    );
});

const ModalWrapper = () => {
    const [visible, setVisible] = useState(false);
    const [canCreate, setCanCreate] = useState(false);
    const eventCreatorRef = useRef<any>(null);
    const closeModal = () => {
        setVisible(false);
    };
    const showModal = () => {
        setVisible(true);
    };

    const handleCreate = () => {
        eventCreatorRef && eventCreatorRef.current?.createEvent();
    };

    return (
        <>
            <Button onClick={showModal}>Add Event</Button>
            <Modal
                header={<h3>Add New Event</h3>}
                visible={visible}
                onOk={() => closeModal()}
                onCancel={() => closeModal()}
                footer={
                    <Button disabled={!canCreate} onClick={() => handleCreate()}>
                        Create
                    </Button>
                }
            >
                <EventCreator ref={eventCreatorRef} onInputChange={setCanCreate} />

                {canCreate ? 'ok' : 'no'}
            </Modal>
        </>
    );
};

export default ModalWrapper;
