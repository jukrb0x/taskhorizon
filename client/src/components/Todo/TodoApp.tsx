import { TodoInput } from '@/components';
import { TodoList } from '@/components';
import { ScrollArea } from '@mantine/core';
import { useTodo } from '@/hooks';

export const TodoApp = (props: { TodoInputClassName?: string; TodoListClassName?: string }) => {
    const { todoList } = useTodo();

    return (
        <>
            <TodoInput className={props.TodoInputClassName} />
            <ScrollArea type={'never'} className={props.TodoListClassName}>
                <TodoList todos={todoList} />
            </ScrollArea>
        </>
    );
};
