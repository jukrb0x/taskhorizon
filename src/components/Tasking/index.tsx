import { TodoInput, TodoList } from '@/components/Tasking/components';
import { todoList } from './todos';

export default function TodoApp() {
    return (
        <>
            <TodoInput />
            <TodoList todos={todoList} />
        </>
    );
}
