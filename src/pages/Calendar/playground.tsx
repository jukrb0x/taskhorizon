import { useState } from 'react';
import { Button as MButton } from '@mantine/core';
import { Button } from '@/components/Button';

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
            {/*
            <MButton
                variant={'default'}
                // className={'tw-drop-shadow-md'}
                color={'gray.4'}
                styles={(theme) => ({
                    root: {
                        '&:hover': {
                            backgroundColor: theme.colors.gray[4]
                        }
                    }
                })}
            >
                Show
            </MButton>
*/}
            <Button variant={'filled'} color={'green'} onClick={() => setIsShowing(!isShowing)}>
                ok
            </Button>
            <Button variant={'default'}>ok</Button>
            <EventCard />
        </div>
    );
};
