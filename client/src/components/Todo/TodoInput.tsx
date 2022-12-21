import { TextInput } from '@mantine/core';
import clsx from 'clsx';
import { useState } from 'react';

import { Button } from '@/components';
import { useTodo, useUser } from '@/hooks';
import { Todo, TodoIdGenerator } from '@/store/todo-store';

export const TodoInput = (props: { className?: string }) => {
    const { addTodo } = useTodo();
    const { user } = useUser();
    const [title, setTitle] = useState<string>('');

    const handleAdd = async () => {
        if (title.trim() == '') return;
        const todo: Todo = {
            category: { id: `default-category:${user?.username}`, name: 'Default' }, // TODO: change to default category
            id: TodoIdGenerator(),
            title: title.trim(),
            completed: false,
            linkedEvents: []
        };
        await addTodo(todo);
        setTitle('');
    };

    return (
        <>
            <div
                data-tauri-drag-region
                className={clsx('tw-flex flex-row tw-gap-1.5 tw-mb-3', props.className)}
            >
                <TextInput
                    className={'tw-flex-auto'}
                    // ref={inputRef}
                    placeholder={'something to do...'}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAdd();
                        }
                    }}
                    value={title}
                    styles={(theme) => ({
                        root: {
                            input: {
                                '&:focus': {
                                    // borderColor: theme.colors.gray[5]
                                }
                            }
                        }
                    })}
                />

                <Button
                    color={'blue'}
                    variant={'filled'}
                    disabled={title.trim() == ''}
                    className={'hover:tw-drop-shadow-sm'}
                    onClick={() => handleAdd()}
                >
                    Add
                </Button>
            </div>
        </>
    );
};
