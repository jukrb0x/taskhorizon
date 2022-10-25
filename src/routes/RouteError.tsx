import { Button, Empty, Notification } from '@douyinfe/semi-ui';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import DebugPanel from '@/routes/components/DebugPanel';

export default function RouteError() {
    const location = useLocation();
    const opts = {
        title: '404 Not Found',
        content: 'Seems something wrong...',
        duration: 3
    };
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
    // Notification.error(opts);
    // fixme: pops up twice

    useEffect(() => {
        console.log('error');
        Notification.error(opts);
    }, []);

    return (
        <div>
            <Center>
                <Empty title={opts.title} description={opts.content}>
                    {location.pathname} is not found.
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button>Go Home</Button>
                    </Link>
                </Empty>
            </Center>
        </div>
    );
}
