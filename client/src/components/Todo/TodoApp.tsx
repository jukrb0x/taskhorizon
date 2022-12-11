import useTodoStore from '@/store/todo-store';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { TodoInput } from '@/components';
import { TodoList } from '@/components';
import { ScrollArea } from '@mantine/core';

export const TodoApp = (props: { TodoInputClassName?: string; TodoListClassName?: string }) => {
    const { todoList } = useTodoStore();
    const [ref] = useAutoAnimate<HTMLDivElement>();

    return (
        <>
            <TodoInput className={props.TodoInputClassName} />
            <ScrollArea type={'never'}>
                <div ref={ref} className={props.TodoListClassName}>
                    <TodoList todos={todoList} />
                </div>
            </ScrollArea>
        </>
    );
};
