import { TodoInput, TodoList } from '@/components/Tasking/components';
import useTodoStore from '@/store/todo-store';

export default function TodoApp() {
    const { todoList } = useTodoStore();
    return (
        <>
            <div className={'tw-h-5'} />
            <TodoInput />
            <TodoList todos={todoList} />
        </>
    );
}
