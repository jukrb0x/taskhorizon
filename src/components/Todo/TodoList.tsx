import { useState } from 'react';
import { Button, Checkbox, Input, TimePicker } from '@douyinfe/semi-ui';
import './index.scss';

export default function TodoList() {
    type Todo = {
        eventId: number;
        isTodo: boolean; // default to be false
        isDone: boolean; // only works when `isTodo == true`
        tittle: string;
        note: string;
        start: Date;
        end: Date;
        reminder: Date[];
    };
    const title = '';
    const start: Date = new Date();
    const end: Date = new Date();
    const note = '';

    const [todos, setTodos] = useState<Todo[]>([
        {
            eventId: 1,
            isTodo: true,
            isDone: false,
            tittle: 'test todo',
            note: 'some notes',
            start: new Date(2022, 1, 1, 1, 1, 1),
            end: new Date(2022, 1, 1, 2, 1, 1),
            reminder: []
        }
    ]);

    const addTodo = function (todo: Todo) {
        const newTodos = [...todos, todo];
        setTodos(newTodos);
    };

    return (
        <div className={'wrapper'}>
            <Input insetLabel={'Title'} placeholder={'something to do...'} value={title} />
            <TimePicker
                insetLabel={'Time'}
                type={'timeRange'}
                defaultValue={['00:00:00', '00:00:00']}
                value={[start, end]}
            />
            <Input insetLabel={'Note'} placeholder={'something to note...'} value={note} />
            <Button onClick={() => addTodo}>Add</Button>
            <div>
                {todos.map((todo) => (
                    <div key={todo.eventId}>
                        <hr />
                        <Checkbox checked={todo.isDone}>{todo.tittle}</Checkbox>
                        <TimePicker defaultValue={[todo.start, todo.end]} disabled={true} />
                        <br />
                        {todo.note}
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}
