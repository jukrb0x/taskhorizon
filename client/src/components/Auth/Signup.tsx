import { NavLink } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Text, PasswordInput, TextInput, Title, Button as MButton, Tooltip } from '@mantine/core';

const Signup = () => {
    // todo: validation

    return (
        <div className={'tw-w-72'}>
            <Title order={2}>Sign up</Title>
            <div className={'tw-my-5 tw-space-y-2'}>
                <TextInput placeholder="Enter your username..." label="Username" />
                <TextInput placeholder="you@email.com" label="Email" />
                <PasswordInput placeholder="Password" label="Password" />
            </div>
            <div className={'tw-space-x-2'}>
                <NavLink to={'/auth/login'}>
                    <Button color={'red.5'} variant={'filled'} size={'xs'}>
                        Continue
                    </Button>
                </NavLink>
                <NavLink to={'/auth/login'}>
                    <Tooltip label={'Go to login'} position={'bottom'} withArrow>
                        <MButton
                            variant={'subtle'}
                            color={'gray'}
                            size={'xs'}
                            className={'tw-px-1'}
                        >
                            Already have account?
                        </MButton>
                    </Tooltip>
                </NavLink>
            </div>
        </div>
    );
};

export { Signup };
