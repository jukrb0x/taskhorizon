import { DndContext } from '@dnd-kit/core';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { TodoItem } from '@/components';
import { Todo } from '@/store/todo-store';

export const TodoList = ({ todos }: { todos: Todo[] }) => {
    const [ref] = useAutoAnimate<HTMLDivElement>({ duration: 250 });

    return (
        <div ref={ref}>
            <DndContext>
                {todos.map((todo, index) => (
                    <TodoItem todo={todo} key={index} />
                ))}
            </DndContext>
        </div>
    );
};
