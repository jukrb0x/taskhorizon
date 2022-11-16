import { TodoIdGenerator, Todo } from '@/store/todo-store';
import { useTodoStore } from '@/store';
import { useState } from 'react';
import { TextInput, Button as MB } from '@mantine/core';
import { useEventListener } from '@mantine/hooks';
import { Button } from '@/components/Button';

export default function TodoInput() {
    const { addTodo } = useTodoStore();
    const [title, setTitle] = useState<string>('');

    const handleAdd = () => {
        if (title.trim() == '') return;
        const todo: Todo = {
            id: TodoIdGenerator(),
            title: title.trim(),
            completed: false
        };
        addTodo && addTodo(todo);
        setTitle('');
    };
    const inputRef = useEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleAdd();
        }
    });

    return (
        <>
            <div className={'tw-flex flex-row tw-gap-1.5 tw-mb-5'}>
                <TextInput
                    className={'tw-flex-auto'}
                    ref={inputRef}
                    placeholder={'something to do...'}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    styles={(theme) => ({
                        root: {
                            input: {
                                '&:focus': {
                                    borderColor: theme.colors.gray[5]
                                }
                            }
                        }
                    })}
                />

                {/*
                
                <Input
                    showClear
                    placeholder={'something to do...'}
                    onChange={(val) => setTitle(val)}
                    value={title}
                    onEnterPress={() => handleAdd()}
                />
                
*/}
                {/*

                <Button theme={'solid'} onClick={() => handleAdd()}>
                    Add
                </Button>
*/}
                <Button
                    color={'blue'}
                    variant={'outline'}
                    className={'hover:tw-drop-shadow-sm'}
                    onClick={() => handleAdd()}
                >
                    Add
                </Button>
            </div>
        </>
    );
}
