import { Text, Checkbox, Textarea } from '@mantine/core';

import { Todo } from '@/store/todo-store';
import { useTodoStore } from '@/store';

import { useDrag } from 'react-dnd';
import theme from 'tailwindcss/defaultTheme';

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
            className={'tw-flex tw-items-start hover:tw-bg-gray-200 tw-mb-1 tw-p-1 tw-rounded-md'}
        >
            <Checkbox
                className={'tw-mr-1.5'}
                checked={todo.completed}
                onChange={() => {
                    handleToggle();
                }}
                size={'xs'}
                // label={todo.title}
                styles={(theme) => ({
                    root: {
                        input: {
                            borderRadius: theme.radius.sm
                        }
                    },
                    label: {
                        fontSize: theme.fontSizes.sm
                        // color: theme.colors.gray[7]
                    }
                })}
            />
            <Text
                component={'label'}
                sx={(theme) => ({ fontSize: theme.fontSizes.sm, color: theme.colors.gray[7] })}
            >
                {todo.title}
            </Text>

            <Textarea
                autosize
                sx={(theme) => ({ fontSize: theme.fontSizes.sm, color: theme.colors.gray[7] })}
                styles={(theme) => ({
                    input: {
                        padding: '0!important',
                        fontSize: theme.fontSizes.sm,
                        // color: theme.colors.gray[7],
                        backgroundColor: 'transparent',
                        // border: 'none',
                        '&:focus': {
                            outline: 'none'
                        }
                    }
                })}
                variant={'unstyled'}
                // fs={'xs'}
            >
                {todo.title}
            </Textarea>
        </div>
    );
}
