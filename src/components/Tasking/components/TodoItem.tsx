import { Checkbox } from '@douyinfe/semi-ui';

import { Todo } from '@/store/todo';
import { useTodoStore } from '@/store';

import { useDrag } from 'react-dnd';

export default function TodoItem({ todo }: { todo: Todo }) {
    const { toggleTodo } = useTodoStore();

    const handleToggle = () => {
        toggleTodo && toggleTodo(todo.id);
    };

    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: 'todo',
            item: { todo },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.5 : 1
            })
        }),
        []
    );
    return (
        <div ref={dragRef}>
            <Checkbox
                checked={todo.completed}
                onChange={() => {
                    handleToggle();
                }}
            >
                {todo.title}
            </Checkbox>
        </div>
    );
}
