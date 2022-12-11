import { Modal } from '@mantine/core';
import { useState } from 'react';
import { Button } from '@/components';
import { http } from '@/apis/http';
import { logout } from '@/apis';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks';
import { mutate } from 'swr';

export const Profile = () => {
    const navigate = useNavigate();
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
                    logout();
                }}
            >
                Oodal
            </Button>
            <Button onClick={() => setOpened(true)}>Profile</Button>;
        </div>
    );
};
