import { TodoItem } from '@/components';
import { Todo } from '@/store/todo-store';
import { DndContext } from '@dnd-kit/core';

export const TodoList = ({ todos }: { todos: Todo[] }) => (
    <>
        <DndContext>
            {todos.map((todo, index) => (
                <TodoItem todo={todo} key={index} />
            ))}
        </DndContext>
    </>
);
