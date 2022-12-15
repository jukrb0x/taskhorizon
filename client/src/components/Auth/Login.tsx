import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components';
import { Text, PasswordInput, TextInput, Title, Button as MButton } from '@mantine/core';
import { login } from '@/apis';
import { useCallback, useState } from 'react';
import { useForm } from '@mantine/form';
import useUserStore from '@/store/user-store';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import { mutate } from 'swr';

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
        const { data } = await login(form.values.username, form.values.password);
        if (data) {
            useUserStore.setState({ ...data.user, token: data.token });
            showNotification({
                title: `${data.user.username}, Welcome back!`,
                message: 'Start your productive day!',
                color: 'teal',
                icon: <IconCheck />
            });
            navigate('/calendar');
        }
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
