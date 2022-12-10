import { TodoInput, TodoList } from '@/components/Todo/components';
import useTodoStore from '@/store/todo-store';
import { DndContext, MouseSensor, useDraggable, useSensor, useSensors } from '@dnd-kit/core';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button } from '@/components/Button';

export default function TodoApp() {
    const { todoList } = useTodoStore();
    const [ref] = useAutoAnimate<HTMLDivElement>();

    return (
        <div ref={ref}>
            <TodoInput />
            <TodoList todos={todoList} />
        </div>
    );
}
