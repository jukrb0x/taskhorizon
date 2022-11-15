import { useState } from 'react';
import { Button, Modal, Typography } from '@douyinfe/semi-ui';
import { CalendarEvent } from '@/store/event-store';
import { EventCreator } from '../EventCard/EventCreator';

const EventCreatorWrapper = (props: { defaultEvent?: CalendarEvent }) => {
    const { Title } = Typography;

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
                header={
                    <Title heading={4} className={'tw-py-4'}>
                        Create New Event
                    </Title>
                }
                visible={visible}
                onOk={() => closeModal()}
                onCancel={() => closeModal()}
                footer={null} // todo: how to get the value from child directly?
            >
                <EventCreator
                    onEventCreated={() => closeModal()}
                    defaultEvent={props?.defaultEvent}
                />
            </Modal>
        </>
    );
};

export default EventCreatorWrapper;
