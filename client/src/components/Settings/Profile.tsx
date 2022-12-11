import { Modal } from '@mantine/core';
import { useState } from 'react';
import { Button } from '@/components';
import http from '@/apis/http';

export const Profile = () => {
    const [opened, setOpened] = useState(false);

    return (
        <div>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="This is fullscreen modal!"
                fullScreen
                transition={'pop'}
                exitTransitionDuration={300}
            >
                {/* Modal content */}
                asa
            </Modal>
            <Button
                onClick={() => {
                    http.get('/hello-world/todo');
                }}
            >
                Oodal
            </Button>
            <Button onClick={() => setOpened(true)}>Profile</Button>
        </div>
    );
};
