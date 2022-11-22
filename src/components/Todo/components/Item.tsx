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
        <div ref={dragRef} className={'hover:tw-bg-gray-200 tw-p-1 tw-rounded-md'}>
            <div className={'tw-flex tw-items-start tw-items-center'}>
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
                            display: 'flex',
                            input: {
                                borderRadius: theme.radius.sm
                            }
                        },
                        label: {
                            fontSize: theme.fontSizes.sm
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
                    className={'tw-flex-grow'}
                    sx={(theme) => ({ fontSize: theme.fontSizes.sm, color: theme.colors.gray[7] })}
                    styles={(theme) => ({
                        input: {
                            padding: '0!important',
                            fontSize: theme.fontSizes.sm,
                            minHeight: 'auto',
                            backgroundColor: 'transparent',
                            '&:focus': {
                                outline: 'none'
                            },
                            overflow: 'hidden'
                        }
                    })}
                    variant={'unstyled'}
                    // fs={'xs'}
                >
                    {todo.title}
                </Textarea>
            </div>
        </div>
    );
}
