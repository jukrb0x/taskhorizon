import TodoItem from '@/components/Tasking/components/TodoItem';
import { TodoState } from '@/store/todo-state';

export default function TodoList({ todos }: { todos: TodoState[] }) {
    return (
        <>
            {todos.map((todo, index) => {
                return <TodoItem todo={todo} key={index} />;
            })}
        </>
    );
}
