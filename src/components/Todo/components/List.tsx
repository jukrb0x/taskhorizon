import Item from '@/components/Todo/components/Item';
import { Todo } from '@/store/todo-store';
import { DndContext } from '@dnd-kit/core';

export default function List({ todos }: { todos: Todo[] }) {
    return (
        <>
            <DndContext>
                {todos.map((todo, index) => (
                    <Item todo={todo} key={index} />
                ))}
            </DndContext>
        </>
    );
}
