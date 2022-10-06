import { Button, Empty, Notification } from "@douyinfe/semi-ui";


export default function RouteError() {
    let opts = {
        title: '404 Not Found',
        content: 'Seems something wrong...',
        duration: 3,
    };
    Notification.error(opts);
    return (
        <div>
            <Empty
                title={ opts.title }
                description={ opts.content }
            >
            </Empty>
        </div>
    )
}