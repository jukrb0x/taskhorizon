import { useState } from 'react';
import { Button as MButton } from '@mantine/core';
import { Button, StylishButton } from '@/components/Button';

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
        <div className={'tw-space-x-2'}>
            ok
            <Button className={'tw-shadow-md'}>ok</Button>
            <StylishButton>ok</StylishButton>
            <StylishButton preset={'red'} shadow={'md'}>
                ok
            </StylishButton>
            <StylishButton preset={'green'} shadow={'xl'}>
                ok
            </StylishButton>
            <EventCard />
        </div>
    );
};
