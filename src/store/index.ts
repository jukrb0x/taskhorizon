import useTodoStore from '@/store/todo';

const isDev = import.meta.env.MODE === 'development';

export const store_env = {
    isDev
};

export { useTodoStore };
