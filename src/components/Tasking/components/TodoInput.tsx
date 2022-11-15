import { Button, Input } from '@douyinfe/semi-ui';
import { TodoIdGenerator, Todo } from '@/store/todo';
import { useTodoStore } from '@/store';
import { useState } from 'react';

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

    return (
        <>
            <div className={'tw-flex flex-row tw-gap-3 tw-mb-5'}>
                <Input
                    showClear
                    placeholder={'something to do...'}
                    onChange={(val) => setTitle(val)}
                    value={title}
                    onEnterPress={() => handleAdd()}
                />
                <Button theme={'solid'} onClick={() => handleAdd()}>
                    Add
                </Button>
            </div>
        </>
    );
}
