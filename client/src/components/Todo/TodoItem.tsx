import { useTodo } from '@/hooks';
import { useEventStore } from '@/store';
import { Todo } from '@/store/todo-store';
import { useDraggable } from '@dnd-kit/core';
import { ActionIcon, Checkbox, Menu, Text, Textarea, Tooltip } from '@mantine/core';
import { useEventListener, useMergedRef } from '@mantine/hooks';
import { IconTrash, IconX } from '@tabler/icons';
import clsx from 'clsx';
import { format } from 'date-fns';
import { MouseEvent, MutableRefObject, useCallback, useMemo, useState } from 'react';

export const TodoItem = ({ todo }: { todo: Todo }) => {
    const { setTodo, toggleCompleted, removeTodo, setDragItem, clearDragItem, getEventById } =
        useTodo();
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(todo.title || ''); // todo
    const [mouseHover, setMouseHover] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const ref = useMergedRef<HTMLDivElement>(
        useEventListener('mouseenter', () =>
            setMouseHover(true)
        ) as MutableRefObject<HTMLDivElement>,
        useEventListener('mouseleave', () => {
            setMouseHover(false);
            setMenuOpen(false);
        }) as MutableRefObject<HTMLDivElement>
    );

    const handleToggle = useCallback(() => {
        toggleCompleted(todo.id);
    }, [todo, toggleCompleted]);

    const handleRemove = useCallback(async () => {
        await removeTodo(todo.id);
    }, [todo, removeTodo]);

    const handleEdit = useCallback(
        (e: MouseEvent) => {
            e.detail == 2 /* double click*/ && setIsEdit(true);
        },
        [setIsEdit]
    );

    const linkedEventNumber = todo.linkedEvents?.length || 0;
    const formattedLinkedEventsDateTimeList = useMemo(() => {
        return todo.linkedEvents
            ?.filter((id) => getEventById(id)) // filter out the missing events
            ?.map((eventUUID) => {
                const event = getEventById(eventUUID);
                return event?.start as Date;
            })
            .sort((a, b) => a.getTime() - b.getTime())
            .map((DT) => {
                return format(DT, 'eee, dd MMMM') + ' at ' + format(DT, 'HH:mm');
            });
    }, [todo, getEventById, useEventStore.getState().eventList]);

    const handleSave = useCallback(async () => {
        if (title.trim() == '') return;
        setIsEdit(false);
        setTitle(title.trim());
        const newTodo: Todo = {
            ...todo,
            title: title.trim()
        };
        await setTodo(todo.id, newTodo);
    }, [setIsEdit, setTodo, todo, title]);

    const handleDragStart = useCallback(
        (e: MouseEvent) => {
            setDragItem(todo);
            // console.log('drag start', todo);
        },
        [todo]
    );

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'unique-id'
    });

    return (
        <div
            ref={ref}
            className={clsx('tw-p-1 tw-rounded-md', {
                'tw-bg-gray-200': isEdit || isActive,
                'hover:tw-bg-gray-100': !isEdit || !isActive
            })}
            draggable={true}
            onDragStart={handleDragStart}
            // ref={setNodeRef}
            // {...listeners}
            // {...attributes}
            onBlur={(e) => {
                e.preventDefault();
                isEdit && handleSave();
            }}
        >
            <div className={'tw-flex tw-items-start tw-items-center'}>
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
                    // edit zone
                    <Textarea
                        autoFocus={true}
                        onFocus={(e) => {
                            // sync state from store
                            setTitle(todo.title);
                            // move cursor to the end
                            e.target.value = '';
                            e.target.value = title;
                        }}
                        autosize
                        className={'tw-flex-grow'}
                        styles={(theme) => ({
                            input: {
                                'color': theme.colors.gray[7],
                                'padding': '0!important',
                                'fontSize': theme.fontSizes.sm,
                                'minHeight': 'auto',
                                'backgroundColor': 'transparent',
                                '&:focus': {
                                    outline: 'none'
                                },
                                'overflow': 'hidden'
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
                <Menu
                    transition={'scale-y'}
                    opened={menuOpen}
                    onChange={setMenuOpen}
                    position={'bottom-end'}
                    offset={-2}
                >
                    <Menu.Target>
                        <ActionIcon
                            radius={'xl'}
                            size={'xs'}
                            className={mouseHover ? '' : 'tw-hidden'}
                            // style={{ display: !isEdit ? '' : '' }} // fixme: confirm before delete, show only when edit
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

                {linkedEventNumber > 0 && (
                    <div>
                        <Text size={'xs'} className={'tw-w-fit tw-px-1'} color={'gray'}>
                            <Tooltip
                                withArrow
                                multiline
                                position={'bottom'}
                                styles={() => ({
                                    tooltip: {
                                        width: 'max-content'
                                    }
                                })}
                                label={formattedLinkedEventsDateTimeList?.map((date, index) => (
                                    <div key={index}>{date}</div>
                                ))}
                            >
                                <div>{linkedEventNumber}</div>
                            </Tooltip>
                        </Text>
                    </div>
                )}
            </div>
        </div>
    );
};
