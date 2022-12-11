import { NavLink } from 'react-router-dom';
import { Button } from '@/components';
import { Text, PasswordInput, TextInput, Title, Button as MButton } from '@mantine/core';
import { login } from '@/apis';
import { useCallback, useState } from 'react';
import { useForm } from '@mantine/form';

interface LoginFormValues {
    username: string;
    password: string;
}

const Login = () => {
    const form = useForm<LoginFormValues>({
        initialValues: {
            username: '',
            password: ''
        }
    });

    const handleLogin = useCallback(async () => {
        await login(form.values.username, form.values.password);
    }, [login, form.values]);

    return (
        <div className={'tw-w-72'}>
            <Title order={2}>Login</Title>
            <form onSubmit={form.onSubmit(handleLogin)}>
                <div className={'tw-my-5 tw-space-y-2'}>
                    <TextInput
                        placeholder="Enter your username..."
                        label="Username"
                        {...form.getInputProps('username')}
                    />
                    <PasswordInput
                        placeholder="Password"
                        label="Password"
                        {...form.getInputProps('password')}
                    />
                </div>
                <div className={'tw-space-x-2'}>
                    <Button size={'xs'} type={'submit'}>
                        Login
                    </Button>
                    <NavLink to={'/auth/signup'}>
                        <MButton
                            variant={'subtle'}
                            color={'gray'}
                            size={'xs'}
                            className={'tw-px-1'}
                        >
                            Sign up a new account
                        </MButton>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export { Login };
