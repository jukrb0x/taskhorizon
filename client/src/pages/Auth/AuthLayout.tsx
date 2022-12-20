import { SocialIcons, WelcomeTitle } from '@/components';
import useUserStore from '@/store/user-store';
import autoAnimate from '@formkit/auto-animate';
import { Divider } from '@mantine/core';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const AuthLayout = () => {
    const navigate = useNavigate();
    const { token } = useUserStore();
    // const { user, loggedOut, isLoading } = useUser();

    useEffect(() => {
        if (token) {
            navigate('/calendar');
        }
    }, [token]);

    const ref = useRef(null);

    useEffect(() => {
        ref.current && autoAnimate(ref.current);
    }, [ref]);

    return (
        <>
            <div
                data-tauri-drag-region
                className={
                    'tw-flex tw-items-center tw-justify-center tw-h-screen tw-select-none tw-cursor-default'
                }
            >
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
};
