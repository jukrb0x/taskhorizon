import { useState } from 'react';
import { Checkbox } from '@mantine/core';
import { Button } from '@/components/Button';

const EventCard = () => {
    return (
        <>
            <div className="tw-h-80 tw-w-96 tw-rounded-2xl tw-bg-white tw-drop-shadow-md">
                <Checkbox />
                <div className="tw-h-1/3 tw-w-full tw-rounded-t-2xl tw-bg-gray-100"></div>
            </div>
        </>
    );
};

export const Playground = () => {
    const [isShowing, setIsShowing] = useState(false);
    return (
        <div className={'tw-space-x-2 tw-space-y-2'}>
            <Button variant={'default'} onClick={() => setIsShowing(!isShowing)}>
                Show
            </Button>
            <Button variant={'filled'}>OK</Button>
            <Button variant={'filled'} color={'red'} shadow={'md'}>
                Red
            </Button>
            <Button variant={'filled'} color={'green'} className={'tw-p-2'}>
                Green
            </Button>

            <EventCard />
        </div>
    );
};
