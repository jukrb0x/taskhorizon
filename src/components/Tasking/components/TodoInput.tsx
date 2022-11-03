import { Button, Input } from '@douyinfe/semi-ui';
import { UUID } from '@/utils';
import { Todo } from '@/store/todo';
import { useTodoStore } from '@/store';
import { useState } from 'react';

export default function TodoInput() {
    const { addTodo } = useTodoStore();
    const [title, setTitle] = useState<string>('');

    const handleAdd = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle == '') return;
        const todo: Todo = {
            id: UUID(),
            title: trimmedTitle,
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
