import { useState } from 'react';
import { Button } from '@mantine/core';

const EventCard = () => {
    return (
        <>
            <div className="tw-h-80 tw-w-96 tw-rounded-md tw-bg-white tw-shadow-lg" />
        </>
    );
};

export const Playground = () => {
    const [isShowing, setIsShowing] = useState(false);
    return (
        <div className={''}>
            ok
            <Button variant={'light'}>Show</Button>
            <EventCard />
        </div>
    );
};
