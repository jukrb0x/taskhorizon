import { NavLink } from 'react-router-dom';
import { Button } from '@/components/Button';

const Register = () => {
    return (
        <>
            <h1>Register</h1>
            <div className={'tw-my-5 tw-space-x-2'}>
                <NavLink to={'/auth/login'}>
                    <Button>Login</Button>
                </NavLink>
                <NavLink to={'/auth/register'}>
                    <Button variant={'filled'} color={'red.5'}>
                        Try for Free
                    </Button>
                </NavLink>
            </div>
        </>
    );
};

export { Register };
