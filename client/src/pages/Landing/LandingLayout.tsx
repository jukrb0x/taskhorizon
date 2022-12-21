import { Divider, LoadingOverlay } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

import { Button } from '@/components';
import { SocialIcons, WelcomeTitle } from '@/components';
import { CopyrightBar } from '@/components';
import { OpeningTransition } from '@/components';
import { useUser } from '@/hooks';
import useUserStore from '@/store/user-store';

export const LandingLayout = () => {
    const navigate = useNavigate();
    const { token } = useUserStore();

    useEffect(() => {
        if (token) {
            navigate('/calendar');
        }
    }, [token]);

    return (
        <OpeningTransition transition={'pop'} duration={800}>
            <div
                data-tauri-drag-region
                className={'tw-flex tw-items-center tw-justify-center tw-h-screen'}
            >
                <div className={'tw-flex tw-flex-col'}>
                    <WelcomeTitle />
                    <div className={'tw-my-5 tw-space-x-2'}>
                        <NavLink to={'/auth/login'}>
                            <Button>Login</Button>
                        </NavLink>
                        <NavLink to={'/auth/signup'}>
                            <Button variant={'filled'} color={'red.5'}>
                                Try for Free
                            </Button>
                        </NavLink>
                    </div>
                    <Divider className={'tw-mt-5 tw-mb-2'} />
                    <CopyrightBar />
                </div>
            </div>
        </OpeningTransition>
    );
};
