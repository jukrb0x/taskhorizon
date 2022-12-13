import { useAutoAnimate } from '@formkit/auto-animate/react';
import { TodoInput } from '@/components';
import { TodoList } from '@/components';
import { ScrollArea } from '@mantine/core';
import { useTodo } from '@/hooks';

export const TodoApp = (props: { TodoInputClassName?: string; TodoListClassName?: string }) => {
    const { todoList } = useTodo();
    const [ref] = useAutoAnimate<HTMLDivElement>();

    return (
        <>
            <TodoInput className={props.TodoInputClassName} />
            <ScrollArea type={'never'} className={props.TodoListClassName} ref={ref}>
                <TodoList todos={todoList} />
            </ScrollArea>
        </>
    );
};
