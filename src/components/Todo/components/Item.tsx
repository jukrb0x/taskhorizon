import { Text, Checkbox, Textarea, ActionIcon, Menu } from '@mantine/core';
import { Todo } from '@/store/todo-store';
import { useTodoStore } from '@/store';
import { useDrag } from 'react-dnd';
import { useCallback, useState, MouseEvent } from 'react';
import clsx from 'clsx';
import { IconTrash, IconX } from '@tabler/icons';

export default function Item({ todo }: { todo: Todo }) {
    const { setTodo, toggleTodo, removeTodo } = useTodoStore();
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(todo.title || '');

    const handleToggle = useCallback(() => {
        toggleTodo(todo.id);
    }, [todo, toggleTodo]);

    const handleRemove = useCallback(() => {
        removeTodo(todo.id);
    }, [todo, removeTodo]);

    const handleEdit = useCallback(
        (e: MouseEvent) => {
            e.detail == 2 && setIsEdit(true);
        },
        [setIsEdit]
    );

    const handleSave = useCallback(() => {
        if (title.trim() == '') return;
        setIsEdit(false);
        setTitle(title.trim());
        const newTodo: Todo = {
            ...todo,
            title: title.trim()
        };
        setTodo(todo.id, newTodo);
    }, [setIsEdit, setTodo, todo, title]);

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
            className={clsx('tw-p-1 tw-rounded-md', {
                'tw-bg-gray-200': isEdit || isActive,
                'hover:tw-bg-gray-100': !isEdit || !isActive
            })}
            onDragStart={() => console.log('todo testing...')} // todo
        >
            <div
                className={'tw-flex tw-items-start tw-items-center'}
                onBlur={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <Checkbox
                    className={'tw-mr-1.5'}
                    checked={todo.completed}
                    onChange={handleToggle}
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
                {!isEdit ? (
                    <Text
                        component={'span'}
                        sx={(theme) => ({
                            fontSize: theme.fontSizes.sm,
                            color: theme.colors.gray[7],
                            overflow: 'ellipsis'
                        })}
                        className={'tw-w-full'}
                        onClick={handleEdit}
                        lineClamp={1}
                    >
                        {todo.title}
                    </Text>
                ) : (
                    <Textarea
                        autoFocus={true}
                        onFocus={(e) => {
                            // move cursor to the end
                            e.target.value = '';
                            e.target.value = title;
                        }}
                        autosize
                        className={'tw-flex-grow'}
                        styles={(theme) => ({
                            input: {
                                color: theme.colors.gray[7],
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSave();
                            }
                        }}
                    />
                )}
                <Menu transition={'scale-y'}>
                    <Menu.Target>
                        <ActionIcon
                            radius={'xl'}
                            size={'xs'}
                            style={{ display: !isEdit ? '' : '' }} // fixme: confirm before delete, show only when edit
                        >
                            <IconX size={15} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item
                            color="red"
                            icon={<IconTrash size={14} />}
                            onClick={handleRemove}
                        >
                            Delete
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </div>
    );
}
