import TodoItem from '@/components/Tasking/components/TodoItem';
import { Todo } from '@/store/todo';

export default function TodoList({ todos }: { todos: Todo[] }) {
    return (
        <>
            {todos.map((todo, index) => (
                <TodoItem todo={todo} key={index} />
            ))}
        </>
    );
}
