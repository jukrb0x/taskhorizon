import { useState } from 'react';
import { Button, Checkbox, Input, TimePicker, Space } from '@douyinfe/semi-ui';
import styles from './index.module.scss';
import TodoItem from '@/components/TodoOld/TodoItem';
import { Todo, TodoType, todoList } from '@/components/TodoOld/temp-todos';

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>(todoList);

    const [title, setTitle] = useState('');
    const [timeRange, setTimeRange] = useState(['00:00:00', '00:00:00']);
    const [note, setNote] = useState('');

    const addTodo = function () {
        const todo: Todo = {
            eventId: todos.length + 1,
            type: TodoType.todo,
            isDone: false,
            title,
            note,
            start: new Date(timeRange[0]),
            end: new Date(timeRange[1]),
            reminder: []
        };

        console.log(todo);

        const newTodos = [...todos, todo];
        setTodos(newTodos);
    };

    return (
        <div className={styles.wrapper}>
            <Input
                insetLabel={'Title'}
                placeholder={'something to do...'}
                value={title}
                onChange={(val) => setTitle(val)}
            />

            <TimePicker
                insetLabel={'Time'}
                type={'timeRange'}
                value={timeRange}
                onChange={(val) => setTimeRange(val as string[])}
            />

            <Input
                insetLabel={'Note'}
                placeholder={'something to note...'}
                value={note}
                onChange={(val) => setNote(val)}
            />
            <Button onClick={() => addTodo}>Add</Button>
            <div>
                <Space vertical spacing={'tight'} align={'start'}>
                    {todos.map((todo) => (
                        <div key={todo.eventId}>
                            <Checkbox
                                checked={todo.isDone}
                                extra={todo.note}
                                onChange={() => {
                                    console.log(todo.title);
                                }}
                            >
                                {todo.title}
                            </Checkbox>
                            {/*<TimePicker defaultValue={[todo.start, todo.end]} disabled={true} />*/}
                        </div>
                    ))}
                </Space>
            </div>
        </div>
    );
}
