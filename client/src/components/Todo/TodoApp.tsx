import useTodoStore from '@/store/todo-store';
import { DndContext, MouseSensor, useDraggable, useSensor, useSensors } from '@dnd-kit/core';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button } from '@/components/Button';
import { TodoInput } from '@/components/Todo/TodoInput';
import { TodoList } from '@/components/Todo/TodoList';

export const TodoApp = () => {
    const { todoList } = useTodoStore();
    const [ref] = useAutoAnimate<HTMLDivElement>();

    return (
        <div ref={ref}>
            <TodoInput />
            <TodoList todos={todoList} />
        </div>
    );
};
