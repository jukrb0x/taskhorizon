import { TodoInput, TodoList } from '@/components/Tasking/components';
import useTodoStore from '@/store/todo-state';

export default function TodoApp() {
    const { todoList } = useTodoStore();
    return (
        <>
            <TodoInput />
            <TodoList todos={todoList} />
        </>
    );
}
