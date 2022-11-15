import TodoItem from '@/components/Tasking/components/TodoItem';
import { TodoStore } from '@/store/todo-store';
import { useState } from 'react';

export default function TodoList({ todos }: { todos: TodoStore[] }) {
    return (
        <>
            {todos.map((todo, index) => (
                <TodoItem todo={todo} key={index} />
            ))}
        </>
    );
}
