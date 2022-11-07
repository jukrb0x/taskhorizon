import { Checkbox } from '@douyinfe/semi-ui';

import { TodoStore } from '@/store/todo-store';
import { useTodoStore } from '@/store';

export default function TodoItem({ todo }: { todo: TodoStore }) {
    const { toggleTodo } = useTodoStore();

    const handleToggle = () => {
        toggleTodo && toggleTodo(todo.id);
    };

    return (
        <>
            <Checkbox
                checked={todo.completed}
                onChange={() => {
                    handleToggle();
                }}
            >
                {todo.title}
            </Checkbox>
        </>
    );
}
