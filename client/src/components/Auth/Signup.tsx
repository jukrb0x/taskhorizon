import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components';
import { Text, PasswordInput, TextInput, Title, Button as MButton, Tooltip } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { REG_EMAIL } from '@/utils/common-regex';
import { signup } from '@/apis';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

interface SignupFormValues {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const Signup = () => {
    const navigate = useNavigate();
    const form = useForm<SignupFormValues>({
        initialValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirm: ''
        },
        validateInputOnBlur: true,
        validate: (values) => {
            const errors: Partial<SignupFormValues> = {};

            if (!values.username) {
                errors.username = 'Username is required';
            } else if (values.username.includes(' ')) {
                errors.username = 'Username cannot contain spaces';
            } else if (values.username.length < 3) {
                errors.username = 'Username must be at least 3 characters long';
            } else if (values.username.length > 15) {
                errors.username = 'Username must be at most 15 characters long';
            }

            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!REG_EMAIL.test(values.email)) {
                errors.email = 'Email is invalid';
            }

            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.includes(' ')) {
                errors.password = 'Password cannot contain spaces';
            }

            if (!values.passwordConfirm) {
                errors.passwordConfirm = 'Password confirmation is required';
            }

            if (values.password !== values.passwordConfirm) {
                errors.passwordConfirm = 'Passwords do not match';
            }

            return errors;
        }
    });

    const handleSignup = useCallback(async () => {
        const res = await signup(form.values.username, form.values.email, form.values.password);
        if (res) {
            showNotification({
                title: 'Signup successful',
                message: 'You will be redirected to login page now...',
                color: 'teal',
                icon: <IconCheck size={18} />
            });
            setTimeout(() => {
                navigate('/auth/login');
            }, 500);
        }
    }, [form.values, signup]);

    return (
        <div className={'tw-w-72'}>
            <Title order={2}>Sign up</Title>
            <form onSubmit={form.onSubmit(handleSignup)}>
                <div className={'tw-my-5 tw-space-y-2'}>
                    <TextInput
                        placeholder="Enter your username..."
                        label="Username"
                        {...form.getInputProps('username')}
                    />
                    <TextInput
                        placeholder="you@email.com"
                        label="Email"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        placeholder="Password"
                        label="Password"
                        {...form.getInputProps('password')}
                    />
                    <PasswordInput
                        placeholder="Confirm your password"
                        label="Confirm"
                        {...form.getInputProps('passwordConfirm')}
                    />
                </div>
                <div className={'tw-space-x-2'}>
                    <Button color={'red.5'} variant={'filled'} size={'xs'} type={'submit'}>
                        Continue
                    </Button>
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
            </form>
        </div>
    );
};

export { Signup };
