import { todoList } from './todos';
import TodoItem from '@/components/Tasking/TodoItem';

export default function TodoList() {
    const todos = todoList;
    return (
        <>
            {todos.map((todo, index) => {
                return <TodoItem todo={todo} key={index} />;
            })}
        </>
    );
}
