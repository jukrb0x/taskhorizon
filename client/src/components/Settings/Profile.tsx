import { Modal } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const Profile = (props: { opened: boolean; onClose: () => void }) => {
    const navigate = useNavigate();

    return (
        <div>
            <Modal
                opened={props.opened}
                onClose={props.onClose}
                title="This is fullscreen modal!"
                fullScreen
                transition={'pop'}
                exitTransitionDuration={300}
            >
                {/* Modal content */}
                asa
            </Modal>
        </div>
    );
};
