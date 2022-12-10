import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@/components/Button';
import { SocialIcons, WelcomeTitle } from '@/components/Heros';
import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef } from 'react';
import { Divider } from '@mantine/core';

export default function AuthLayout() {
    const ref = useRef(null);

    useEffect(() => {
        ref.current &&
            autoAnimate(ref.current, {
                easing: 'linear'
            });
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
                    <div ref={ref}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
