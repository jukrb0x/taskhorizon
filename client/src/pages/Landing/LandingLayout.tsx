import { Button } from '@/components';
import { SocialIcons, WelcomeTitle } from '@/components';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Divider, LoadingOverlay } from '@mantine/core';
import { CopyrightBar } from '@/components';
import { OpeningTransition } from '@/components';
import { useUser } from '@/hooks';
import { showNotification } from '@mantine/notifications';
import useUserStore from '@/store/user-store';
import { useEffect, useState } from 'react';

export const LandingLayout = () => {
    const navigate = useNavigate();
    const { user, loggedOut } = useUser();

    useEffect(() => {
        if (user && !loggedOut) {
            navigate('/calendar');
        }
    }, [user, loggedOut]);

    return (
        <OpeningTransition transition={'pop'} duration={800}>
            <div className={'tw-flex tw-items-center tw-justify-center tw-h-screen'}>
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