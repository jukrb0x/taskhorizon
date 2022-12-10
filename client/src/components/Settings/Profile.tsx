import { Modal } from '@mantine/core';
import { useState } from 'react';
import { Button } from '@/components/Button';

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
            <Button onClick={() => setOpened(true)}>Profile</Button>
        </div>
    );
};
