import { Button, Empty, Notification } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';

export default function RouteError() {
    const opts = {
        title: '404 Not Found',
        content: 'Seems something wrong...',
        duration: 3
    };
    Notification.error(opts);
    return (
        <div>
            <Empty title={opts.title} description={opts.content}>
                <Link to="/">
                    {/* Todo: use route */}
                    <Button>Go Home</Button>
                </Link>
            </Empty>
        </div>
    );
}
