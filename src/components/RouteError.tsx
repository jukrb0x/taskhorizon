import { Button, Empty, Notification } from '@douyinfe/semi-ui';

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
                <a href="/">
                    {/* Todo: use route */}
                    <Button>Go Home</Button>
                </a>
            </Empty>
        </div>
    );
}
