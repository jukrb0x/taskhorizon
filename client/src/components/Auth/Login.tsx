import { NavLink } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Text, PasswordInput, TextInput, Title, Button as MButton } from '@mantine/core';

const Login = () => {
    // todo: validation

    return (
        <div className={'tw-w-72'}>
            <Title order={2}>Login</Title>
            <div className={'tw-my-5 tw-space-y-2'}>
                <TextInput placeholder="Enter your username..." label="Username" />
                <PasswordInput placeholder="Password" label="Password" />
            </div>
            <div className={'tw-space-x-2'}>
                <NavLink to={'/auth/login'}>
                    <Button size={'xs'}>Login</Button>
                </NavLink>
                <NavLink to={'/auth/signup'}>
                    <MButton variant={'subtle'} color={'gray'} size={'xs'} className={'tw-px-1'}>
                        Sign up a new account
                    </MButton>
                </NavLink>
            </div>
        </div>
    );
};

export { Login };
