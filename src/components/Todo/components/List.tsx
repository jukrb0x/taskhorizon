import Item from '@/components/Todo/components/Item';
import { Todo } from '@/store/todo-store';

export default function List({ todos }: { todos: Todo[] }) {
    return (
        <>
            {todos.map((todo, index) => (
                <Item todo={todo} key={index} />
            ))}
        </>
    );
}
