import { TodoInput, TodoList } from '@/components/Todo/components';
import useTodoStore from '@/store/todo-store';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function TodoApp() {
    const { todoList } = useTodoStore();
    const [ref] = useAutoAnimate<HTMLDivElement>();
    return (
        <div ref={ref}>
            <TodoInput />
            <TodoList todos={todoList} />
        </div>
    );
}
