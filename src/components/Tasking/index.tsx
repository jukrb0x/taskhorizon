import { TodoInput, TodoList } from '@/components/Tasking/components';
import useTodoStore from '@/store/todo-store';
import { useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

export default function TodoApp() {
    const { todoList } = useTodoStore();
    const appRef = useRef(null);
    useEffect(() => {
        appRef.current && autoAnimate(appRef.current);
    }, [appRef]);
    return (
        <div ref={appRef}>
            <TodoInput />
            <TodoList todos={todoList} />
        </div>
    );
}
