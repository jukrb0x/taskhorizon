import { Checkbox } from '@douyinfe/semi-ui';

import { TodoState } from '@/store/todo-state';
import { useTodoStore } from '@/store';

export default function TodoItem({ todo }: { todo: TodoState }) {
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
