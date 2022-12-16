import { Badge, Title } from '@mantine/core';

const WelcomeTitle = () => {
    return (
        <div>
            <Title
                order={3}
                className={
                    'tw-relative tw-top-2 tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-[#bdc3c7] tw-to-[#2c3e50]'
                }
            >
                Todo evolved
            </Title>
            <Title order={1}>
                Welcome to&nbsp;
                <span
                    className={
                        'tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500'
                    }
                >
                    TaskHorizon
                </span>
                <span className={'tw-relative -tw-top-5'}>
                    <Badge variant="gradient" gradient={{ from: 'orange', to: 'red' }} size={'xs'}>
                        Preview
                    </Badge>
                </span>
            </Title>
            <Title order={5} weight={500}>
                Schedule your tasks and events in one place
            </Title>
        </div>
    );
};
export { WelcomeTitle };
