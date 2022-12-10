import { Button } from '@/components/Button';
import { SocialIcons, WelcomeTitle } from '@/components/Heros';
import { Navigate, NavLink } from 'react-router-dom';
import { Divider } from '@mantine/core';
import { CopyrightBar } from '@/components/Heros/CopyrightBar';

export default function WelcomeLayout() {
    return (
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
    );
}
