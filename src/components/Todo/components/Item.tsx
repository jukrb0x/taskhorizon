import { Checkbox } from '@mantine/core';

import { Todo } from '@/store/todo-store';
import { useTodoStore } from '@/store';

import { useDrag } from 'react-dnd';

export default function Item({ todo }: { todo: Todo }) {
    const { toggleTodo } = useTodoStore();

    const handleToggle = () => {
        toggleTodo && toggleTodo(todo.id);
    };

    // todo: test dnd
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
        <div
            ref={dragRef}
            className={'tw-flex tw-items-center hover:tw-bg-gray-200 tw-mb-1 tw-p-1 tw-rounded-md'}
        >
            <Checkbox
                checked={todo.completed}
                onChange={() => {
                    handleToggle();
                }}
                size={'xs'}
                label={todo.title}
                styles={(theme) => ({
                    root: {
                        display: 'flex',
                        input: {
                            borderRadius: theme.radius.sm
                        }
                    },
                    label: {
                        fontSize: theme.fontSizes.sm,
                        color: theme.colors.gray[7]
                    }
                })}
            />
            <div>{/*ac*/}</div>
        </div>
    );
}
