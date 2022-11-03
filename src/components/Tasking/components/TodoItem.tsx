import { Checkbox } from '@douyinfe/semi-ui';

import { Todo } from '@/store/todo';
import useTodoStore from '@/store/todo';

export default function TodoItem({ todo }: { todo: Todo }) {
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
