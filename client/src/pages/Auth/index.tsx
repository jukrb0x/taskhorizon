import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@/components/Button';
import { WelcomeTitle } from '@/components/Heros/Welcome';
import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef } from 'react';

export default function AuthLayout() {
    const ref = useRef(null);

    useEffect(() => {
        ref.current && autoAnimate(ref.current);
    }, [ref]);

    return (
        <>
            <div className={'tw-flex tw-items-center tw-justify-center tw-h-screen'}>
                <div className={'tw-flex tw-flex-col'}>
                    <WelcomeTitle />
                    <div ref={ref}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
