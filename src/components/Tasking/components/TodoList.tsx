import TodoItem from '@/components/Tasking/components/TodoItem';
import { TodoStore } from '@/store/todo-store';

export default function TodoList({ todos }: { todos: TodoStore[] }) {
    return (
        <>
            {todos.map((todo, index) => {
                return <TodoItem todo={todo} key={index} />;
            })}
        </>
    );
}
