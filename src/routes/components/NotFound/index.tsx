import { Button, Empty, Notification } from '@douyinfe/semi-ui';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import DebugPanel from '@/routes/components/DebugPanel';

const Center = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
    text-align: center;
    height: 100vh;
`;
export default function NotFound() {
    const location = useLocation();
    const opts = {
        title: '404 Not Found',
        content: 'Seems something wrong...',
        duration: 3
    };
    // Notification.error(opts);
    // fixme: pops up twice

    useEffect(() => {
        Notification.error(opts);
    }, []);

    const cleanAndReload = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div>
            <Center>
                <Empty title={opts.title} description={opts.content}>
                    {location.pathname} is not found.
                    <div className={'tw-my-4 tw-space-x-3'}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button>Go Home</Button>
                        </Link>
                        <Button onClick={() => cleanAndReload()} type={'danger'}>
                            Clean Storage
                        </Button>
                    </div>
                </Empty>
            </Center>
        </div>
    );
}
