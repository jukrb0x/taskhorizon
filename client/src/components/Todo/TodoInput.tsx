import { Todo, TodoIdGenerator } from '@/store/todo-store';
import { useState } from 'react';
import { TextInput } from '@mantine/core';
import { Button } from '@/components';
import clsx from 'clsx';
import { useTodo, useUser } from '@/hooks';
import { TodoAPI } from '@/apis';

export const TodoInput = (props: { className?: string }) => {
    const { addTodo } = useTodo();
    const { user } = useUser();
    const [title, setTitle] = useState<string>('');

    const handleAdd = () => {
        if (title.trim() == '') return;
        const todo: Todo = {
            category: { id: `default-category:${user?.username}`, name: 'Default' }, // TODO: change to default category
            id: TodoIdGenerator(),
            title: title.trim(),
            completed: false
        };

        addTodo(todo).then((res) => {
            if (res) {
                setTitle('');
            }
        });
    };

    return (
        <>
            <div className={clsx('tw-flex flex-row tw-gap-1.5 tw-mb-5', props.className)}>
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
