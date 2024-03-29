import { Button as MButton, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import { useCallback, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

import { AuthAPI } from '@/apis';
import { Button } from '@/components';
import useUserStore from '@/store/user-store';

interface LoginFormValues {
    username: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const form = useForm<LoginFormValues>({
        initialValues: {
            username: '',
            password: ''
        },
        validateInputOnBlur: true,
        validate: (values) => {
            const errors: Partial<LoginFormValues> = {};

            if (!values.username) {
                errors.username = 'Username is required';
            }

            if (!values.password) {
                errors.password = 'Password is required';
            }

            return errors;
        }
    });

    const handleLogin = useCallback(async () => {
        const { data } = await AuthAPI.login(form.values.username, form.values.password);
        if (data) {
            useUserStore.setState({ ...data.user, token: data.token });
            showNotification({
                title: `${data.user.username}, Welcome back!`,
                message: 'Start your productive day!',
                color: 'teal',
                icon: <IconCheck />
            });
            await navigate('/calendar');
        }
    }, [form.values]);

    return (
        <div className={'tw-w-72'}>
            <Title order={2}>Login</Title>
            <form onSubmit={form.onSubmit(handleLogin)}>
                <div className={'tw-my-5 tw-space-y-2'}>
                    <TextInput
                        autoFocus
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
