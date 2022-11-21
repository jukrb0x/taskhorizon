import { Todo } from '@/store/todo-store';
import { useTodoStore } from '@/store';
import { useState } from 'react';
import { TextInput } from '@mantine/core';
import { Button } from '@/components/Button';

export default function Input() {
    const { addTodo } = useTodoStore();
    const [title, setTitle] = useState<string>('');

    const handleAdd = () => {
        if (title.trim() == '') return;
        const todo: Todo = {
            id: 'new todo id will be generated',
            title: title.trim(),
            completed: false
        };
        addTodo && addTodo(todo);
        setTitle('');
    };

    return (
        <>
            <div className={'tw-flex flex-row tw-gap-1.5 tw-mb-5'}>
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
}
