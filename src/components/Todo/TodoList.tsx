import { useState } from 'react';
import { Button } from '@douyinfe/semi-ui';

export default function TodoList() {
    type Todo = {
        id: number;
        text: string;
        done: boolean;
    };

    const [todos, setTodos] = useState<Todo[]>([
        {
            id: 1,
            text: 'todo 1',
            done: false
        }
    ]);

    const addTodo = function (todo: Todo) {
        const newTodos = [...todos, todo];
        setTodos(newTodos);
    };

    return (
        <>
            <Button onClick={() => addTodo}>Add</Button>
        </>
    );
}
