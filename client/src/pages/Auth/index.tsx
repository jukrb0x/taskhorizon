import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@/components';
import { SocialIcons, WelcomeTitle } from '@/components';
import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef, useState } from 'react';
import { Divider, Transition } from '@mantine/core';
import { OpeningTransition } from '@/components';
import clsx from 'clsx';

export default function AuthLayout() {
    const ref = useRef(null);

    useEffect(() => {
        ref.current && autoAnimate(ref.current);
    }, [ref]);

    return (
        <>
            <div className={'tw-flex tw-items-center tw-justify-center tw-h-screen'}>
                <div className={'tw-flex tw-flex-row'}>
                    <div className={'tw-flex tw-items-center tw-justify-center'}>
                        <div>
                            <WelcomeTitle />
                            <div className={'tw-h-3'}></div>
                            <SocialIcons size={24} showTooltip space={5} />
                        </div>
                    </div>
                    <Divider orientation="vertical" className={'tw-mx-10'} />
                    <div
                        ref={ref}
                        className={clsx(
                            'tw-flex-grow tw-h-80 tw-justify-center tw-items-center tw-flex',
                            'tw-w-72' // Safari Webview workaround
                        )}
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
