import { useState } from 'react';
import { Button, Checkbox, Input, TimePicker, Space } from '@douyinfe/semi-ui';
import './index.scss';
import TodoItem from '@/components/Todo/TodoItem';
import { Todo, TodoType, todoList } from '@/components/Todo/temp-todos';

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>(todoList);

    const [title, setTitle] = useState('');
    const [timeRange, setTimeRange] = useState();
    const [note, setNote] = useState('');

    const addTodo = function () {
        const todo: Todo = {
            eventId: todos.length + 1,
            type: TodoType.todo,
            isDone: false,
            title,
            note,
            start: timeRange[0],
            end: timeRange[1],
            reminder: []
        };

        console.log(todo);

        const newTodos = [...todos, todo];
        setTodos(newTodos);
    };

    return (
        <div className={'wrapper'}>
            <Input
                insetLabel={'Title'}
                placeholder={'something to do...'}
                value={title}
                onChange={(val) => setTitle(val)}
            />

            <TimePicker
                insetLabel={'Time'}
                type={'timeRange'}
                defaultValue={['00:00:00', '00:00:00']}
                value={timeRange}
                onChange={(val) => setTimeRange(val)}
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
                            <Checkbox checked={todo.isDone} extra={todo.note}>
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
