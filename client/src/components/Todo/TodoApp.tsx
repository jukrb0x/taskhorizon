import { TodoInput } from '@/components';
import { TodoList } from '@/components';
import { Divider, ScrollArea, Title } from '@mantine/core';
import { useTodo } from '@/hooks';
import clsx from 'clsx';

export const TodoApp = (props: { TodoInputClassName?: string; TodoListClassName?: string }) => {
    const { todoList } = useTodo();

    return (
        <>
            <div
                className={clsx(
                    'tw-h-7 tw-mx-3.5 tw-h-[60px]',
                    'tw-flex tw-items-center tw-pl-2 tw-flex-shrink-0',
                    'tw-cursor-default'
                )}
                data-tauri-drag-region
            >
                <Title order={4}>Todos</Title>
            </div>
            <TodoInput className={props.TodoInputClassName} />
            <ScrollArea type={'never'} className={props.TodoListClassName} data-tauri-drag-region>
                <TodoList todos={todoList} />
            </ScrollArea>
        </>
    );
};
